function FormattingToolbar() {
    return (
        <div id="toolbar" className="border-b border-slate-300 bg-slate-50 px-4 py-2 flex flex-wrap items-center gap-1">
            {/* Headings */}
            <select className="ql-header" defaultValue="" title="Heading Level">
                <option value="1">Heading 1</option>
                <option value="2">Heading 2</option>
                <option value="3">Heading 3</option>
                <option value="4">Heading 4</option>
                <option value="">Normal</option>
            </select>

            <span className="w-px h-6 bg-slate-300 mx-2"></span>

            {/* Text Formatting */}
            <button className="ql-bold" title="Bold (Ctrl+B)">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z" />
                </svg>
            </button>

            <button className="ql-italic" title="Italic (Ctrl+I)">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z" />
                </svg>
            </button>

            <button className="ql-underline" title="Underline (Ctrl+U)">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z" />
                </svg>
            </button>

            <button className="ql-strike" title="Strikethrough">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z" />
                </svg>
            </button>

            <span className="w-px h-6 bg-slate-300 mx-2"></span>

            {/* Lists */}
            <button className="ql-list" value="ordered" title="Numbered List">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z" />
                </svg>
            </button>

            <button className="ql-list" value="bullet" title="Bullet List">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z" />
                </svg>
            </button>

            <span className="w-px h-6 bg-slate-300 mx-2"></span>

            {/* Image */}
            <button className="ql-image" title="Insert Image">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                </svg>
            </button>

            <span className="w-px h-6 bg-slate-300 mx-2"></span>

            {/* Clear Formatting */}
            <button className="ql-clean" title="Clear Formatting">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 5v.18L8.82 8h2.4l-.72 1.68 2.1 2.1L14.21 8H20V5H6zm14 14l-1.41-1.41-1.79 1.79-1.79-1.8-1.41 1.41 1.79 1.79-1.79 1.8 1.41 1.41 1.79-1.8 1.79 1.8 1.41-1.41-1.79-1.79L20 19zM2 22l1.41-1.41L7.18 16.82 11.36 21l1.41-1.41-4.18-4.18 1.41-1.41-1.41-1.42-1.41 1.42-1.42-1.42-1.41 1.41 1.41 1.42L3.4 17.4 2 22z" />
                </svg>
            </button>

            <div className="ml-auto text-xs text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                💡 Tip: Use Ctrl+B for bold, Ctrl+I for italic, Ctrl+U for underline
            </div>
        </div>
    )
}

export default FormattingToolbar
