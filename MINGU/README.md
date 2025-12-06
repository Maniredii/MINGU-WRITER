# MINGU - Auto Typer

## What is MINGU?

MINGU is a simple Windows application that automatically types text into other applications (like Notepad or Word). It's a **typing robot** that saves you time!

## How to Use MINGU

### Step-by-Step Guide

1. **Open MINGU**
   - Double-click `MinguApp.exe` (located in `MINGU\bin\Release\net6.0-windows\win-x64\publish\`)
   - Or use the shortcut if you created one

2. **Set up your workspace**
   - Put MINGU on the left side of your screen
   - Open Notepad or Word on the right side (split screen)

3. **Enter your text**
   - Type or paste your text into the large text box in MINGU

4. **Start auto-typing**
   - Click the green button: **"Start typing into active window"**
   - You'll see a message: *"Click inside Notepad/Word where you want the text. Typing will start in 3 seconds..."*

5. **Click in your target application**
   - Quickly click inside Notepad or Word where you want the text to appear
   - You have 3 seconds!

6. **Watch the magic!**
   - MINGU will automatically type your text character by character
   - Don't touch your keyboard or mouse while it's typing

7. **Done!**
   - When finished, you'll see: *"Done typing! Ready for next operation."*

## Example Workflow

```
1. Open MINGU (left side) + Notepad (right side)
2. In MINGU, paste: "Hello, this is a test of the auto-typing feature!"
3. Click "Start typing into active window"
4. Click inside Notepad
5. Wait 3 seconds
6. Watch MINGU type the text automatically!
```

## Features

✅ **Simple Interface** - Just a text box and a button  
✅ **3-Second Countdown** - Gives you time to click where you want  
✅ **Works with Any App** - Notepad, Word, browsers, email, etc.  
✅ **Character-by-Character** - Types naturally like a human  
✅ **Special Characters** - Handles Enter, Tab, and special symbols  
✅ **Standalone .exe** - No installation needed!

## System Requirements

- **OS**: Windows 10 or Windows 11 (64-bit)
- **RAM**: 100 MB
- **Storage**: ~150 MB for the executable
- **No .NET installation needed** - Everything is included!

## Building from Source

If you want to rebuild the executable:

```bash
# Run the build script
.\build-mingu.bat

# Or manually:
cd MINGU
dotnet publish -c Release -r win-x64 --self-contained true -p:PublishSingleFile=true
```

The executable will be created at:
```
MINGU\bin\Release\net6.0-windows\win-x64\publish\MinguApp.exe
```

## Tips for Best Results

💡 **Use split screen** - Put MINGU on one side, target app on the other  
💡 **Click quickly** - You have 3 seconds after clicking the button  
💡 **Don't interrupt** - Let MINGU finish typing before touching anything  
💡 **Test first** - Try with a short text in Notepad before using with important documents  

## Troubleshooting

**Problem**: Text doesn't appear  
**Solution**: Make sure you clicked inside the target window within 3 seconds

**Problem**: Text appears in wrong place  
**Solution**: Click exactly where you want the cursor before the countdown ends

**Problem**: Special characters look wrong  
**Solution**: This is normal for some apps - MINGU handles most characters correctly

**Problem**: Typing is too fast/slow  
**Solution**: The speed is set to 10ms per character (very fast). This can be adjusted in the code if needed.

## What's Next? (Future Features)

This is **Phase 1** - a simple auto-typer. Future versions may include:

- 🔮 AI paraphrasing before typing
- ⌨️ Global hotkeys to start typing
- 📝 Direct Word integration (no clicking needed)
- ⚡ Adjustable typing speed
- 💾 Save favorite texts
- 🎨 More customization options

## Technical Details

- **Built with**: C# WPF (.NET 6)
- **Auto-typing**: Windows Forms SendKeys API
- **UI Framework**: WPF with modern styling
- **Typing Speed**: 10ms delay per character (~100 characters/second)

---

**MINGU** = **M**y **I**ntelligent **N**otepad **G**host **U**tility

Happy auto-typing! 🚀
