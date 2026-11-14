// Light/dark theme helpers shared by the inline script (layout) and the
// ThemeToggle button (Phase 2).

export const THEME_STORAGE_KEY = "theme";

// Runs in <head> before first paint: saved choice → otherwise system preference.
// Keep it tiny and dependency-free; it is inlined as a string.
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;
