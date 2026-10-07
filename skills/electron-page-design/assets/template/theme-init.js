/* Runs before styles to avoid a flash of the wrong appearance. */
(() => {
  const read = (key, fallback) => { try { return localStorage.getItem(key) || fallback; } catch { return fallback; } };
  const preference = read('page-template-appearance', 'system');
  const preset = read('page-template-preset', 'secret-store');
  document.documentElement.dataset.preset = ['secret-store', 'swarm-tools'].includes(preset) ? preset : 'secret-store';
  document.documentElement.dataset.theme = ['light', 'dark'].includes(preference) ? preference : (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
})();
