# Desktop UI - WPF Application

Modern Windows desktop application for the Paraphrase Assistant.

## Features

- Global hotkey registration (Ctrl+Alt+P)
- Clipboard integration for seamless text capture
- Real-time API status monitoring
- Adjustable paraphrase strength slider
- Character count tracking
- Modern, responsive UI design

## Building

### Using .NET CLI

```bash
cd desktop-ui/ParaphraseApp
dotnet restore
dotnet build
dotnet run
```

### Using Visual Studio

1. Open `ParaphraseApp.csproj` in Visual Studio 2022
2. Press F5 to build and run
3. Or use Build → Build Solution (Ctrl+Shift+B)

## Publishing

Create a standalone executable:

```bash
dotnet publish -c Release -r win-x64 --self-contained true -p:PublishSingleFile=true
```

The executable will be in `bin/Release/net6.0-windows/win-x64/publish/`

## Requirements

- .NET 6.0 Runtime or SDK
- Windows 10/11
- Backend API running at http://localhost:8000

## Architecture

### Key Components

**MainWindow.xaml**
- Two-panel layout for original and paraphrased text
- Status indicator with real-time updates
- Strength slider with descriptive labels
- Action buttons (Paraphrase Now, Copy)

**MainWindow.xaml.cs**
- Global hotkey registration using Win32 API
- Clipboard capture via SendKeys simulation
- Async HTTP communication with backend
- UI event handlers and state management

**App.xaml**
- Application-wide resources
- Modern color palette
- Reusable control styles

### Win32 API Integration

The app uses P/Invoke to call Windows API functions:

```csharp
[DllImport("user32.dll")]
private static extern bool RegisterHotKey(IntPtr hWnd, int id, uint fsModifiers, uint vk);
```

This enables system-wide hotkey registration that works even when the app is minimized.

## Customization

### Changing Colors

Edit `App.xaml` color resources:

```xml
<SolidColorBrush x:Key="PrimaryBrush" Color="#6366F1"/>
```

### Modifying Hotkey

Edit `MainWindow.xaml.cs`:

```csharp
// Current: Ctrl+Alt+P (VK_P = 0x50)
RegisterHotKey(helper.Handle, HOTKEY_ID, MOD_CONTROL | MOD_ALT, 0x50);

// Example: Ctrl+Alt+T (VK_T = 0x54)
RegisterHotKey(helper.Handle, HOTKEY_ID, MOD_CONTROL | MOD_ALT, 0x54);
```

### API Endpoint

Change the API URL in `MainWindow.xaml.cs`:

```csharp
private const string API_URL = "http://localhost:8000/paraphrase";
```

## Troubleshooting

**Hotkey doesn't work:**
- Check if another app is using the same hotkey
- Try running as Administrator
- Verify the app is running (check system tray)

**Build errors:**
- Ensure .NET 6.0 SDK is installed
- Run `dotnet restore` to restore NuGet packages
- Check that all XAML files have correct Build Action (Page)

**Runtime errors:**
- Ensure backend API is running
- Check Windows Firewall settings
- Verify .NET 6.0 Runtime is installed

## Dependencies

- **Newtonsoft.Json** (13.0.3): JSON serialization
- **System.Windows.Forms**: SendKeys functionality
- **.NET 6.0 Windows**: WPF framework
