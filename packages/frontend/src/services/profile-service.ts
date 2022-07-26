import { UserDto } from '../redux/generated/api';

export interface IOverrideProfileData {
  user: UserDto;
}

export const postOverrideProfileData = async (
  uploadedUserData: IOverrideProfileData
): Promise<{ message: string; status: number }> => {
  const rawOverride = await fetch('/api/users/my-user/my-data', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(uploadedUserData),
  });

  const { payload: message } = await rawOverride.json();

  return { message, status: rawOverride.status };
};
