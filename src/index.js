const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const path = require('path');
const menuTemp = require('./scripts/menuTemplate');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = (minw= 800, minh=600, nodeInt = true, file='index.html', devtool=true) => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    minWidth: minw,
    minHeight: minh,
    width: minw,
    height: minh,
    frame: false,
    webPreferences:{
      nodeIntegration: nodeInt,
      enableRemoteModule: true,
      devTools: devtool
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, file));

  mainWindow.webContents.on('new-window', function(e, url) {
    e.preventDefault();
    require('electron').shell.openExternal(url);
});

};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.



module.exports = {
  createWindow: createWindow
}