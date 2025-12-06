using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Forms;   // for SendKeys
using System.Windows.Interop;
using System.Windows.Media.Animation;

namespace MinguApp
{
    public partial class MainWindow : Window
    {
        // Win32 API for global hotkey
        [DllImport("user32.dll")]
        private static extern bool RegisterHotKey(IntPtr hWnd, int id, uint fsModifiers, uint vk);

        [DllImport("user32.dll")]
        private static extern bool UnregisterHotKey(IntPtr hWnd, int id);

        private const int HOTKEY_ID = 9000;
        private const uint MOD_CONTROL = 0x0002;
        private const uint MOD_ALT = 0x0001;
        private const uint VK_M = 0x4D; // 'M' key

        // Typing speed in milliseconds per character
        private int typingDelayMs = 10; // Default: Medium speed

        // Favorites manager
        private FavoritesManager favoritesManager;

        public MainWindow()
        {
            InitializeComponent();
            favoritesManager = new FavoritesManager();
            UpdateCharacterCount();
            UpdateSpeedLabel();
            LoadFavoritesIntoComboBox();
        }

        // Window loaded - register hotkey
        private void Window_Loaded(object sender, RoutedEventArgs e)
        {
            // Register global hotkey Ctrl+Alt+M
            var helper = new WindowInteropHelper(this);
            if (!RegisterHotKey(helper.Handle, HOTKEY_ID, MOD_CONTROL | MOD_ALT, VK_M))
            {
                StatusText.Text = "⚠️ Could not register hotkey Ctrl+Alt+M. It may be in use by another app.";
            }

            // Hook into window messages to receive hotkey
            HwndSource source = HwndSource.FromHwnd(helper.Handle);
            source.AddHook(HwndHook);
        }

        // Window closed - unregister hotkey
        private void Window_Closed(object sender, EventArgs e)
        {
            var helper = new WindowInteropHelper(this);
            UnregisterHotKey(helper.Handle, HOTKEY_ID);
        }

        // Handle hotkey messages
        private IntPtr HwndHook(IntPtr hwnd, int msg, IntPtr wParam, IntPtr lParam, ref bool handled)
        {
            const int WM_HOTKEY = 0x0312;
            if (msg == WM_HOTKEY && wParam.ToInt32() == HOTKEY_ID)
            {
                // Hotkey pressed! Trigger typing
                Dispatcher.Invoke(() => StartTypingButton_Click(this, new RoutedEventArgs()));
                handled = true;
            }
            return IntPtr.Zero;
        }

        // Always on top checkbox
        private void AlwaysOnTopCheckbox_Changed(object sender, RoutedEventArgs e)
        {
            this.Topmost = AlwaysOnTopCheckbox.IsChecked == true;
        }

        // Favorites - Load into ComboBox
        private void LoadFavoritesIntoComboBox()
        {
            FavoritesComboBox.ItemsSource = null;
            FavoritesComboBox.ItemsSource = favoritesManager.GetFavorites();
            
            if (favoritesManager.GetFavorites().Count > 0)
            {
                FavoritesComboBox.SelectedIndex = 0;
            }
        }

        // Favorites - Selection changed
        private void FavoritesComboBox_SelectionChanged(object sender, System.Windows.Controls.SelectionChangedEventArgs e)
        {
            if (FavoritesComboBox.SelectedItem is FavoriteText favorite)
            {
                InputBox.Text = favorite.Text;
                StatusText.Text = $"📄 Loaded favorite: {favorite.Name}";
            }
        }

        // Favorites - Save button
        private void SaveFavoriteButton_Click(object sender, RoutedEventArgs e)
        {
            if (string.IsNullOrWhiteSpace(InputBox.Text))
            {
                StatusText.Text = "⚠️ Cannot save empty text as favorite.";
                return;
            }

            // Prompt for name
            var dialog = new SaveFavoriteDialog();
            if (dialog.ShowDialog() == true)
            {
                string name = dialog.FavoriteName;
                if (!string.IsNullOrWhiteSpace(name))
                {
                    favoritesManager.AddFavorite(name, InputBox.Text);
                    LoadFavoritesIntoComboBox();
                    StatusText.Text = $"💾 Saved as favorite: {name}";
                }
            }
        }

