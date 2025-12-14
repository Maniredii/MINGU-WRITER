import { useState } from 'react'
import { generateDocx } from '../utils/docxGenerator'

interface HeaderProps {
    content: string
    images: Array<{ id: string; data: string; path: string }>
}

function Header({ content, images }: HeaderProps) {
    const [isGenerating, setIsGenerating] = useState(false)

    const handleStartWriting = async () => {
        if (!content.trim()) {
            alert('Please add some content before generating the document.')
            return
        }

        setIsGenerating(true)
        try {
            const defaultPath = `Research_Paper_${new Date().toISOString().split('T')[0]}.docx`
            const filePath = await window.api.saveFileDialog(defaultPath)

            if (filePath) {
                const buffer = await generateDocx(content, images)
                const result = await window.api.saveDocument(filePath, buffer)

                if (result.success) {
                    alert(`Document saved successfully!\n\nLocation: ${filePath}`)
                } else {
                    alert(`Error saving document: ${result.error}`)
                }
            }
        } catch (error) {
            alert(`Error generating document: ${error instanceof Error ? error.message : 'Unknown error'}`)
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <header className="bg-white border-b border-slate-300 shadow-sm">
            <div className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-600 rounded-lg flex items-center justify-center shadow-md">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                            MinguWriter
                        </h1>
                        <p className="text-sm text-slate-600">Research Paper Formatter</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="text-sm text-slate-600">
                        <span className="font-medium">{content.length}</span> characters
                    </div>

                    <button
                        onClick={handleStartWriting}
                        disabled={isGenerating || !content.trim()}
                        className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        title="Generate and save Word document"
                    >
                        {isGenerating ? (
                            <>
                                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Generating...
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Start Writing
                            </>
                        )}
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header
