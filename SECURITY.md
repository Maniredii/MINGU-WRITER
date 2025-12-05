# Security Policy

## Supported Versions

Currently supported versions of Paraphrase Assistant:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Security Features

### Data Privacy

- **100% Local Processing**: All paraphrasing happens on your computer
- **No Cloud Services**: No data is sent to external servers
- **No Telemetry**: No usage tracking or analytics
- **No Account Required**: No registration or personal information needed
- **Open Source**: Full code transparency for security auditing

### Network Security

- **Local-only API**: Backend runs on localhost (127.0.0.1)
- **No External Connections**: Except for initial model download from Hugging Face
- **CORS Configured**: Only allows local connections
- **No Authentication**: Not needed as API is local-only

### Application Security

- **Input Validation**: All API inputs are validated with Pydantic
- **Error Handling**: Comprehensive error handling prevents crashes
- **Resource Cleanup**: Proper cleanup of hotkeys and resources
- **No Elevated Privileges**: Runs with normal user permissions

## Reporting a Vulnerability

If you discover a security vulnerability, please follow these steps:

### 1. Do Not Publicly Disclose

Please do not create a public GitHub issue for security vulnerabilities.

### 2. Report Privately

Send a detailed report to the project maintainers including:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### 3. Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: Depends on severity
  - Critical: Within 7 days
  - High: Within 14 days
  - Medium: Within 30 days
  - Low: Next release

### 4. Disclosure Process

- We will work with you to understand and fix the issue
- We will credit you in the security advisory (unless you prefer anonymity)
- We will coordinate public disclosure after a fix is available

## Security Best Practices for Users

### Installation

- **Download from Official Sources**: Only download from the official GitHub repository
- **Verify Checksums**: Verify file integrity if provided
- **Use Official Scripts**: Use provided setup scripts rather than manual installation

### Running the Application

- **Keep Updated**: Use the latest version
- **Firewall**: Ensure your firewall is active
- **Antivirus**: Keep antivirus software updated
- **Administrator Rights**: Only run as administrator if necessary for hotkey registration

### Configuration

- **Default Settings**: Use default settings unless you understand the implications
- **API Port**: Keep API on localhost only
- **Model Source**: Only use models from trusted sources (Hugging Face)

### Data Handling

- **Sensitive Data**: Be cautious when paraphrasing sensitive or confidential information
- **Clipboard**: Remember that clipboard contents may be accessible to other applications
- **Logs**: Check logs for any sensitive data before sharing

## Known Security Considerations

### Clipboard Access

- The application reads from the system clipboard
- Other applications may also have clipboard access
- Be aware of what you copy when using the global hotkey

### Global Hotkey

- The hotkey (Ctrl+Alt+P) is registered system-wide
- Malicious applications could potentially intercept keystrokes
- Use in a trusted environment

### Model Downloads

- AI models are downloaded from Hugging Face on first run
- Ensure you have a secure internet connection
- Models are cached locally after first download

### Local API

- The backend API runs on localhost:8000
- Other applications on your computer can access this API
- The API has no authentication (not needed for local-only use)

## Security Updates

Security updates will be released as needed:

- **Critical**: Immediate patch release
- **High**: Patch within 14 days
- **Medium/Low**: Included in next minor/major release

## Compliance

This application:

- ✅ Does not collect personal data
- ✅ Does not transmit data externally (except model download)
- ✅ Does not require internet after initial setup
- ✅ Stores no user data on disk (except configuration)
- ✅ Is fully open source for audit

## Third-Party Dependencies

### Backend Dependencies

- **FastAPI**: Web framework (regularly updated)
- **Transformers**: Hugging Face library (regularly updated)
- **PyTorch**: Deep learning framework (regularly updated)
- **Uvicorn**: ASGI server (regularly updated)

### Frontend Dependencies

- **.NET 6.0**: Microsoft framework (receives security updates)
- **Newtonsoft.Json**: JSON library (stable, widely used)

### Dependency Updates

- Dependencies are pinned to specific versions in requirements.txt
- Regular updates are released to address security vulnerabilities
- Check CHANGELOG.md for dependency updates

## Security Checklist for Contributors

If you're contributing code:

- [ ] Validate all user inputs
- [ ] Handle errors gracefully
- [ ] Avoid storing sensitive data
- [ ] Use secure coding practices
- [ ] Test for common vulnerabilities
- [ ] Document security implications
- [ ] Follow principle of least privilege

## Disclaimer

This software is provided "as is" without warranty of any kind. Users are responsible for:

- Securing their own systems
- Protecting sensitive data
- Using the application responsibly
- Complying with applicable laws and regulations

## Contact

For security concerns, please contact the project maintainers through:

- GitHub Issues (for non-sensitive matters)
- Private communication (for security vulnerabilities)

---

**Last Updated**: December 2025  
**Version**: 1.0.0
