# Changelog

All notable changes to Paraphrase Assistant will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-12-05

### Added

#### Backend
- FastAPI server with paraphrase endpoint
- T5 transformer model integration (ramsrigouthamg/t5_paraphraser)
- Adjustable paraphrase strength (0-100)
- CORS middleware for local development
- Health check endpoint
- Automatic API documentation (Swagger UI)
- Comprehensive error handling and logging
- Request/response validation with Pydantic

#### Frontend
- C# WPF desktop application
- Global hotkey support (Ctrl+Alt+P)
- Clipboard capture functionality
- Modern, responsive UI design
- Two-panel layout (original vs paraphrased)
- Real-time character counters
- API status monitoring
- Strength slider with descriptive labels
- Copy to clipboard functionality
- Async/await for non-blocking operations
- Win32 API integration for system-wide hotkey

#### Documentation
- Comprehensive README.md
- Quick start guide (QUICKSTART.md)
- Detailed installation guide (INSTALLATION.md)
- API testing guide (API_TESTING.md)
- Project summary (PROJECT_SUMMARY.md)
- Contributing guidelines (CONTRIBUTING.md)
- Backend-specific documentation
- Frontend-specific documentation
- MIT License

#### Scripts & Tools
- setup.bat - One-click setup verification
- start-backend.bat - Backend startup script (Windows)
- start-backend.sh - Backend startup script (Linux/Mac)
- start-desktop.bat - Desktop app startup script
- config.json - Configuration file
- .gitignore - Git ignore patterns

### Features

- **AI-Powered Paraphrasing**: Uses state-of-the-art T5 models
- **Global Hotkey**: Capture text from any application
- **Adjustable Strength**: Control paraphrase creativity (0-100)
- **Modern UI**: Clean, intuitive interface
- **Real-time Status**: Visual feedback and API monitoring
- **Clipboard Integration**: Seamless copy/paste workflow
- **REST API**: Backend can be used independently
- **100% Local**: All processing on your computer
- **Open Source**: MIT License

### Technical Details

- Backend: Python 3.8+, FastAPI 0.104.1, Transformers 4.35.2
- Frontend: .NET 6.0, WPF, C# 10
- AI Model: T5-based paraphraser (~500MB)
- API: RESTful with JSON
- Platform: Windows 10/11

### Performance

- First request: 5-10 seconds (model warmup)
- Subsequent requests: 1-3 seconds
- Memory usage: 1-2GB RAM
- Model size: ~500MB disk space

### Known Limitations

- Windows-only desktop application
- Requires internet for initial model download
- CPU-only mode is slower than GPU
- Maximum text length: ~512 tokens (~400 words)
- Some applications may block clipboard access

---

## [Unreleased]

### Planned Features

- Multiple language support
- Custom model selection UI
- History of paraphrases
- Export to file functionality
- Dark mode theme
- System tray integration
- Batch processing
- Tone adjustment (formal/casual)
- Browser extension
- Mobile app

### Planned Improvements

- Unit tests for backend
- Unit tests for frontend
- Performance optimizations
- Better error messages
- Logging configuration
- Auto-update functionality

---

## Version History

- **1.0.0** (2025-12-05) - Initial release

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute.

## License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file.
