import { IconName } from '../icon/icon';

import { DesktopNavigationItem } from './desktop-navigation.item';

export const DesktopNavigation = (): JSX.Element => {
  return (
    <div className="grid grid-cols-1">
      <nav aria-label="Main navigation in desktop viewmode.">
        <ul className="-mr-4">
          <DesktopNavigationItem
            label="Home"
            iconName={IconName.home}
            link="/"
            isExact
          />
          <DesktopNavigationItem
            label="Summary"
            iconName={IconName.chartBar}
            link="/workout/summary"
            disallowedPathEndings={['add']}
          />
          <DesktopNavigationItem
            label="Profile"
            iconName={IconName.userCircle}
            link="/profile"
          />
        </ul>
      </nav>
      <nav
        className="pt-8 mt-8 border-t"
        aria-label="User action links navigation in desktop viewmode."
      >
        <ul className="-mr-4">
          <DesktopNavigationItem
            label="Sign out"
            iconName={IconName.logout}
            link="/auth/logout"
          />
        </ul>
      </nav>
    </div>
  );
};
