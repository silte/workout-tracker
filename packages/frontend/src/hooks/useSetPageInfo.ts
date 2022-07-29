import { useEffect } from 'react';

import {
  overridePageInfoState,
  ToolbarColor,
} from '../redux/reducers/pageInfoSlice';

import { useAppDispatch } from './redux';

type UsePageInfoArgs = {
  title: string;
  backLink?: string;
  toolbarColor?: ToolbarColor;
};

export const useSetPageInfo = ({
  title,
  backLink,
  toolbarColor,
}: UsePageInfoArgs) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(overridePageInfoState({ title, backLink, toolbarColor }));
  }, [dispatch, backLink, title, toolbarColor]);
};