        // Favorites - Delete button
        private void DeleteFavoriteButton_Click(object sender, RoutedEventArgs e)
        {
            if (FavoritesComboBox.SelectedItem is FavoriteText favorite)
            {
                var result = System.Windows.MessageBox.Show(
                    $"Delete favorite '{favorite.Name}'?",
                    "Confirm Delete",
                    MessageBoxButton.YesNo,
                    MessageBoxImage.Question);

                if (result == MessageBoxResult.Yes)
                {
                    favoritesManager.DeleteFavorite(favorite.Name);
                    LoadFavoritesIntoComboBox();
                    StatusText.Text = $"🗑️ Deleted favorite: {favorite.Name}";
                }
            }
            else
            {
                StatusText.Text = "⚠️ No favorite selected to delete.";
            }
        }

        // Character counter update
        private void InputBox_TextChanged(object sender, System.Windows.Controls.TextChangedEventArgs e)
        {
            UpdateCharacterCount();
        }

        private void UpdateCharacterCount()
        {
            int charCount = InputBox.Text.Length;
            CharacterCounter.Text = $"{charCount} character{(charCount != 1 ? "s" : "")}";
        }

        // Speed slider change
        private void SpeedSlider_ValueChanged(object sender, System.Windows.RoutedPropertyChangedEventArgs<double> e)
        {
            UpdateSpeedLabel();
            UpdateTypingSpeed();
        }

        private void UpdateSpeedLabel()
        {
            if (SpeedLabel == null) return;

            int speed = (int)SpeedSlider.Value;
            switch (speed)
            {
                case 1:
                    SpeedLabel.Text = "Slow";
                    SpeedLabel.Foreground = new System.Windows.Media.SolidColorBrush(
                        (System.Windows.Media.Color)System.Windows.Media.ColorConverter.ConvertFromString("#FF9800"));
                    break;
                case 2:
                    SpeedLabel.Text = "Medium";
                    SpeedLabel.Foreground = new System.Windows.Media.SolidColorBrush(
                        (System.Windows.Media.Color)System.Windows.Media.ColorConverter.ConvertFromString("#4CAF50"));
                    break;
                case 3:
                    SpeedLabel.Text = "Fast";
                    SpeedLabel.Foreground = new System.Windows.Media.SolidColorBrush(
                        (System.Windows.Media.Color)System.Windows.Media.ColorConverter.ConvertFromString("#2196F3"));
                    break;
            }
        }

        private void UpdateTypingSpeed()
        {
            int speed = (int)SpeedSlider.Value;
            switch (speed)
            {
                case 1: // Slow
                    typingDelayMs = 30;
                    break;
                case 2: // Medium
                    typingDelayMs = 10;
                    break;
                case 3: // Fast
                    typingDelayMs = 3;
                    break;
            }
        }

        // Clear button
        private void ClearButton_Click(object sender, RoutedEventArgs e)
        {
            InputBox.Clear();
            StatusText.Text = "Text cleared. Ready for new input.";
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

            // Disable buttons during operation
            StartTypingButton.IsEnabled = false;
            ClearButton.IsEnabled = false;

            // Tell user what to do
            StatusText.Text = "⏱️ Click inside Notepad/Word where you want the text. Typing will start in 3 seconds...";

            // Show visual countdown
            await ShowCountdown();

            StatusText.Text = "⌨️ Typing... please do not touch keyboard or mouse.";

            // Actually type it
            await TypeTextAsync(textToType);

            StatusText.Text = $"✅ Done typing {textToType.Length} characters! Ready for next operation.";

            // Re-enable buttons
            StartTypingButton.IsEnabled = true;
            ClearButton.IsEnabled = true;
        }

        // Visual countdown display
        private async Task ShowCountdown()
        {
            CountdownOverlay.Visibility = Visibility.Visible;

            for (int i = 3; i >= 1; i--)
            {
                CountdownText.Text = i.ToString();
                
                // Pulse animation
                var animation = new DoubleAnimation
                {
                    From = 0.5,
                    To = 1.0,
                    Duration = TimeSpan.FromMilliseconds(800),
                    AutoReverse = false
                };
                CountdownText.BeginAnimation(OpacityProperty, animation);

                await Task.Delay(1000);
            }

            CountdownOverlay.Visibility = Visibility.Collapsed;
        }

        // Types text character by character into the active window
        private async Task TypeTextAsync(string text)
        {
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

                await Task.Delay(typingDelayMs);
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
