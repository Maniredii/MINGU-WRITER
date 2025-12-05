# Paraphrase Assistant

An AI-powered desktop application for paraphrasing text using transformer models. Capture text from any application with a global hotkey and get instant paraphrasing results.

## ✨ Features

- 🎯 **Global Hotkey**: Press `Ctrl+Alt+P` to capture selected text from any application
- 🤖 **AI-Powered**: Uses state-of-the-art T5 transformer models for high-quality paraphrasing
- 🎚️ **Adjustable Strength**: Control paraphrase intensity from conservative to aggressive (0-100)
- 💻 **Modern UI**: Clean, intuitive WPF interface with real-time status updates
- 📋 **Clipboard Integration**: Seamlessly copy selected text and paste results
- 🔌 **REST API**: FastAPI backend can be used independently

## 🏗️ Architecture

```
┌─────────────────────┐         HTTP          ┌──────────────────────┐
│   WPF Desktop App   │ ◄─────────────────► │   FastAPI Backend    │
│  (C# .NET 6.0)      │   localhost:8000     │   (Python 3.8+)      │
│                     │                       │                      │
│  • Global Hotkey    │                       │  • T5 Model          │
│  • Clipboard Capture│                       │  • Paraphrase Engine │
│  • Modern UI        │                       │  • REST API          │
└─────────────────────┘                       └──────────────────────┘
```

## 📋 Prerequisites

### Backend Requirements
- **Python 3.8+** ([Download](https://www.python.org/downloads/))
- **pip** (included with Python)
- **~2GB disk space** for AI model
- **GPU recommended** (CPU-only will work but slower)

### Frontend Requirements
- **Windows 10/11**
- **.NET 6.0 SDK** or later ([Download](https://dotnet.microsoft.com/download/dotnet/6.0))
- **Visual Studio 2022** (Community Edition is free) or VS Code with C# extension

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd TextEditor
```

### 2. Start the Backend

#### Windows:
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python paraphrase_api.py
```

#### Linux/Mac:
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python paraphrase_api.py
```

**Note:** First run will download the AI model (~500MB). Wait for "Model loaded successfully!" message.

The backend will start at `http://127.0.0.1:8000`

### 3. Build and Run the Desktop App

```bash
cd desktop-ui/ParaphraseApp
dotnet restore
dotnet build
dotnet run
```

Or open `ParaphraseApp.csproj` in Visual Studio and press F5.

## 📖 Usage

### Using the Global Hotkey

1. Ensure the backend server is running
2. Launch the Paraphrase Assistant desktop app
3. Open any application (Word, Notepad, browser, etc.)
4. Select some text
5. Press `Ctrl+Alt+P`
6. The paraphrased text will appear in the app

### Manual Paraphrasing

1. Type or paste text into the "Original Text" panel
2. Adjust the strength slider (0-100)
   - **0-30**: Conservative (minimal changes)
   - **31-70**: Moderate (balanced)
   - **71-100**: Aggressive (maximum diversity)
3. Click "Paraphrase Now"
4. Copy the result using "Copy Paraphrase" button

## 🔧 Configuration

### Changing the AI Model

Edit `backend/paraphrase_api.py`:

```python
MODEL_NAME = "ramsrigouthamg/t5_paraphraser"  # Change to your preferred model
```

Popular alternatives:
- `Vamsi/T5_Paraphrase_Paws`
- `tuner007/pegasus_paraphrase`

### Changing the API Port

Edit the port in both:
1. `backend/paraphrase_api.py`: Change `port=8000`
2. `desktop-ui/ParaphraseApp/MainWindow.xaml.cs`: Change `API_URL`

### Customizing the Hotkey

Edit `desktop-ui/ParaphraseApp/MainWindow.xaml.cs`:

```csharp
// Change VK_P (0x50) to another key code
RegisterHotKey(helper.Handle, HOTKEY_ID, MOD_CONTROL | MOD_ALT, 0x50);
```

[Virtual Key Codes Reference](https://learn.microsoft.com/en-us/windows/win32/inputdev/virtual-key-codes)

## 🧪 Testing

### Test Backend API

```bash
# Check health
curl http://localhost:8000/health

# Test paraphrase
curl -X POST http://localhost:8000/paraphrase \
  -H "Content-Type: application/json" \
  -d "{\"text\":\"This is a test sentence.\",\"strength\":50}"
```

### Interactive API Documentation

Visit `http://localhost:8000/docs` for Swagger UI

## 📁 Project Structure

```
TextEditor/
├── backend/
│   ├── paraphrase_api.py      # FastAPI server
│   ├── requirements.txt        # Python dependencies
│   └── README.md               # Backend documentation
├── desktop-ui/
│   └── ParaphraseApp/
│       ├── ParaphraseApp.csproj
│       ├── App.xaml            # Application resources
│       ├── App.xaml.cs
│       ├── MainWindow.xaml     # Main UI
│       └── MainWindow.xaml.cs  # UI logic + hotkey
├── README.md                   # This file
├── LICENSE                     # MIT License
└── roadmap.md                  # Development roadmap
```

## 🐛 Troubleshooting

### Backend Issues

**"Model not loaded" error:**
- Wait for model download to complete on first run
- Check internet connection
- Ensure sufficient disk space (~2GB)

**Slow paraphrasing:**
- Install PyTorch with CUDA support for GPU acceleration
- Use a smaller model
- Reduce `num_beams` in generation parameters

**Port already in use:**
```bash
# Find and kill process using port 8000 (Windows)
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

### Frontend Issues

**Hotkey not working:**
- Check if another app is using Ctrl+Alt+P
- Run the app as Administrator
- Try a different key combination

**"Cannot connect to API" error:**
- Verify backend is running at `http://localhost:8000`
- Check firewall settings
- Ensure API URL matches in code

**Clipboard capture fails:**
- Some apps (PDFs, protected content) may block clipboard access
- Try selecting text in a different application
- Ensure text is actually selected before pressing hotkey

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Hugging Face Transformers](https://huggingface.co/transformers/) for the AI models
- [FastAPI](https://fastapi.tiangolo.com/) for the backend framework
- [.NET WPF](https://docs.microsoft.com/en-us/dotnet/desktop/wpf/) for the desktop UI

## 📚 Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - Quick start guide for new users
- **[INSTALLATION.md](INSTALLATION.md)** - Detailed installation instructions
- **[API_TESTING.md](API_TESTING.md)** - API testing guide
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Complete project overview
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Guidelines for contributors
- **[CHANGELOG.md](CHANGELOG.md)** - Version history and changes
- **[SECURITY.md](SECURITY.md)** - Security policy and best practices

## 🧪 Testing

### Run Backend Tests

```bash
# Start backend first, then run:
.\run-tests.bat
```

Or manually:
```bash
cd backend
pytest test_api.py -v
```

### Test Coverage

- Health endpoint tests
- Paraphrase endpoint tests
- Validation tests
- Performance tests
- Error handling tests

## 🔒 Security

This application prioritizes your privacy:

- ✅ 100% local processing
- ✅ No cloud services
- ✅ No telemetry or tracking
- ✅ No account required
- ✅ Open source for transparency

See [SECURITY.md](SECURITY.md) for detailed security information.

## 🔮 Roadmap

See [roadmap.md](roadmap.md) for detailed development plans and future features.

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing issues for solutions
- Review the troubleshooting section
- See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines

---

**Note:** This application is released as open-source software via GitHub only. No distribution through app stores or third-party platforms.
