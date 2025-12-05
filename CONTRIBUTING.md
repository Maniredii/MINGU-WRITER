# Contributing to Paraphrase Assistant

Thank you for your interest in contributing to Paraphrase Assistant! This document provides guidelines and instructions for contributing.

## 🤝 How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:

- **Clear title**: Describe the bug briefly
- **Steps to reproduce**: Detailed steps to recreate the issue
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Environment**: OS version, Python version, .NET version
- **Screenshots**: If applicable

### Suggesting Features

Feature requests are welcome! Please create an issue with:

- **Feature description**: Clear explanation of the feature
- **Use case**: Why this feature would be useful
- **Proposed implementation**: If you have ideas on how to implement it

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Test thoroughly**
5. **Commit with clear messages**:
   ```bash
   git commit -m "Add feature: description"
   ```
6. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Create a Pull Request**

## 📋 Development Guidelines

### Code Style

**Python (Backend)**
- Follow PEP 8 style guide
- Use type hints where possible
- Add docstrings to functions
- Keep functions focused and small

**C# (Frontend)**
- Follow Microsoft C# coding conventions
- Use meaningful variable names
- Add XML documentation comments
- Keep methods focused and testable

### Testing

Before submitting a PR:

- [ ] Test backend API endpoints
- [ ] Test frontend UI functionality
- [ ] Test global hotkey
- [ ] Test clipboard integration
- [ ] Test error handling
- [ ] Verify on clean install

### Documentation

- Update README.md if adding features
- Add comments for complex logic
- Update API documentation if changing endpoints
- Include examples for new features

## 🏗️ Project Structure

```
TextEditor/
├── backend/              # Python FastAPI backend
│   ├── paraphrase_api.py
│   └── requirements.txt
├── desktop-ui/           # C# WPF frontend
│   └── ParaphraseApp/
└── docs/                 # Documentation
```

## 🔧 Setting Up Development Environment

### Backend Development

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
pip install pytest black flake8  # Development tools
```

### Frontend Development

```bash
cd desktop-ui/ParaphraseApp
dotnet restore
dotnet build
```

## 🎯 Areas for Contribution

### High Priority

- [ ] Add unit tests for backend
- [ ] Add unit tests for frontend
- [ ] Improve error messages
- [ ] Add logging configuration
- [ ] Performance optimizations

### Medium Priority

- [ ] Support for multiple languages
- [ ] Custom model selection UI
- [ ] History of paraphrases
- [ ] Export functionality
- [ ] Keyboard shortcuts customization

### Low Priority

- [ ] Dark mode theme
- [ ] System tray integration
- [ ] Auto-update functionality
- [ ] Batch processing
- [ ] Plugin system

## 🐛 Debugging

### Backend Debugging

```bash
# Run with debug logging
python paraphrase_api.py --log-level debug

# Use Python debugger
python -m pdb paraphrase_api.py
```

### Frontend Debugging

- Use Visual Studio debugger (F5)
- Check Output window for logs
- Use breakpoints in MainWindow.xaml.cs

## 📝 Commit Message Guidelines

Use clear, descriptive commit messages:

- `feat: Add new feature`
- `fix: Fix bug in clipboard capture`
- `docs: Update README`
- `style: Format code`
- `refactor: Refactor API client`
- `test: Add tests for paraphrase endpoint`
- `chore: Update dependencies`

## 🔍 Code Review Process

All PRs will be reviewed for:

- Code quality and style
- Test coverage
- Documentation
- Performance impact
- Security considerations

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors will be recognized in:

- README.md acknowledgments
- Release notes
- GitHub contributors page

## 💬 Communication

- **Issues**: For bugs and feature requests
- **Pull Requests**: For code contributions
- **Discussions**: For questions and ideas

## ❓ Questions?

If you have questions about contributing, feel free to:

- Open an issue with the "question" label
- Check existing issues and discussions
- Review the documentation

Thank you for contributing to Paraphrase Assistant! 🎉
