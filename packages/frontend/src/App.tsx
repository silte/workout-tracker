/* eslint-disable @typescript-eslint/no-explicit-any */
import Notification from './components/notification/notification';
import { useAuthControllerGetAuthenticationStatusQuery } from './redux/generated/api';
import WorkoutTracker from './WorkoutTracker';

const App = (): JSX.Element => {
  const { data: authenticationStatus } =
    useAuthControllerGetAuthenticationStatusQuery();

  return (
    <>
      {(authenticationStatus as any)?.errors && (
        <Notification
          type="error"
          label="Something went wrong!"
          className="z-20"
        >
          {(authenticationStatus as any)?.errors?.join(' ') || ''}
        </Notification>
      )}
      <WorkoutTracker isLoggedIn={!!authenticationStatus?.authenticated} />
    </>
  );
};

export default App;
