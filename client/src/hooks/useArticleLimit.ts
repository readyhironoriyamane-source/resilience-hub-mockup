import { useState, useEffect, useCallback } from 'react';

const MAX_FREE_ARTICLES = 3;
const STORAGE_KEY = 'rh_free_article_count';
const DATE_KEY = 'rh_last_visit_date';
const READ_ARTICLES_KEY = 'rh_read_articles_today';

export function useArticleLimit() {
  const [remainingCount, setRemainingCount] = useState<number>(MAX_FREE_ARTICLES);
  const [hasReadCurrentArticle, setHasReadCurrentArticle] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize state from local storage
  useEffect(() => {
    const today = new Date().toDateString();
    const lastDate = localStorage.getItem(DATE_KEY);
    
    if (lastDate !== today) {
      // New day, reset everything
      localStorage.setItem(DATE_KEY, today);
      localStorage.setItem(STORAGE_KEY, '0');
      localStorage.setItem(READ_ARTICLES_KEY, '[]');
      setRemainingCount(MAX_FREE_ARTICLES);
    } else {
      // Same day, load count
      const count = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
      setRemainingCount(Math.max(0, MAX_FREE_ARTICLES - count));
    }
    setIsInitialized(true);
  }, []);

  const consumeFreeArticle = useCallback((articleId: string): boolean => {
    if (!isInitialized) return false;

    const today = new Date().toDateString();
    const lastDate = localStorage.getItem(DATE_KEY);

    // Double check date integrity
    if (lastDate !== today) {
       localStorage.setItem(DATE_KEY, today);
       localStorage.setItem(STORAGE_KEY, '0');
       localStorage.setItem(READ_ARTICLES_KEY, '[]');
    }

    const readArticles = JSON.parse(localStorage.getItem(READ_ARTICLES_KEY) || '[]');
    
    // If already read today, allow access without decrementing
    if (readArticles.includes(articleId)) {
      setHasReadCurrentArticle(true);
      // Update remaining count for display consistency
      const currentCount = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
      setRemainingCount(Math.max(0, MAX_FREE_ARTICLES - currentCount));
      return true;
    }

    // Check current count directly from storage to avoid stale state
    const currentCount = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
    
    if (currentCount < MAX_FREE_ARTICLES) {
      const newCount = currentCount + 1;
      localStorage.setItem(STORAGE_KEY, newCount.toString());
      
      // Add to read list
      readArticles.push(articleId);
      localStorage.setItem(READ_ARTICLES_KEY, JSON.stringify(readArticles));
      
      setRemainingCount(Math.max(0, MAX_FREE_ARTICLES - newCount));
      setHasReadCurrentArticle(true);
      return true;
    }
    
    // Limit reached
    setRemainingCount(0);
    return false;
  }, [isInitialized]);

  return {
    remainingCount,
    maxCount: MAX_FREE_ARTICLES,
    consumeFreeArticle,
    hasReadCurrentArticle,
    isInitialized
  };
}
