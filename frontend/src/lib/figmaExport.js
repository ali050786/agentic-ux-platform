// Step 1: Generate figmeta JSON
export function generateFigmeta({ pasteId = "agentic-ux", fileKey = "UXL123" } = {}) {
  return {
    pasteId,
    fileKey,
    type: "CLIPBOARD_COPY",
    version: "1.0"
  }
}

// Step 2: Encode figmeta safely
export function encodeFigmeta(meta) {
  const json = JSON.stringify(meta)
  return btoa(unescape(encodeURIComponent(json)))
}

// Step 3: Build the clipboard HTML payload

export function buildClipboardHTML(figmetaB64, figmaB64) {
  return `
    <div>
      <span data-metadata="<!--(figmeta)${figmetaB64}(/figmeta)-->"></span>
      <span data-buffer="<!--(figma)${figmaB64}(/figma)-->"></span>
    </div>
  `
}

export async function copyToFigmaClipboard(figmetaB64, figmaB64) {
  const html = buildClipboardHTML(figmetaB64, figmaB64)
  const blob = new Blob([html], { type: "text/html" })
  await navigator.clipboard.write([
    new ClipboardItem({ "text/html": blob })
  ])
  alert("Copied to clipboard! Paste into Figma now.")
}