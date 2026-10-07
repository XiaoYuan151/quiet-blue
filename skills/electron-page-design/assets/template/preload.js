const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('desktop', {
  platform: process.platform,
  setAppearance: (preference, preset) => ipcRenderer.invoke('appearance:set', preference, preset)
});
