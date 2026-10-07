const $ = selector => document.querySelector(selector);
const read = (key, fallback) => { try { return localStorage.getItem(key) || fallback; } catch { return fallback; } };
const write = (key, value) => { try { localStorage.setItem(key, value); } catch { /* In-memory preferences still work. */ } };
const systemTheme = matchMedia('(prefers-color-scheme: dark)');
let preference = read('page-template-appearance', 'system');
if (!['system', 'light', 'dark'].includes(preference)) preference = 'system';
let preset = document.documentElement.dataset.preset;
let selectedId = 'workspace';
let toastTimer;
const items = [
  { id: 'workspace', name: 'Workspace', description: 'Your tools, organized in one place.', category: 'Collection' },
  { id: 'connections', name: 'Connections', description: 'A home for the services you use.', category: 'Integration' },
  { id: 'notes', name: 'Notes', description: 'Useful details for your daily work.', category: 'Resource' }
];
if (window.desktop?.platform) document.body.dataset.platform = window.desktop.platform;

function applyAppearance() {
  const theme = preference === 'system' ? (systemTheme.matches ? 'dark' : 'light') : preference;
  document.documentElement.dataset.theme = theme;
  document.documentElement.dataset.preset = preset;
  $('#appearance').value = preference;
  $('#preset').value = preset;
  $('#appearance-summary').textContent = preference[0].toUpperCase() + preference.slice(1);
  const label = `Switch to ${theme === 'dark' ? 'light' : 'dark'} appearance`;
  $('#theme-toggle').setAttribute('aria-label', label);
  $('#theme-toggle').title = label;
  window.desktop?.setAppearance(preference, preset).catch(() => toast('Could not update window appearance.'));
}

function showPage(page, focus = true) {
  document.querySelectorAll('main.page').forEach(element => { element.hidden = element.id !== page; });
  document.querySelectorAll('[data-page]').forEach(button => {
    if (button.dataset.page === page) button.setAttribute('aria-current', 'page');
    else button.removeAttribute('aria-current');
  });
  if (focus) $(`#${page}`).focus();
}

function node(tag, className, value) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (value !== undefined) element.textContent = value;
  return element;
}

function renderLibrary() {
  const query = $('#search').value.trim().toLowerCase();
  const filtered = items.filter(item => `${item.name} ${item.description}`.toLowerCase().includes(query));
  if (!filtered.some(item => item.id === selectedId)) selectedId = filtered[0]?.id;
  $('#entry-list').replaceChildren();
  for (const item of filtered) {
    const button = node('button', 'entry');
    button.type = 'button';
    button.setAttribute('aria-pressed', String(item.id === selectedId));
    const label = node('span');
    label.append(node('strong', '', item.name), node('small', '', item.description));
    button.append(node('span', 'emblem', item.name[0].toUpperCase()), label);
    button.addEventListener('click', () => {
      selectedId = item.id;
      renderLibrary();
      const index = filtered.findIndex(entry => entry.id === selectedId);
      $('#entry-list').children[index]?.focus();
    });
    $('#entry-list').append(button);
  }
  $('#result-count').textContent = `${filtered.length} ${filtered.length === 1 ? 'item' : 'items'}`;
  $('#item-count').textContent = items.length;
  const detail = $('#detail');
  detail.replaceChildren();
  const item = filtered.find(entry => entry.id === selectedId);
  if (!item) {
    $('#entry-list').append(node('p', 'empty', 'No matching items. Try a different search.'));
    detail.append(node('div', 'empty', 'Select an item to see its details.'));
    return;
  }
  detail.append(node('p', 'eyebrow', item.category), node('h1', '', item.name), node('p', 'selectable', item.description));
  const status = node('div', 'status-row');
  status.append(node('span', 'pill', 'Available'));
  detail.append(status);
  const section = node('section');
  section.append(node('h2', '', 'Details'));
  const fields = node('div', 'fields');
  for (const [label, value] of [['Category', item.category], ['Visibility', 'Workspace']]) {
    const field = node('div', 'field', label);
    field.append(node('output', 'selectable', value));
    fields.append(field);
  }
  section.append(fields);
  detail.append(section);
}

function toast(message) {
  clearTimeout(toastTimer);
  $('#toast').textContent = message;
  $('#toast').hidden = false;
  toastTimer = setTimeout(() => { $('#toast').hidden = true; }, 3500);
}

document.querySelectorAll('[data-page]').forEach(button => button.addEventListener('click', () => showPage(button.dataset.page)));
document.querySelectorAll('[data-go]').forEach(button => button.addEventListener('click', () => showPage(button.dataset.go)));
document.querySelectorAll('[data-action="add"]').forEach(button => button.addEventListener('click', () => { $('#item-dialog').showModal(); $('#item-name').focus(); }));
$('#cancel-dialog').addEventListener('click', () => $('#item-dialog').close());
$('#item-form').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.target);
  const name = String(data.get('name')).trim();
  if (!name) { $('#item-name').setCustomValidity('Enter a name.'); $('#item-name').reportValidity(); return; }
  const item = { id: `item-${Date.now()}-${items.length}`, name, description: String(data.get('description')).trim(), category: 'Resource' };
  items.push(item);
  selectedId = item.id;
  $('#search').value = '';
  renderLibrary();
  $('#item-dialog').close();
  event.target.reset();
  showPage('library');
  toast('Item added.');
});
$('#item-name').addEventListener('input', () => $('#item-name').setCustomValidity(''));
$('#search').addEventListener('input', () => { showPage('library', false); renderLibrary(); });
document.addEventListener('keydown', event => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k' && !$('#item-dialog').open) { event.preventDefault(); $('#search').focus(); }
});
$('#theme-toggle').addEventListener('click', () => {
  preference = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  write('page-template-appearance', preference);
  applyAppearance();
});
$('#appearance').addEventListener('change', event => { preference = event.target.value; write('page-template-appearance', preference); applyAppearance(); });
$('#preset').addEventListener('change', event => { preset = event.target.value; write('page-template-preset', preset); applyAppearance(); });
systemTheme.addEventListener('change', () => { if (preference === 'system') applyAppearance(); });
applyAppearance();
renderLibrary();
