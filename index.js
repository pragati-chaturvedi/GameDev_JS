const { app, BrowserWindow } = require('electron');

const TITLEBAR_HEIGHT = 30;

function createWindow() {
    const win = new BrowserWindow({
        width: 835,
        height: 530,
        titleBarStyle: 'hidden',
        // for Windows/Linux to enable the control buttons
        ...(process.platform !== 'darwin' ? { titleBarOverlay: true } : {}),
        titleBarOverlay: {
            color: '#2f3241',
            symbolColor: '#818181ff',
            height: TITLEBAR_HEIGHT
        },

    });

    win.webContents.on('did-finish-load', () => {
        win.webContents.insertCSS(`:root{ --titlebar-height: ${TITLEBAR_HEIGHT}px; }`);
    });

    win.loadFile('src/index.html');
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        };
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
})