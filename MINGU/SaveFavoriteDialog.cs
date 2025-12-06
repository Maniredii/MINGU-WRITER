using System.Windows;
using System.Windows.Controls;

namespace MinguApp
{
    public partial class SaveFavoriteDialog : Window
    {
        public string FavoriteName { get; private set; } = "";

        public SaveFavoriteDialog()
        {
            Title = "Save Favorite";
            Width = 400;
            Height = 150;
            WindowStartupLocation = WindowStartupLocation.CenterOwner;
            ResizeMode = ResizeMode.NoResize;

            var grid = new Grid { Margin = new Thickness(20) };
            grid.RowDefinitions.Add(new RowDefinition { Height = GridLength.Auto });
            grid.RowDefinitions.Add(new RowDefinition { Height = GridLength.Auto });
            grid.RowDefinitions.Add(new RowDefinition { Height = GridLength.Auto });

            var label = new TextBlock
            {
                Text = "Enter a name for this favorite:",
                FontSize = 14,
                Margin = new Thickness(0, 0, 0, 10)
            };
            Grid.SetRow(label, 0);
            grid.Children.Add(label);

            var textBox = new TextBox
            {
                FontSize = 14,
                Padding = new Thickness(5),
                Margin = new Thickness(0, 0, 0, 15)
            };
            Grid.SetRow(textBox, 1);
            grid.Children.Add(textBox);

            var buttonPanel = new StackPanel
            {
                Orientation = Orientation.Horizontal,
                HorizontalAlignment = HorizontalAlignment.Right
            };
            Grid.SetRow(buttonPanel, 2);

            var saveButton = new Button
            {
                Content = "Save",
                Width = 80,
                Height = 30,
                Margin = new Thickness(0, 0, 10, 0)
            };
            saveButton.Click += (s, e) =>
            {
                FavoriteName = textBox.Text.Trim();
                if (!string.IsNullOrWhiteSpace(FavoriteName))
                {
                    DialogResult = true;
                    Close();
                }
            };

            var cancelButton = new Button
            {
                Content = "Cancel",
                Width = 80,
                Height = 30
            };
            cancelButton.Click += (s, e) =>
            {
                DialogResult = false;
                Close();
            };

            buttonPanel.Children.Add(saveButton);
            buttonPanel.Children.Add(cancelButton);
            grid.Children.Add(buttonPanel);

            Content = grid;

            textBox.Focus();
        }
    }
}
