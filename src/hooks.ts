import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from './store/store';

// Use these typed hooks instead of plain useDispatch / useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(selector: (state: RootState) => T): T =>
  useSelector(selector);
