const isUpdateAllowed = (location: string): boolean => {
  const isBadPage = location.includes('/bad-update-path');

  return !isBadPage;
};

export default isUpdateAllowed;
