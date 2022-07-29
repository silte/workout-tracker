/* eslint-disable consistent-return */
import { ChangeEvent, useEffect, useState } from 'react';

import { Button } from '../../components/button/button';
import { DescriptionList } from '../../components/description-list/description-list';
import { DescriptionListItem } from '../../components/description-list/description-list.item';
import {
  Notification,
  INotificationProps,
} from '../../components/notification/notification';
import { useSetPageInfo } from '../../hooks/useSetPageInfo';
import {
  UserDataImportDto,
  useUsersControllerOverrideAllOwnUserDataMutation,
} from '../../redux/generated/api';

export const ProfileOverrideData = (): JSX.Element => {
  useSetPageInfo({
    title: 'Override data (DANGER ZONE)',
    backLink: '/profile',
  });

  const [overrideProfileData] =
    useUsersControllerOverrideAllOwnUserDataMutation();

  const [uploadedUserData, setUploadedUserData] =
    useState<UserDataImportDto | null>(null);
  const [overrideTranactionCount, setOverrideTranactionCount] = useState<
    number | null
  >(null);
  const [overrideAccountCount, setOverrideAccountCount] = useState<
    number | null
  >(null);
  const [overrideFilename, setOverrideFilename] = useState<string | null>(null);
  const [notification, setNotification] = useState<INotificationProps | null>(
    null
  );

  useEffect(() => {
    if (!uploadedUserData) {
      setOverrideTranactionCount(null);
      setOverrideAccountCount(null);
      return;
    }

    setOverrideTranactionCount(uploadedUserData.workoutSummaries.length);
    setOverrideAccountCount(uploadedUserData.userPreferences.length);
  }, [uploadedUserData]);

  const handleResetNotification = () => {
    setNotification({
      type: 'success',
      label: '',
      children: '',
    });
  };

  const handleOverrideData = async () => {
    if (!uploadedUserData) {
      setNotification({
        type: 'error',
        label: 'Upload failed',
        children: 'Cannot update uploaded user data.',
      });
      return;
    }

    const response = await overrideProfileData({
      userDataImportDto: uploadedUserData,
    });

    if ('error' in response) {
      setNotification({
        type: 'error',
        label: 'Overridde failed',
        children: response.error as string,
      });
      return;
    }

    setNotification({
      type: 'success',
      label: 'Successfully overridden',
      children: response.data.payload ?? '',
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileChange = (changeEvent: ChangeEvent<HTMLInputElement>) => {
    const { files } = changeEvent.target;
    const targetFile = files?.item(0);
    if (!targetFile) {
      setOverrideFilename(null);
      setUploadedUserData(null);
      setNotification({
        type: 'error',
        label: 'Upload failed',
        children: 'File not found',
      });
      return;
    }

    const fr = new FileReader();
    fr.onload = (readerEvent) => {
      if (
        readerEvent?.target?.result &&
        typeof readerEvent?.target?.result === 'string'
      ) {
        const result = JSON.parse(readerEvent.target.result);
        setUploadedUserData(result);
        setOverrideFilename(targetFile.name);
      } else {
        setNotification({
          type: 'error',
          label: 'Upload failed',
          children: 'Failed to parse JSON file',
        });
      }
    };
    fr.readAsText(targetFile);
  };

  return (
    <>
      {notification && (
        <Notification
          type={notification.type}
          label={notification.label}
          resetNotification={handleResetNotification}
        >
          {notification.children}
        </Notification>
      )}
      <div>
        <label
          htmlFor="selectFiles"
          className="inline-flex items-center justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-blue-600 border border-transparent rounded-md sm:w-auto focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-blue-500 active:bg-blue-700 focus:ring-blue-500"
        >
          Choose file
          <input
            className="hidden"
            type="file"
            id="selectFiles"
            onChange={handleFileChange}
            accept="application/json"
          />
        </label>
        <span className="ml-2">{overrideFilename || 'No file selected'}</span>
      </div>
      <DescriptionList label="Override data details" className="mt-6">
        <DescriptionListItem label="Account count">
          {overrideAccountCount ? `${overrideAccountCount}` : '-'}
        </DescriptionListItem>
        <DescriptionListItem label="Transaction count">
          {overrideTranactionCount ? `${overrideTranactionCount}` : '-'}
        </DescriptionListItem>
      </DescriptionList>

      <Button onClick={handleOverrideData} accentColor="red" className="mt-6">
        Override my data
      </Button>
    </>
  );
};
