import { readFileSync, writeFileSync } from 'fs';
import { gzipSync } from 'zlib';
const { subtle, getRandomValues } = globalThis.crypto;
const html = readFileSync(new URL('../src/index.html', import.meta.url));
const data = gzipSync(html, { level: 9 });
const pw = process.env.SITE_PASSWORD || 'tma123', iter = 250000;
const salt = crypto.getRandomValues(new Uint8Array(16)), iv = crypto.getRandomValues(new Uint8Array(12));
const base = await subtle.importKey('raw', new TextEncoder().encode(pw), 'PBKDF2', false, ['deriveKey']);
const key = await subtle.deriveKey({ name: 'PBKDF2', salt, iterations: iter, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['encrypt']);
const ct = new Uint8Array(await subtle.encrypt({ name: 'AES-GCM', iv }, key, data));
const b64 = u => Buffer.from(u).toString('base64');
const page = `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="color-scheme" content="light dark">
<meta name="robots" content="noindex">
<title>Coming Soon</title>
<style>
:root { color-scheme: light dark; }
html, body { height: 100%; margin: 0; }
body { display: flex; align-items: center; justify-content: center; background: Canvas; color: CanvasText;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; padding: 16px; box-sizing: border-box; }
main { display: grid; justify-items: center; gap: 24px; width: 100%; max-width: 360px; }
h1 { margin: 0; font-size: clamp(2rem, 8vw, 5rem); font-weight: 600; letter-spacing: -0.02em; text-align: center;
  cursor: pointer; user-select: none; -webkit-tap-highlight-color: transparent; white-space: nowrap; }
form { display: flex; width: 100%; gap: 8px; }
input { flex: 1; min-width: 0; font: inherit; font-size: 16px; padding: 12px 14px; border-radius: 10px;
  border: 1px solid color-mix(in srgb, CanvasText 25%, transparent); background: Canvas; color: CanvasText; }
button { font: inherit; font-size: 16px; padding: 12px 16px; border-radius: 10px; border: 0; cursor: pointer;
  background: CanvasText; color: Canvas; }
form.bad { animation: shake .35s; }
form.bad input { border-color: #d33; }
@keyframes shake { 25% { transform: translateX(-6px); } 75% { transform: translateX(6px); } }
</style>
</head>
<body>
<main>
  <h1 id="cs">Coming Soon</h1>
  <form id="f" autocomplete="off">
    <input id="pw" type="password" placeholder="Passwort" aria-label="Passwort" enterkeyhint="go">
    <button type="submit">&rarr;</button>
  </form>
</main>
<script>
const P = { s: "${b64(salt)}", i: "${b64(iv)}", n: ${iter}, d: "${b64(ct)}" };
const u8 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));
async function unlock(pw) {
  const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(pw), 'PBKDF2', false, ['deriveKey']);
  const key = await crypto.subtle.deriveKey({ name: 'PBKDF2', salt: u8(P.s), iterations: P.n, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
  const gz = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: u8(P.i) }, key, u8(P.d));
  const html = await new Response(new Blob([gz]).stream().pipeThrough(new DecompressionStream('gzip'))).text();
  document.open(); document.write(html); document.close();
}
const f = document.getElementById('f'), pw = document.getElementById('pw');
document.getElementById('cs').addEventListener('click', () => pw.focus());
f.addEventListener('submit', async e => {
  e.preventDefault(); f.classList.remove('bad');
  try { await unlock(pw.value); try { localStorage.setItem('k-pw', pw.value); } catch (_) {} }
  catch (_) { void f.offsetWidth; f.classList.add('bad'); pw.select(); }
});
try { const s = localStorage.getItem('k-pw'); if (s) unlock(s).catch(() => { try { localStorage.removeItem('k-pw'); } catch (_) {} }); } catch (_) {}
</script>
</body>
</html>
`;
writeFileSync(new URL('../public/index.html', import.meta.url), page);
console.log(page.length);
