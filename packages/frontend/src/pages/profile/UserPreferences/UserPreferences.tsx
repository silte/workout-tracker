import { IconName } from '../../../components/icon/icon';
import { LinkList } from '../../../components/link-list/link-list';
import { LinkListLink } from '../../../components/link-list/link-list.link';
import { useSetPageInfo } from '../../../hooks/useSetPageInfo';

export const UserPreferences = (): JSX.Element => {
  useSetPageInfo({
    title: 'User preferences',
    backLink: '/profile',
  });

  return (
    <LinkList>
      <LinkListLink
        link="/profile/user-preferences/items-per-page"
        icon={IconName.home}
      >
        Set max items per page
      </LinkListLink>
      <LinkListLink
        link="/profile/user-preferences/season-settings"
        icon={IconName.home}
      >
        Set month of season change
      </LinkListLink>
    </LinkList>
  );
};
