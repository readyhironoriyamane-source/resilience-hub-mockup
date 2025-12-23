import { useState, useEffect } from 'react';

const MAX_FREE_ARTICLES = 3;
const STORAGE_KEY = 'rh_free_article_count';
const DATE_KEY = 'rh_last_visit_date';

export function useArticleLimit() {
  const [remainingCount, setRemainingCount] = useState<number>(MAX_FREE_ARTICLES);
  const [hasReadCurrentArticle, setHasReadCurrentArticle] = useState(false);

  useEffect(() => {
    // Check date and reset if needed
    const today = new Date().toDateString();
    const lastDate = localStorage.getItem(DATE_KEY);
    
    if (lastDate !== today) {
      // New day, reset count
      localStorage.setItem(DATE_KEY, today);
      localStorage.setItem(STORAGE_KEY, '0');
      setRemainingCount(MAX_FREE_ARTICLES);
    } else {
      // Same day, load count
      const count = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
      setRemainingCount(Math.max(0, MAX_FREE_ARTICLES - count));
    }
  }, []);

  const consumeFreeArticle = (articleId: string) => {
    // If already read this article in session or previously tracked (simplified for mock), don't decrement
    // For this mock, we'll just decrement if not 0
    
    // Check if we already counted this article view in this session to prevent double counting on refresh
    // In a real app, we might store a list of read article IDs for the day
    const readArticlesKey = 'rh_read_articles_today';
    const readArticles = JSON.parse(localStorage.getItem(readArticlesKey) || '[]');
    
    if (readArticles.includes(articleId)) {
      setHasReadCurrentArticle(true);
      return true; // Already unlocked
    }

    if (remainingCount > 0) {
      const currentCount = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
      const newCount = currentCount + 1;
      localStorage.setItem(STORAGE_KEY, newCount.toString());
      
      // Add to read list
      readArticles.push(articleId);
      localStorage.setItem(readArticlesKey, JSON.stringify(readArticles));
      
      setRemainingCount(MAX_FREE_ARTICLES - newCount);
      setHasReadCurrentArticle(true);
      return true;
    }
    
    return false;
  };

  return {
    remainingCount,
    maxCount: MAX_FREE_ARTICLES,
    consumeFreeArticle,
    hasReadCurrentArticle
  };
}
