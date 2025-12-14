interface PreviewProps {
    content: string
    images: Array<{ id: string; data: string; path: string }>
}

function Preview({ content }: PreviewProps) {
    return (
        <div className="h-full overflow-auto bg-slate-100 p-8">
            <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden">
                {!content ? (
                    <div className="preview-content text-center py-20 text-slate-400">
                        <svg className="w-24 h-24 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-xl font-medium">Your document preview will appear here</p>
                        <p className="text-sm mt-2">Start typing in the editor to see live preview</p>
                    </div>
                ) : (
                    <div
                        className="preview-content"
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                )}
            </div>
        </div>
    )
}

export default Preview
