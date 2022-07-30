import { Button } from '../../components/button/button';

interface IProps {
  submitButtonLabel: string;
  loginUrl: string;
}

const LoginActions = ({ submitButtonLabel, loginUrl }: IProps): JSX.Element => {
  return (
    <div className="flex justify-end px-4 py-3 bg-gray-50 sm:px-6">
      <Button link={loginUrl}>{submitButtonLabel}</Button>
    </div>
  );
};

export default LoginActions;
