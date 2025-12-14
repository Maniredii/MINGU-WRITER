import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import * as fs from 'fs'

function createWindow(): void {
    // Create the browser window
    const mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 1000,
        minHeight: 600,
        show: false,
        autoHideMenuBar: true,
        backgroundColor: '#ffffff',
        title: 'MinguWriter - Research Paper Formatter',
        webPreferences: {
            preload: join(__dirname, '../preload/index.js'),
            sandbox: false,
            contextIsolation: true,
            nodeIntegration: false
        }
    })

    mainWindow.on('ready-to-show', () => {
        mainWindow.show()
    })

    mainWindow.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url)
        return { action: 'deny' }
    })

    // Load the remote URL for development or the local html file for production
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
        mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
    }
}

// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
    // Set app user model id for windows
    electronApp.setAppUserModelId('com.minguwriter.app')

    // Default open or close DevTools by F12 in development
    app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window)
    })

    // IPC handlers
    ipcMain.handle('dialog:openFile', async () => {
        const result = await dialog.showOpenDialog({
            properties: ['openFile'],
            filters: [
                { name: 'Images', extensions: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'] }
            ]
        })
        return result.filePaths[0]
    })

    ipcMain.handle('dialog:saveFile', async (_, defaultPath: string) => {
        const result = await dialog.showSaveDialog({
            defaultPath,
            filters: [
                { name: 'Word Document', extensions: ['docx'] }
            ]
        })
        return result.filePath
    })

    ipcMain.handle('file:readImage', async (_, filePath: string) => {
        try {
            const data = fs.readFileSync(filePath)
            return {
                success: true,
                data: data.toString('base64'),
                path: filePath
            }
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error'
            }
        }
    })

    ipcMain.handle('file:saveDocument', async (_, filePath: string, buffer: ArrayBuffer) => {
        try {
            fs.writeFileSync(filePath, Buffer.from(buffer))
            return { success: true }
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error'
            }
        }
    })

    createWindow()

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
