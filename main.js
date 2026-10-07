const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron');
const path = require('node:path');
const palettes = { 'secret-store': { light: '#f7f9fc', dark: '#11161e' }, 'swarm-tools': { light: '#f7f9fc', dark: '#101722' } };
let preset = 'secret-store';

function updateBackgrounds() {
  const color = palettes[preset][nativeTheme.shouldUseDarkColors ? 'dark' : 'light'];
  BrowserWindow.getAllWindows().forEach(window => window.setBackgroundColor(color));
}

function createWindow() {
  const window = new BrowserWindow({
    width: 1200, height: 800, minWidth: 960, minHeight: 650,
    backgroundColor: palettes[preset][nativeTheme.shouldUseDarkColors ? 'dark' : 'light'],
    ...(process.platform === 'darwin' ? { titleBarStyle: 'hidden', trafficLightPosition: { x: 12, y: 17 } } : {}),
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true, nodeIntegration: false, sandbox: true }
  });
  window.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
  window.webContents.on('will-navigate', event => event.preventDefault());
  window.loadFile('index.html');
}

app.whenReady().then(() => {
  ipcMain.handle('appearance:set', (event, preference, requestedPreset) => {
    if (!BrowserWindow.fromWebContents(event.sender) || !['light', 'dark', 'system'].includes(preference) || !Object.hasOwn(palettes, requestedPreset)) {
      throw new Error('Invalid appearance request');
    }
    preset = requestedPreset;
    nativeTheme.themeSource = preference;
    updateBackgrounds();
  });
  nativeTheme.on('updated', updateBackgrounds);
  createWindow();
  app.on('activate', () => { if (!BrowserWindow.getAllWindows().length) createWindow(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
