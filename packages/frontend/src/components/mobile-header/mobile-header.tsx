import { NavLink } from 'react-router-dom';

import { useAppSelector } from '../../hooks/redux';
import { Heading } from '../heading/heading';
import { Icon, IconName } from '../icon/icon';

export const MobileHeader = (): JSX.Element => {
  const { title, backLink } = useAppSelector((state) => state.pageInfo);

  return (
    <>
      <div
        className={`bg-white-off border-b text-center fixed top-0 left-0 right-0 z-50 grid items-center h-11 ${
          backLink ? 'grid-cols-[44px,1fr,44px]' : 'grid-cols-1'
        }`}
      >
        {backLink && (
          <NavLink
            to={backLink}
            className="inline-flex items-center justify-center h-11 w-11"
            data-testid="header-back-link"
          >
            <span className="sr-only">Go back</span>
            <Icon type={IconName.chevronLeft} />
          </NavLink>
        )}
        <Heading
          variant="h1"
          className={`!text-lg !tracking-tight !font-semibold !block truncate`}
          testId="page-main-heading"
        >
          {title ?? '-'}
        </Heading>
      </div>
    </>
  );
};
