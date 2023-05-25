const { app, BrowserWindow, ipcMain } = require('electron')

function createWindow () {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: __dirname + '/preload.js'  // path to preload script
    },
    backgroundColor: '#2c3e50'
  })

  win.loadFile('index.html')
}

app.whenReady().then(createWindow)

ipcMain.handle('minimize', (event) => {
  const win = BrowserWindow.getFocusedWindow()
  win.minimize()
})

ipcMain.handle('maximize', (event) => {
  const win = BrowserWindow.getFocusedWindow()
  if (!win.isMaximized()) {
    win.maximize()
  } else {
    win.unmaximize()
  }
})

ipcMain.handle('close', (event) => {
  const win = BrowserWindow.getFocusedWindow()
  win.close()
})
