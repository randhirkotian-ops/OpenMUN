function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function download(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportMarkdown(title: string, body: string) {
  download(new Blob([`# ${title}\n\n${body}`], { type: "text/markdown" }), `${slug(title)}.md`);
}

export function exportDocx(title: string, body: string) {
  const html = `<!DOCTYPE html><html xmlns:w="urn:schemas-microsoft-com:office:word"><head><meta charset="utf-8"><title>${escapeHtml(
    title,
  )}</title></head><body style="font-family:Georgia,serif;font-size:12pt;line-height:1.6">
  <h1 style="font-size:16pt">${escapeHtml(title)}</h1>
  ${body
    .split("\n")
    .map((l) => (l.trim() ? `<p>${escapeHtml(l)}</p>` : "<p>&nbsp;</p>"))
    .join("")}
  </body></html>`;
  download(new Blob([html], { type: "application/msword" }), `${slug(title)}.doc`);
}

export function exportPdf(title: string, body: string) {
  const w = window.open("", "_blank", "width=820,height=1000");
  if (!w) return;
  w.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>${escapeHtml(title)}</title>
  <style>
    @page { margin: 25mm; }
    body { font-family: Georgia, 'Times New Roman', serif; font-size: 12pt; line-height: 1.65; color: #16202b; }
    h1 { font-size: 17pt; margin-bottom: 24px; }
    p { margin: 0 0 10px; white-space: pre-wrap; }
  </style></head><body>
  <h1>${escapeHtml(title)}</h1>
  ${body
    .split("\n")
    .map((l) => (l.trim() ? `<p>${escapeHtml(l)}</p>` : "<p>&nbsp;</p>"))
    .join("")}
  </body></html>`);
  w.document.close();
  w.focus();
  setTimeout(() => w.print(), 350);
}

export function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "clause-document";
}
