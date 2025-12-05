using System;
using System.Net.Http;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Interop;
using System.Windows.Media;
using Newtonsoft.Json;

namespace ParaphraseApp
{
    public partial class MainWindow : Window
    {
        private const int HOTKEY_ID = 9000;
        private const uint MOD_ALT = 0x0001;
        private const uint MOD_CONTROL = 0x0002;
        private const int WM_HOTKEY = 0x0312;
        private const string API_URL = "http://localhost:8000/paraphrase";

        [DllImport("user32.dll")]
        private static extern bool RegisterHotKey(IntPtr hWnd, int id, uint fsModifiers, uint vk);

        [DllImport("user32.dll")]
        private static extern bool UnregisterHotKey(IntPtr hWnd, int id);

        private HwndSource? _source;
        private readonly HttpClient _httpClient;

        public MainWindow()
        {
            InitializeComponent();
            _httpClient = new HttpClient { Timeout = TimeSpan.FromSeconds(30) };
            
            Loaded += MainWindow_Loaded;
            Closed += MainWindow_Closed;
            StrengthSlider.ValueChanged += StrengthSlider_ValueChanged;
            
            // Check API status on startup
            _ = CheckApiStatusAsync();
        }

        private void MainWindow_Loaded(object sender, RoutedEventArgs e)
        {
            var helper = new WindowInteropHelper(this);
            _source = HwndSource.FromHwnd(helper.Handle);
            _source.AddHook(HwndHook);

            // Register Ctrl+Alt+P (VK_P = 0x50)
            bool registered = RegisterHotKey(helper.Handle, HOTKEY_ID, MOD_CONTROL | MOD_ALT, 0x50);
            
            if (registered)
            {
                UpdateStatus("Ready - Press Ctrl+Alt+P to capture text", true);
            }
            else
            {
                UpdateStatus("Warning: Could not register hotkey Ctrl+Alt+P", false);
            }
        }

        private void MainWindow_Closed(object sender, EventArgs e)
        {
            var helper = new WindowInteropHelper(this);
            UnregisterHotKey(helper.Handle, HOTKEY_ID);
            _source?.RemoveHook(HwndHook);
            _httpClient.Dispose();
        }

        private IntPtr HwndHook(IntPtr hwnd, int msg, IntPtr wParam, IntPtr lParam, ref bool handled)
        {
            if (msg == WM_HOTKEY)
            {
                int id = wParam.ToInt32();
                if (id == HOTKEY_ID)
                {
                    _ = OnHotkeyPressedAsync();
                    handled = true;
                }
            }
            return IntPtr.Zero;
        }

        private async Task OnHotkeyPressedAsync()
        {
            try
            {
                UpdateStatus("Hotkey pressed — copying selection...", true);

                // Simulate Ctrl+C to copy selection from the focused window
                SimulateCtrlC();

                // Wait for clipboard and read contents
                string text = await WaitForClipboardTextAsync(timeoutMs: 1500);
                if (string.IsNullOrWhiteSpace(text))
                {
                    UpdateStatus("No text found in clipboard", false);
                    return;
                }

                // Update original text box
                OriginalTextBox.Text = text;

                UpdateStatus($"Captured {text.Length} characters. Sending to paraphrase API...", true);

                // POST to local paraphrase endpoint
                var paraphrase = await PostToParaphraseApiAsync(text, (int)StrengthSlider.Value);

                if (paraphrase != null)
                {
                    ParaphraseResult.Text = paraphrase;
                    UpdateStatus("Paraphrase received successfully!", true);
                }
                else
                {
                    UpdateStatus("No paraphrase returned from API", false);
                }
            }
            catch (Exception ex)
            {
                UpdateStatus($"Error: {ex.Message}", false);
            }
        }

        private void SimulateCtrlC()
        {
            // Using SendKeys to simulate Ctrl+C
            System.Windows.Forms.SendKeys.SendWait("^c");
        }

        private async Task<string?> WaitForClipboardTextAsync(int timeoutMs = 1500)
        {
            int waited = 0;
            const int delay = 100;
            string? result = null;

            while (waited < timeoutMs)
            {
                try
                {
                    if (Clipboard.ContainsText())
                    {
                        result = Clipboard.GetText();
                        if (!string.IsNullOrWhiteSpace(result))
                            break;
                    }
                }
                catch
                {
                    // Clipboard can be transiently unavailable; ignore and retry
                }

                await Task.Delay(delay);
                waited += delay;
            }

            return result;
        }

