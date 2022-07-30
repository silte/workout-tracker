import { IconName } from '../icon/icon';

import { MobileNavigationItem } from './mobile-navigation.item';

export const MobileNavigation = (): JSX.Element => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 w-full bg-white border-t pb-safe">
      <nav aria-label="Main navigation in mobile viewmode.">
        <ul className={`grid grid-cols-3 relative`}>
          <MobileNavigationItem
            label="Home"
            iconName={IconName.home}
            link="/"
            isExact
            type="standalone"
          />
          <MobileNavigationItem
            label="Summary"
            iconName={IconName.chartBar}
            link="/workout/summary"
            disallowedPathEndings={['add']}
            type="standalone"
          />
          <MobileNavigationItem
            label="Profile"
            iconName={IconName.userCircle}
            link="/profile"
            type="standalone"
          />
        </ul>
      </nav>
    </div>
  );
};
