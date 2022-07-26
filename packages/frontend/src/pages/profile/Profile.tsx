import DescriptionList from '../../components/description-list/description-list';
import DescriptionListItem from '../../components/description-list/description-list.item';
import Hero from '../../components/hero/hero';
import SEO from '../../components/seo/seo';
import { UserDto } from '../../redux/generated/api';

interface IProfileProps {
  profileInfo: UserDto | null;
}

const Profile = ({ profileInfo }: IProfileProps): JSX.Element => {
  return (
    <>
      <SEO title="Profile information | Profile" />
      <Hero label="Profile information" standAlone className="mb-12">
        Below you are able to see basic information about your profile.
      </Hero>
      <DescriptionList label="Profile information">
        <DescriptionListItem label="Name">
          {profileInfo?.name || '-'}
        </DescriptionListItem>
        <DescriptionListItem label="Roles">
          {profileInfo?.roles?.join(', ') || '-'}
        </DescriptionListItem>
      </DescriptionList>
    </>
  );
};

export default Profile;
