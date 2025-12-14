import { useRef, useMemo, useCallback } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

interface EditorProps {
    content: string
    onContentChange: (content: string) => void
    onImageAdd: (imageData: { id: string; data: string; path: string }) => void
}

function Editor({ content, onContentChange, onImageAdd }: EditorProps) {
    const quillRef = useRef<ReactQuill>(null)

    const handleImageInsert = useCallback(async () => {
        try {
            const filePath = await window.api.openFileDialog()
            if (filePath) {
                const result = await window.api.readImage(filePath)
                if (result.success && result.data && result.path) {
                    const imageId = `img_${Date.now()}`
                    const imageUrl = `data:image/png;base64,${result.data}`

                    // Add image to editor
                    const quill = quillRef.current?.getEditor()
                    if (quill) {
                        const range = quill.getSelection()
                        const index = range ? range.index : quill.getLength()
                        quill.insertEmbed(index, 'image', imageUrl)
                        quill.setSelection(index + 1, 0)
                    }

                    // Notify parent about image
                    onImageAdd({
                        id: imageId,
                        data: result.data,
                        path: result.path
                    })
                } else {
                    alert(`Error loading image: ${result.error}`)
                }
            }
        } catch (error) {
            alert(`Error inserting image: ${error instanceof Error ? error.message : 'Unknown error'}`)
        }
    }, [onImageAdd])

    // Use useMemo to prevent modules from being recreated on every render
    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, 4, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['image'],
                ['clean']
            ],
            handlers: {
                image: handleImageInsert
            }
        }
    }), [handleImageInsert])

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'list', 'bullet',
        'image'
    ]

    return (
        <div className="h-full flex flex-col bg-white">
            <div className="flex-1 overflow-hidden">
                <ReactQuill
                    ref={quillRef}
                    theme="snow"
                    value={content}
                    onChange={onContentChange}
                    modules={modules}
                    formats={formats}
                    placeholder="Paste your content here or start typing..."
                    style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                />
            </div>
        </div>
    )
}

export default Editor
