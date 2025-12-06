using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;

namespace MinguApp
{
    public class FavoritesManager
    {
        private const string FavoritesFile = "mingu_favorites.json";
        private List<FavoriteText> favorites;

        public FavoritesManager()
        {
            LoadFavorites();
        }

        public List<FavoriteText> GetFavorites()
        {
            return favorites ?? new List<FavoriteText>();
        }

        public void AddFavorite(string name, string text)
        {
            if (favorites == null)
                favorites = new List<FavoriteText>();

            favorites.Add(new FavoriteText
            {
                Name = name,
                Text = text,
                CreatedAt = DateTime.Now
            });

            SaveFavorites();
        }

        public void DeleteFavorite(string name)
        {
            if (favorites == null) return;

            favorites.RemoveAll(f => f.Name == name);
            SaveFavorites();
        }

        private void LoadFavorites()
        {
            try
            {
                if (File.Exists(FavoritesFile))
                {
                    string json = File.ReadAllText(FavoritesFile);
                    favorites = JsonSerializer.Deserialize<List<FavoriteText>>(json) ?? new List<FavoriteText>();
                }
                else
                {
                    favorites = new List<FavoriteText>();
                }
            }
            catch
            {
                favorites = new List<FavoriteText>();
            }
        }

        private void SaveFavorites()
        {
            try
            {
                string json = JsonSerializer.Serialize(favorites, new JsonSerializerOptions { WriteIndented = true });
                File.WriteAllText(FavoritesFile, json);
            }
            catch
            {
                // Silently fail
            }
        }
    }

    public class FavoriteText
    {
        public string Name { get; set; } = "";
        public string Text { get; set; } = "";
        public DateTime CreatedAt { get; set; }
    }
}