        private async Task<string?> PostToParaphraseApiAsync(string text, int strength = 50)
        {
            try
            {
                var payload = new { text = text, strength = strength };
                string json = JsonConvert.SerializeObject(payload);

                var content = new StringContent(json, Encoding.UTF8, "application/json");
                var resp = await _httpClient.PostAsync(API_URL, content);
                
                if (!resp.IsSuccessStatusCode)
                {
                    throw new Exception($"API error: {resp.StatusCode}");
                }
                
                var respJson = await resp.Content.ReadAsStringAsync();
                dynamic? obj = JsonConvert.DeserializeObject(respJson);
                return (string?)obj?.paraphrase;
            }
            catch (HttpRequestException ex)
            {
                throw new Exception("Cannot connect to API. Is the backend server running?", ex);
            }
        }

        private async Task CheckApiStatusAsync()
        {
            try
            {
                var response = await _httpClient.GetAsync("http://localhost:8000/health");
                if (response.IsSuccessStatusCode)
                {
                    ApiStatusText.Text = "Connected";
                    ApiStatusText.Foreground = new SolidColorBrush(Color.FromRgb(16, 185, 129)); // Success green
                }
                else
                {
                    ApiStatusText.Text = "Error";
                    ApiStatusText.Foreground = new SolidColorBrush(Color.FromRgb(239, 68, 68)); // Error red
                }
            }
            catch
            {
                ApiStatusText.Text = "Offline";
                ApiStatusText.Foreground = new SolidColorBrush(Color.FromRgb(239, 68, 68)); // Error red
            }
        }

        private void UpdateStatus(string message, bool isSuccess)
        {
            StatusText.Text = message;
            StatusIndicator.Fill = isSuccess 
                ? new SolidColorBrush(Color.FromRgb(16, 185, 129)) 
                : new SolidColorBrush(Color.FromRgb(239, 68, 68));
        }

        private void StrengthSlider_ValueChanged(object sender, RoutedPropertyChangedEventArgs<double> e)
        {
            if (StrengthValue == null || StrengthDescription == null) return;

            int value = (int)e.NewValue;
            StrengthValue.Text = value.ToString();

            if (value <= 30)
            {
                StrengthDescription.Text = "Conservative paraphrasing (minimal changes)";
            }
            else if (value <= 70)
            {
                StrengthDescription.Text = "Moderate paraphrasing (balanced)";
            }
            else
            {
                StrengthDescription.Text = "Aggressive paraphrasing (maximum diversity)";
            }
        }

        private async void ParaphraseButton_Click(object sender, RoutedEventArgs e)
        {
            string text = OriginalTextBox.Text.Trim();
            
            if (string.IsNullOrWhiteSpace(text))
            {
                UpdateStatus("Please enter text to paraphrase", false);
                return;
            }

            try
            {
                ParaphraseButton.IsEnabled = false;
                UpdateStatus("Paraphrasing...", true);

                var paraphrase = await PostToParaphraseApiAsync(text, (int)StrengthSlider.Value);

                if (paraphrase != null)
                {
                    ParaphraseResult.Text = paraphrase;
                    UpdateStatus("Paraphrase completed successfully!", true);
                }
                else
                {
                    UpdateStatus("No paraphrase returned from API", false);
                }
            }
            catch (Exception ex)
            {
                UpdateStatus($"Error: {ex.Message}", false);
            }
            finally
            {
                ParaphraseButton.IsEnabled = true;
            }
        }

        private void CopyButton_Click(object sender, RoutedEventArgs e)
        {
            string text = ParaphraseResult.Text.Trim();
            
            if (string.IsNullOrWhiteSpace(text))
            {
                UpdateStatus("No paraphrased text to copy", false);
                return;
            }

            try
            {
                Clipboard.SetText(text);
                UpdateStatus("Paraphrased text copied to clipboard!", true);
            }
            catch (Exception ex)
            {
                UpdateStatus($"Failed to copy: {ex.Message}", false);
            }
        }

        private void OriginalTextBox_TextChanged(object sender, System.Windows.Controls.TextChangedEventArgs e)
        {
            OriginalTextLength.Text = $"{OriginalTextBox.Text.Length} characters";
        }

        private void ParaphraseResult_TextChanged(object sender, System.Windows.Controls.TextChangedEventArgs e)
        {
            ParaphraseTextLength.Text = $"{ParaphraseResult.Text.Length} characters";
        }
    }
}
