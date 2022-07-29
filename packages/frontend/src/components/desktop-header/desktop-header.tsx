import { NavLink } from 'react-router-dom';

import { useAppSelector } from '../../hooks/redux';
import { Heading } from '../heading/heading';
import { Icon, IconName } from '../icon/icon';

export const DesktopHeader = (): JSX.Element => {
  const { title, backLink } = useAppSelector((state) => state.pageInfo);

  return (
    <>
      <div className="flex items-center gap-2 mb-6">
        {backLink && (
          <NavLink
            to={backLink}
            className="inline-flex items-center justify-center -ml-4 h-11 w-11"
            data-testid="header-back-link"
          >
            <span className="sr-only">Go back</span>
            <Icon type={IconName.chevronLeft} className="stroke-gray-300" />
          </NavLink>
        )}
        <Heading variant="h1" testId="page-main-heading">
          {title ?? '-'}
        </Heading>
      </div>
    </>
  );
};
