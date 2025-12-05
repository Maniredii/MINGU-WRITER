Nice — I added the “GitHub-only, open-source releases” note to the roadmap (below), and I’m including **both** working code examples you asked for:

1. Exact **C# (WPF)** snippet that registers a global hotkey `Ctrl+Alt+P`, simulates `Ctrl+C` to copy the selection from the currently focused app, reads the clipboard, and POSTs the text to `http://localhost:8000/paraphrase`.
2. A minimal **FastAPI** paraphrase endpoint example that accepts `{"text","strength"}` and returns a paraphrase (using Hugging Face `transformers` pipeline). This endpoint is ready to run locally.

---

# Roadmap note update (GitHub-only open-source releases)

Add this to the roadmap under **Milestone 7 — Packaging & Release**:

**Open-source release policy:** This project will **only** be published to the project's GitHub repository. Releases will be created via GitHub Releases (tagged versions). No binaries or distribution will be published to third-party marketplaces. The repo should include a clear LICENSE (recommended: MIT or Apache 2.0), README, release notes for each tag, and a privacy policy. Provide build artifacts (installers) in GitHub Releases if desired, but do not publish to external app stores.

---

# 1) C# WPF — Global hotkey + clipboard capture + POST to local API

Create a new WPF .NET project and add this code to `MainWindow.xaml.cs` (or similar). This implementation:

* Registers a global hotkey `Ctrl+Alt+P`
* When triggered, simulates Ctrl+C to copy the selected text in the current app
* Waits briefly for the clipboard to update (with retries)
* Sends captured text to `http://localhost:8000/paraphrase` via `HttpClient`
* Shows simple success/error notifications

```csharp
// MainWindow.xaml.cs
using System;
using System.Net.Http;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Interop;
using System.Windows.Threading;
using Newtonsoft.Json;

namespace ParaphraseApp
{
    public partial class MainWindow : Window
    {
        private const int HOTKEY_ID = 9000;
        private const uint MOD_ALT = 0x0001;
        private const uint MOD_CONTROL = 0x0002;
        private const int WM_HOTKEY = 0x0312;

        [DllImport("user32.dll")]
        private static extern bool RegisterHotKey(IntPtr hWnd, int id, uint fsModifiers, uint vk);

        [DllImport("user32.dll")]
        private static extern bool UnregisterHotKey(IntPtr hWnd, int id);

        public MainWindow()
        {
            InitializeComponent();
            Loaded += MainWindow_Loaded;
            Closed += MainWindow_Closed;
        }

        private HwndSource _source;

        private void MainWindow_Loaded(object sender, RoutedEventArgs e)
        {
            var helper = new WindowInteropHelper(this);
            _source = HwndSource.FromHwnd(helper.Handle);
            _source.AddHook(HwndHook);

            // Register Ctrl+Alt+P (VK_P = 0x50)
            RegisterHotKey(helper.Handle, HOTKEY_ID, MOD_CONTROL | MOD_ALT, 0x50);
        }

        private void MainWindow_Closed(object sender, EventArgs e)
        {
            var helper = new WindowInteropHelper(this);
            UnregisterHotKey(helper.Handle, HOTKEY_ID);
            _source.RemoveHook(HwndHook);
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
                // Optional: show small countdown to let user focus target app (UI thread)
                Dispatcher.Invoke(() =>
                {
                    // simple visual feedback (replace with toast/notification)
                    StatusText.Text = "Hotkey pressed — copying selection...";
                });

                // Simulate Ctrl+C to copy selection from the focused window
                SimulateCtrlC();

                // Wait for clipboard and read contents
                string text = await WaitForClipboardTextAsync(timeoutMs: 1500);
                if (string.IsNullOrWhiteSpace(text))
                {
                    Dispatcher.Invoke(() => StatusText.Text = "No text found in clipboard.");
                    return;
                }

                Dispatcher.Invoke(() =>
                {
                    StatusText.Text = "Captured text (length " + text.Length + "). Sending to local paraphrase API...";
                });

                // POST to local paraphrase endpoint
                var paraphrase = await PostToParaphraseApiAsync(text, strength: 50);

                // Show result in UI (right pane or textbox) - ensure you have a control named ParaphraseResult
                Dispatcher.Invoke(() =>
                {
                    ParaphraseResult.Text = paraphrase ?? "[No paraphrase returned]";
                    StatusText.Text = "Paraphrase received.";
                });
            }
            catch (Exception ex)
            {
                Dispatcher.Invoke(() => StatusText.Text = "Error: " + ex.Message);
            }
        }

        private void SimulateCtrlC()
        {
            // Simpler approach using SendKeys - ensure STA thread
            System.Windows.Forms.SendKeys.SendWait("^c");
        }

        private async Task<string> WaitForClipboardTextAsync(int timeoutMs = 1500)
        {
            int waited = 0;
            const int delay = 100;
            string result = null;

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

        private async Task<string> PostToParaphraseApiAsync(string text, int strength = 50)
        {
            var payload = new { text = text, strength = strength };
            string json = JsonConvert.SerializeObject(payload);

            using (var client = new HttpClient())
            {
                client.Timeout = TimeSpan.FromSeconds(10);
                var content = new StringContent(json, Encoding.UTF8, "application/json");
                var resp = await client.PostAsync("http://localhost:8000/paraphrase", content);
                if (!resp.IsSuccessStatusCode)
                {
                    throw new Exception("Paraphrase API error: " + resp.StatusCode);
                }
                var respJson = await resp.Content.ReadAsStringAsync();
                dynamic obj = JsonConvert.DeserializeObject(respJson);
                return (string)obj.paraphrase;
            }
        }
    }
}
```

