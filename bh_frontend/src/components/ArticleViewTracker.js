import React from 'react';
import { usePageTracking } from '../hooks/usePageTracking';

const ArticleViewTracker = ({ articleId, children }) => {
  usePageTracking(`/article/${articleId}`, articleId);
  return <>{children}</>;
};

export default ArticleViewTracker;
