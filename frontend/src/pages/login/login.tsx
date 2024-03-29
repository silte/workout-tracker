import React from "react";
import LoginHeader from "./login.header";
import LoginActions from "./login.actions";
import LoginFooter from "./login.footer";
import SEO from "../../components/seo/seo";

const {
  REACT_APP_IS_GITHUB_OAUTH_ENABLED,
  REACT_APP_IS_AUTH0_OAUTH_ENABLED,
} = process.env;

const checkIsEnabled = (stringBoolean: string | undefined) =>
  stringBoolean && stringBoolean.toLocaleLowerCase() !== "false";

const Login = (): JSX.Element => {
  return (
    <>
      <SEO title="Login" />
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75" />
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" />
          &#8203;
          <div
            className="inline-block align-bottom overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="bg-white rounded-lg text-left shadow-xl overflow-hidden">
              <LoginHeader label="Workout tracker">
                Please login to manage your profile.
              </LoginHeader>
              {checkIsEnabled(REACT_APP_IS_GITHUB_OAUTH_ENABLED) && (
                <LoginActions
                  submitButtonLabel="Login with Github"
                  loginUrl="/auth/github"
                />
              )}
              {checkIsEnabled(REACT_APP_IS_AUTH0_OAUTH_ENABLED) && (
                <LoginActions
                  submitButtonLabel="Login with Auth0"
                  loginUrl="/auth/auth0"
                />
              )}
            </div>
            <LoginFooter className="mt-2 overflow-hidden rounded-lg" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
