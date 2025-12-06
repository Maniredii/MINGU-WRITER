using System;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Forms;   // for SendKeys

namespace MinguApp
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        // Button click: start typing into active window
        private async void StartTypingButton_Click(object sender, RoutedEventArgs e)
        {
            string textToType = InputBox.Text;

            if (string.IsNullOrWhiteSpace(textToType))
            {
                StatusText.Text = "⚠️ Nothing to type. Please enter some text first.";
                return;
            }

            // Disable button during operation
            StartTypingButton.IsEnabled = false;

            // Tell user what to do
            StatusText.Text = "⏱️ Click inside Notepad/Word where you want the text. Typing will start in 3 seconds...";

            // Give them time to click into the target window
            await Task.Delay(3000);

            StatusText.Text = "⌨️ Typing... please do not touch keyboard or mouse.";

            // Actually type it
            await TypeTextAsync(textToType);

            StatusText.Text = "✅ Done typing! Ready for next operation.";

            // Re-enable button
            StartTypingButton.IsEnabled = true;
        }

        // Types text character by character into the active window
        private async Task TypeTextAsync(string text)
        {
            // Small delay between characters to look like natural typing
            int delayPerCharMs = 10; // you can increase if needed for slower typing

            foreach (char c in text)
            {
                // Handle special characters manually for SendKeys
                if (c == '\n' || c == '\r')
                {
                    SendKeys.SendWait("{ENTER}");
                }
                else if (c == '\t')
                {
                    SendKeys.SendWait("{TAB}");
                }
                else
                {
                    // Some characters are special in SendKeys, so escape them
                    string s = EscapeForSendKeys(c);
                    SendKeys.SendWait(s);
                }

                await Task.Delay(delayPerCharMs);
            }
        }

        // Escape special chars for SendKeys
        private string EscapeForSendKeys(char c)
        {
            // SendKeys uses special chars: + ^ % ~ ( ) { } [ ]
            switch (c)
            {
                case '+':
                case '^':
                case '%':
                case '~':
                case '(':
                case ')':
                case '{':
                case '}':
                case '[':
                case ']':
                    return "{" + c + "}";
                default:
                    return c.ToString();
            }
        }
    }
}
