"use client";

import { motion } from "framer-motion";
import { History, Star, StarOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { RecentSearch, FavoriteLocation } from "../types/weather";

interface RecentSearchesProps {
  searches: RecentSearch[];
  favorites: FavoriteLocation[];
  onSearchSelect: (lat: number, lon: number) => void;
  onToggleFavorite: (location: FavoriteLocation) => void;
}

export default function RecentSearches({
  searches,
  favorites,
  onSearchSelect,
  onToggleFavorite,
}: RecentSearchesProps) {
  const isFavorite = (name: string) =>
    favorites.some((fav) => fav.name === name);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mb-8"
    >
      <div className="flex items-center gap-2 mb-4">
        <History className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-semibold">Recent Searches</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {searches.map((search) => (
          <div
            key={`${search.name}-${search.timestamp}`}
            className="flex items-center gap-2 bg-white/10 rounded-lg p-2"
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSearchSelect(search.lat, search.lon)}
            >
              {search.name}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleFavorite(search)}
            >
              {isFavorite(search.name) ? (
                <Star className="w-4 h-4 text-yellow-500" />
              ) : (
                <StarOff className="w-4 h-4" />
              )}
            </Button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}