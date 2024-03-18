import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../reducer/themeToggle';
import tokenReducer from '../reducer/tokenReducer';
import fetchPostData from '../reducer/fetchPostData';

export const store = configureStore({ reducer:{theme:themeReducer,authToken:tokenReducer,fetchPost:fetchPostData}  });
