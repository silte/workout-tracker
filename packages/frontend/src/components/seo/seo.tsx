import React from 'react';
import { Helmet } from 'react-helmet';

import { useAppSelector } from '../../hooks/redux';
import { ToolbarColor } from '../../redux/reducers/pageInfoSlice';

export const SEO = (): JSX.Element => {
  const {
    title,
    backLink,
    toolbarColor = ToolbarColor.WHITE,
  } = useAppSelector((state) => state.pageInfo);

  const toolbarColorMapping: { [key in ToolbarColor]: string } = {
    [ToolbarColor.WHITE]: '#FAFAFA',
    [ToolbarColor.BRAND]: '#0E6AC7',
  };

  return (
    <Helmet>
      <title>{title} | Workout tracker</title>
      <meta name="theme-color" content={toolbarColorMapping[toolbarColor]} />
      {backLink && <meta name="back-link" content={backLink} />}
    </Helmet>
  );
};
