import { useState, useCallback } from 'react'
import Editor from './components/Editor'
import Preview from './components/Preview'
import Header from './components/Header'

function App() {
    const [content, setContent] = useState('')
    const [images, setImages] = useState<Array<{ id: string; data: string; path: string }>>([])

    const handleContentChange = useCallback((newContent: string) => {
        setContent(newContent)
    }, [])

    const handleImageAdd = useCallback((imageData: { id: string; data: string; path: string }) => {
        setImages(prev => [...prev, imageData])
    }, [])

    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <Header content={content} images={images} />

            <div className="flex-1 flex overflow-hidden">
                {/* Editor Panel */}
                <div className="w-1/2 flex flex-col border-r border-slate-300">
                    <div className="bg-gradient-to-r from-primary-600 to-primary-500 text-white px-6 py-3 font-semibold text-lg shadow-md">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Editor
                        </div>
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <Editor
                            content={content}
                            onContentChange={handleContentChange}
                            onImageAdd={handleImageAdd}
                        />
                    </div>
                </div>

                {/* Preview Panel */}
                <div className="w-1/2 flex flex-col bg-slate-100">
                    <div className="bg-gradient-to-r from-accent-600 to-accent-500 text-white px-6 py-3 font-semibold text-lg shadow-md">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            Live Preview
                        </div>
                    </div>
                    <div className="flex-1 overflow-auto">
                        <Preview content={content} images={images} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
