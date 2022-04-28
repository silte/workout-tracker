/* eslint-disable import/prefer-default-export */
export const getProfileInformation = async (): Promise<IUser> => {
  const profile = await fetch("/api/profile");
  return profile.json();
};
