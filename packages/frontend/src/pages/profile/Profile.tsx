import { Role } from '@local/types';

import { IconName } from '../../components/icon/icon';
import { LinkList } from '../../components/link-list/link-list';
import { LinkListLink } from '../../components/link-list/link-list.link';
import { useSetPageInfo } from '../../hooks/useSetPageInfo';
import { useUsersControllerFindOwnUserQuery } from '../../redux/generated/api';

export const Profile = (): JSX.Element => {
  useSetPageInfo({ title: 'Profile' });

  const { data: profileInfo } = useUsersControllerFindOwnUserQuery();

  return (
    <LinkList>
      <LinkListLink link="/profile/user-preferences" icon={IconName.cog}>
        User preferences
      </LinkListLink>
      <LinkListLink link="/profile/suunto" icon={IconName.switchHorizontal}>
        Suunto connection
      </LinkListLink>
      <LinkListLink
        link="/api/users/my-user/my-data"
        icon={IconName.cloudDownload}
      >
        Download your data
      </LinkListLink>
      {profileInfo?.roles.includes(Role.testUser) && (
        <LinkListLink link="/profile/override-data" icon={IconName.exclamation}>
          Override data
        </LinkListLink>
      )}
      <LinkListLink
        link="/auth/logout"
        icon={IconName.logout}
        className="lg:hidden"
      >
        Sign out
      </LinkListLink>
    </LinkList>
  );
};
