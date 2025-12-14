import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
    interface Window {
        electron: ElectronAPI
        api: {
            openFileDialog: () => Promise<string>
            saveFileDialog: (defaultPath: string) => Promise<string | undefined>
            readImage: (filePath: string) => Promise<{
                success: boolean
                data?: string
                path?: string
                error?: string
            }>
            saveDocument: (filePath: string, buffer: ArrayBuffer) => Promise<{
                success: boolean
                error?: string
            }>
        }
    }
}
