import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

try {
  createRoot(document.getElementById("root")!).render(<App />);
} catch (e) {
  // If React fails to mount, show the error on the page for debug (dev-only).
  try {
    const pre = document.createElement('pre');
    pre.style.whiteSpace = 'pre-wrap';
    pre.style.background = 'rgba(0,0,0,0.85)';
    pre.style.color = 'white';
    pre.style.padding = '20px';
    pre.style.zIndex = '99999';
    pre.textContent = 'React mount error: ' + (e && e.stack ? e.stack : String(e));
    document.body.appendChild(pre);
  } catch (inner) {
    console.error('Mount error and failed to render overlay', inner);
  }
}