**Notes / improvements**

* Replace `System.Windows.Forms.SendKeys.SendWait("^c")` with a more robust `SendInput` P/Invoke if you need reliability for certain apps (e.g., PDF readers). `SendKeys` is fine for many editors.
* Add a short confirm/countdown and target-window-title check before auto-typing results into other apps.
* Add exception handling for clipboard access and better UI to show errors/toasts.
* The example uses `Newtonsoft.Json`—add via NuGet.

---

# 2) FastAPI paraphrase endpoint (local) — minimal example

This example uses `transformers` to load a seq2seq model for paraphrasing. Replace `MODEL_NAME` with your chosen model (T5-style paraphrasing models). The code runs a local FastAPI server at `http://localhost:8000/paraphrase`.

Create a virtualenv, `pip install fastapi uvicorn transformers torch sentencepiece` (or the minimal packages your model requires).

```python
# paraphrase_api.py
from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
import logging

# Hugging Face transformers
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

app = FastAPI(title="Paraphrase API")

# Choose a paraphrase-capable model you have locally or can download
# For example: "Vamsi/T5_Paraphrase_Paws" or another T5 variant.
MODEL_NAME = "ramsrigouthamg/t5_paraphraser"  # replace with chosen model

logging.info("Loading model... (this may take time)")
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME)
logging.info("Model loaded.")


class ParaphraseRequest(BaseModel):
    text: str
    strength: Optional[int] = 50  # 0-100, you can map to decoding params


@app.post("/paraphrase")
def paraphrase(req: ParaphraseRequest):
    text = req.text.strip()
    if not text:
        return {"paraphrase": ""}

    # Prepare model input. Many T5 paraphrase models accept instruction-style input:
    # Example: "paraphrase: <text> </s>"
    # Modify per your model's expected prompt.
    input_text = "paraphrase: " + text

    inputs = tokenizer.encode(input_text, return_tensors="pt", max_length=512, truncation=True)

    # Map strength to decoding parameters (simple mapping example)
    strength = max(0, min(100, req.strength))
    # higher "strength" -> more diverse generation
    temperature = 0.7 + (strength / 100.0) * 0.8  # 0.7..1.5
    num_beams = 4 if strength < 40 else 2  # conservative vs aggressive

    outputs = model.generate(
        inputs,
        max_length=512,
        num_beams=num_beams,
        early_stopping=True,
        temperature=temperature,
        num_return_sequences=1,
        do_sample=(strength > 30),
    )

    paraphrase = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return {"paraphrase": paraphrase}
```

Run it with:

```bash
uvicorn paraphrase_api:app --host 127.0.0.1 --port 8000 --reload
```

**Notes & tips**

* Choose a paraphrasing model that fits your hardware. Large models require GPU/memory; for CPU-only, use smaller quantized models or run with reduced batch sizes.
* For production/local reliability, consider model warmup and caching.
* You can wrap the model call in `async` and use `run_in_executor` if you want the FastAPI event loop to remain responsive.
* If you want an even lighter-weight solution initially, implement a placeholder that performs simple rule-based synonym substitution until you add a model.

---

# Final checklist for hooking them together

1. Clone the repo and create two folders/services: `desktop-ui` (C#) and `paraphrase-api` (Python).
2. Run the Python `uvicorn` server locally.
3. Start the WPF app and press `Ctrl+Alt+P` while a selection is made in another app — captured text should appear in `ParaphraseResult`.
4. From here you can add UI accept / auto-type functionality and Word COM insertion.


