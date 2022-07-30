import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from '@reduxjs/toolkit';

export enum ToolbarColor {
  WHITE = 'WHITE',
  BRAND = 'BRAND',
}

type PageInfoStateType = {
  title: string;
  backLink?: string;
  toolbarColor?: ToolbarColor;
};

export const pageInfoSlice = createSlice<
  PageInfoStateType,
  SliceCaseReducers<PageInfoStateType>
>({
  name: 'pageInfo',
  initialState: {
    title: '',
  },
  reducers: {
    setPageInfoTitle: (state, action: PayloadAction<string>) => {
      return { ...state, title: action.payload };
    },
    setPageInfoBackLink: (state, action: PayloadAction<string>) => {
      return { ...state, backLink: action.payload };
    },
    overridePageInfoState: (
      state,
      action: PayloadAction<PageInfoStateType>
    ) => {
      return { ...action.payload };
    },
  },
});

export const { setPageInfoTitle, setPageInfoBackLink, overridePageInfoState } =
  pageInfoSlice.actions;
