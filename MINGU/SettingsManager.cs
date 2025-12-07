using System;
using System.IO;
using System.Text.Json;

namespace MinguApp
{
    public class WindowSettings
    {
        public double Left { get; set; }
        public double Top { get; set; }
        public double Width { get; set; }
        public double Height { get; set; }
        public bool IsMaximized { get; set; }
    }

    public class SettingsManager
    {
        private const string SettingsFile = "mingu_settings.json";

        public WindowSettings LoadWindowSettings()
        {
            try
            {
                if (File.Exists(SettingsFile))
                {
                    string json = File.ReadAllText(SettingsFile);
                    return JsonSerializer.Deserialize<WindowSettings>(json) ?? GetDefaultSettings();
                }
            }
            catch { }
            
            return GetDefaultSettings();
        }

        public void SaveWindowSettings(WindowSettings settings)
        {
            try
            {
                string json = JsonSerializer.Serialize(settings, new JsonSerializerOptions { WriteIndented = true });
                File.WriteAllText(SettingsFile, json);
            }
            catch { }
        }

        private WindowSettings GetDefaultSettings()
        {
            return new WindowSettings
            {
                Left = 100,
                Top = 100,
                Width = 750,
                Height = 650,
                IsMaximized = false
            };
        }
    }
}
