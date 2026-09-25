/* XlsxLite — minimal .xlsx writer (stored zip, inline strings) and reader (deflate via DecompressionStream). */
(function () {
  const enc = new TextEncoder(), dec = new TextDecoder();
  let CRC;
  function crc32(u8) {
    if (!CRC) { CRC = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; CRC[n] = c >>> 0; } }
    let c = 0xFFFFFFFF; for (let i = 0; i < u8.length; i++) c = CRC[(c ^ u8[i]) & 255] ^ (c >>> 8);
    return (c ^ 0xFFFFFFFF) >>> 0;
  }
  function zip(files) {
    const parts = [], central = []; let off = 0;
    const d = new Date(), t = (d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1), dd = ((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate();
    for (const f of files) {
      const name = enc.encode(f.name), data = enc.encode(f.data), crc = crc32(data);
      const h = new DataView(new ArrayBuffer(30));
      h.setUint32(0, 0x04034b50, true); h.setUint16(4, 20, true); h.setUint16(6, 0x0800, true); h.setUint16(10, t, true); h.setUint16(12, dd, true);
      h.setUint32(14, crc, true); h.setUint32(18, data.length, true); h.setUint32(22, data.length, true); h.setUint16(26, name.length, true);
      parts.push(new Uint8Array(h.buffer), name, data);
      const c = new DataView(new ArrayBuffer(46));
      c.setUint32(0, 0x02014b50, true); c.setUint16(4, 20, true); c.setUint16(6, 20, true); c.setUint16(8, 0x0800, true); c.setUint16(12, t, true); c.setUint16(14, dd, true);
      c.setUint32(16, crc, true); c.setUint32(20, data.length, true); c.setUint32(24, data.length, true); c.setUint16(28, name.length, true); c.setUint32(42, off, true);
      central.push(new Uint8Array(c.buffer), name);
      off += 30 + name.length + data.length;
    }
    const cd = central.reduce((s, p) => s + p.length, 0);
    const e = new DataView(new ArrayBuffer(22));
    e.setUint32(0, 0x06054b50, true); e.setUint16(8, files.length, true); e.setUint16(10, files.length, true); e.setUint32(12, cd, true); e.setUint32(16, off, true);
    return new Blob([...parts, ...central, new Uint8Array(e.buffer)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  }
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const unesc = s => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&#x([0-9a-f]+);/gi, (m, h) => String.fromCharCode(parseInt(h, 16))).replace(/&#(\d+);/g, (m, n) => String.fromCharCode(+n)).replace(/&amp;/g, '&');
  function colName(i) { let s = ''; i++; while (i > 0) { const m = (i - 1) % 26; s = String.fromCharCode(65 + m) + s; i = Math.floor((i - 1) / 26); } return s; }
  function colIndex(s) { let n = 0; for (const ch of s) n = n * 26 + ch.charCodeAt(0) - 64; return n - 1; }
  const NS = 'http://schemas.openxmlformats.org/spreadsheetml/2006/main';
  function sheetXml(sh, active) {
    let x = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="${NS}"><sheetViews><sheetView workbookViewId="0"${active ? ' tabSelected="1"' : ''}><pane ySplit="${sh.freeze || 1}" topLeftCell="A${(sh.freeze || 1) + 1}" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>`;
    if (sh.widths) x += '<cols>' + sh.widths.map((w, i) => `<col min="${i + 1}" max="${i + 1}" width="${w}" customWidth="1"/>`).join('') + '</cols>';
    x += '<sheetData>';
    sh.rows.forEach((r, ri) => {
      const ht = sh.rowHeights && sh.rowHeights[ri]; x += `<row r="${ri + 1}"${ht ? ` ht="${ht}" customHeight="1"` : ''}>`;
      r.forEach((v, ci) => {
        if (v === '' || v == null) return;
        const ref = colName(ci) + (ri + 1), cs = sh.cellStyle && sh.cellStyle[ri + ',' + ci], s = cs || (ri === 0 ? ((sh.headerStyles && sh.headerStyles[ci]) || 1) : (sh.hintRow && ri === 1 ? 4 : 0)), sa = s ? ` s="${s}"` : '';
        x += typeof v === 'number' ? `<c r="${ref}"${sa}><v>${v}</v></c>` : `<c r="${ref}"${sa} t="inlineStr"><is><t xml:space="preserve">${esc(v)}</t></is></c>`;
      });
      x += '</row>';
    });
    x += '</sheetData>';
    if (sh.prompts && sh.prompts.length) x += `<dataValidations count="${sh.prompts.length}">` + sh.prompts.map(p => `<dataValidation allowBlank="1" showInputMessage="1" promptTitle="${esc(p.title)}" prompt="${esc(p.text)}" sqref="${p.sqref}"/>`).join('') + '</dataValidations>';
    return x + '</worksheet>';
  }
  const STYLES = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="${NS}"><fonts count="4"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Calibri"/></font><font><sz val="11"/><color rgb="FF991B1B"/><name val="Calibri"/></font><font><i/><sz val="9"/><color rgb="FF475569"/><name val="Calibri"/></font></fonts><fills count="8"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF1D4ED8"/><bgColor indexed="64"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FF475569"/><bgColor indexed="64"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FFFECACA"/><bgColor indexed="64"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FFF1F5F9"/><bgColor indexed="64"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FFDCFCE7"/><bgColor indexed="64"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FFB91C1C"/><bgColor indexed="64"/></patternFill></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="8"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1"/><xf numFmtId="0" fontId="1" fillId="3" borderId="0" xfId="0" applyFont="1" applyFill="1"/><xf numFmtId="0" fontId="2" fillId="4" borderId="0" xfId="0" applyFont="1" applyFill="1"/><xf numFmtId="0" fontId="3" fillId="5" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment wrapText="1" vertical="top"/></xf><xf numFmtId="0" fontId="0" fillId="6" borderId="0" xfId="0" applyFill="1"/><xf numFmtId="0" fontId="2" fillId="0" borderId="0" xfId="0" applyFont="1" applyAlignment="1"><alignment wrapText="1" vertical="top"/></xf><xf numFmtId="0" fontId="1" fillId="7" borderId="0" xfId="0" applyFont="1" applyFill="1"/></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>`;
  function write(sheets) {
    const files = [
      { name: '[Content_Types].xml', data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>${sheets.map((s, i) => `<Override PartName="/xl/worksheets/sheet${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join('')}</Types>` },
      { name: '_rels/.rels', data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>` },
      { name: 'xl/workbook.xml', data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="${NS}" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>${sheets.map((s, i) => `<sheet name="${esc(s.name)}" sheetId="${i + 1}" r:id="rId${i + 1}"/>`).join('')}</sheets></workbook>` },
      { name: 'xl/_rels/workbook.xml.rels', data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${sheets.map((s, i) => `<Relationship Id="rId${i + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i + 1}.xml"/>`).join('')}<Relationship Id="rId${sheets.length + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>` },
      { name: 'xl/styles.xml', data: STYLES },
      ...sheets.map((s, i) => ({ name: `xl/worksheets/sheet${i + 1}.xml`, data: sheetXml(s, i === 0) })),
    ];
    return zip(files);
  }
  async function unzip(buf) {
    const u = new Uint8Array(buf), dv = new DataView(u.buffer, u.byteOffset, u.byteLength);
    let e = u.length - 22; while (e >= 0 && dv.getUint32(e, true) !== 0x06054b50) e--;
    if (e < 0) throw new Error('Not a zip');
    const n = dv.getUint16(e + 10, true); let off = dv.getUint32(e + 16, true); const out = {};
    for (let i = 0; i < n; i++) {
      if (dv.getUint32(off, true) !== 0x02014b50) throw new Error('Bad zip');
      const method = dv.getUint16(off + 10, true), cs = dv.getUint32(off + 20, true), nl = dv.getUint16(off + 28, true), el = dv.getUint16(off + 30, true), cl = dv.getUint16(off + 32, true), lo = dv.getUint32(off + 42, true);
      const name = dec.decode(u.subarray(off + 46, off + 46 + nl)); off += 46 + nl + el + cl;
      if (!/\.(xml|rels)$/.test(name)) continue;
      const start = lo + 30 + dv.getUint16(lo + 26, true) + dv.getUint16(lo + 28, true), data = u.slice(start, start + cs);
      out[name] = method === 0 ? dec.decode(data) : await new Response(new Blob([data]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).text();
    }
    return out;
  }
  const attr = (tag, name) => { const m = tag.match(new RegExp('\\s' + name + '="([^"]*)"')); return m ? unesc(m[1]) : null; };
  const texts = x => [...x.matchAll(/<t(?:\s[^>]*)?>([\s\S]*?)<\/t>/g)].map(m => unesc(m[1])).join('');
  async function read(blob) {
    const f = await unzip(await blob.arrayBuffer());
    if (!f['xl/workbook.xml']) throw new Error('No workbook');
    const strs = [...(f['xl/sharedStrings.xml'] || '').replace(/<rPh[\s\S]*?<\/rPh>/g, '').matchAll(/<si>([\s\S]*?)<\/si>/g)].map(m => texts(m[1]));
    const rels = {}; for (const m of (f['xl/_rels/workbook.xml.rels'] || '').matchAll(/<Relationship\b[^>]*>/g)) rels[attr(m[0], 'Id')] = attr(m[0], 'Target');
    const sheets = [];
    for (const m of f['xl/workbook.xml'].matchAll(/<sheet\b[^>]*>/g)) {
      let t = rels[attr(m[0], 'r:id')] || ''; t = t.startsWith('/') ? t.slice(1) : 'xl/' + t.replace(/^\.\//, '');
      const xml = f[t]; if (!xml) continue;
      const rows = [];
      for (const r of xml.matchAll(/<row\b([^>]*?)(?:\/>|>([\s\S]*?)<\/row>)/g)) {
        const ri = (+attr(r[0], 'r') || rows.length + 1) - 1, cells = []; let seq = 0;
        for (const c of (r[2] || '').matchAll(/<c\b([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g)) {
          const ref = attr(' ' + c[1], 'r'), ci = ref ? colIndex(ref.replace(/\d+/g, '')) : seq; seq = ci + 1;
          const type = attr(' ' + c[1], 't'), body = c[2] || '', v = (body.match(/<v>([\s\S]*?)<\/v>/) || [])[1];
          let val = '';
          if (type === 's') val = strs[+v] ?? '';
          else if (type === 'inlineStr') val = texts(body);
          else if (type === 'str' || type === 'e') val = v != null ? unesc(v) : '';
          else if (type === 'b') val = v === '1' ? 'TRUE' : 'FALSE';
          else if (v != null) val = isNaN(+v) ? unesc(v) : +v;
          cells[ci] = val;
        }
        for (let i = 0; i < cells.length; i++) if (cells[i] === undefined) cells[i] = '';
        rows[ri] = cells;
      }
      for (let i = 0; i < rows.length; i++) if (!rows[i]) rows[i] = [];
      sheets.push({ name: attr(m[0], 'name'), rows });
    }
    return sheets;
  }
  window.XlsxLite = { write, read, colName };
})();
