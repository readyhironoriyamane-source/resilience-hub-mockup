import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'resilience_hub_bookmarks';

export function useBookmark() {
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setBookmarkedIds(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load bookmarks', e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Toggle bookmark status
  const toggleBookmark = useCallback((articleId: string) => {
    setBookmarkedIds(prev => {
      const newIds = prev.includes(articleId)
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId];
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newIds));
      return newIds;
    });
  }, []);

  // Check if bookmarked
  const isBookmarked = useCallback((articleId: string) => {
    return bookmarkedIds.includes(articleId);
  }, [bookmarkedIds]);

  return {
    bookmarkedIds,
    toggleBookmark,
    isBookmarked,
    isInitialized
  };
}
