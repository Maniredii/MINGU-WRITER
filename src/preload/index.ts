import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
    openFileDialog: () => ipcRenderer.invoke('dialog:openFile'),
    saveFileDialog: (defaultPath: string) => ipcRenderer.invoke('dialog:saveFile', defaultPath),
    readImage: (filePath: string) => ipcRenderer.invoke('file:readImage', filePath),
    saveDocument: (filePath: string, buffer: ArrayBuffer) =>
        ipcRenderer.invoke('file:saveDocument', filePath, buffer)
}

// Use `contextBridge` APIs to expose Electron APIs to renderer only if context isolation is enabled
if (process.contextIsolated) {
    try {
        contextBridge.exposeInMainWorld('electron', electronAPI)
        contextBridge.exposeInMainWorld('api', api)
    } catch (error) {
        console.error(error)
    }
} else {
    // @ts-ignore (define in dts)
    window.electron = electronAPI
    // @ts-ignore (define in dts)
    window.api = api
}
