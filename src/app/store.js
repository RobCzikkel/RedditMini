import { configureStore } from '@reduxjs/toolkit';
import redditSlice from '../features/redditHome/redditSlice';
import commentSlice from '../features/comments/commentSlice';
import subredditSlice from '../features/subreddits/subredditSlice';
import searchSlice from '../features/search/searchSlice';

export const store = configureStore({
  reducer: {
    reddit: redditSlice,
    comments: commentSlice,
    subreddit: subredditSlice,
    search: searchSlice
  },
});