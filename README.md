# MinguWriter

**A cross-platform desktop application for formatting research papers and academic reports**

![MinguWriter](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## Features

✨ **Split-Screen Interface**
- Editor on the left for content creation
- Live preview on the right showing Word document format

📝 **Rich Text Formatting**
- Multiple heading levels (H1, H2, H3, H4)
- Text formatting: Bold, Italic, Underline, Strikethrough
- Ordered and unordered lists
- Image insertion with file picker

🎯 **One-Click Document Generation**
- Generate properly formatted Word (.docx) documents
- Professional academic styling with proper margins
- All formatting preserved in output

💡 **User-Friendly**
- Intuitive toolbar with tooltips
- Keyboard shortcuts (Ctrl+B, Ctrl+I, Ctrl+U)
- Paste content from any source
- Modern, clean interface

## Installation

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Setup

1. **Clone or download this repository**

2. **Install dependencies**
```bash
npm install
```

3. **Run in development mode**
```bash
npm run dev
```

4. **Build for Windows**
```bash
npm run build:win
```

The installer will be created in the `dist` folder.

## Usage

1. **Launch MinguWriter**
   - In development: Run `npm run dev`
   - After building: Run the installed application

2. **Create Your Document**
   - Paste or type content in the editor (left panel)
   - Use the formatting toolbar to apply styles
   - Insert images using the image button
   - Watch live preview update in real-time (right panel)

3. **Generate Word Document**
   - Click "Start Writing" button in the header
   - Choose save location
   - Open the generated .docx file in Microsoft Word

## Keyboard Shortcuts

- `Ctrl+B` - Bold
- `Ctrl+I` - Italic
- `Ctrl+U` - Underline
- `Ctrl+Z` - Undo
- `Ctrl+Y` - Redo

## Technology Stack

- **Electron** - Cross-platform desktop framework
- **React** - UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Modern styling
- **Quill.js** - Rich text editor
- **docx** - Word document generation

## Project Structure

```
MinguWriter/
├── src/
│   ├── main/           # Electron main process
│   ├── preload/        # Preload scripts
│   └── renderer/       # React application
│       ├── src/
│       │   ├── components/  # UI components
│       │   └── utils/       # Utilities (docx generator)
│       ├── index.html
│       ├── main.tsx
│       └── index.css
├── package.json
├── electron.vite.config.ts
└── README.md
```

## Building for Other Platforms

### macOS
```bash
npm run build:mac
```

### Linux
```bash
npm run build:linux
```

## Future Enhancements

- PowerPoint presentation generation
- PDF export
- Citation management
- Document templates (APA, MLA, Chicago)
- Cloud storage integration

## License

MIT License - feel free to use this project for your own purposes.

## Support

For issues or questions, please create an issue in the repository.

---

**Made with ❤️ for students worldwide**
