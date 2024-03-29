import { ReactNode } from 'react';

interface IModalConfirmHeaderProps {
  label: string;
  children?: ReactNode;
}

export const ModalConfirmHeader = ({
  label,
  children,
}: IModalConfirmHeaderProps): JSX.Element => {
  return (
    <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
      <div className="sm:flex sm:items-start">
        <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
          <svg
            className="w-6 h-6 text-red-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3
            className="text-lg font-medium leading-6 text-gray-900"
            id="modal-headline"
          >
            {label}
          </h3>
          {children && (
            <div className="mt-2">
              <p className="text-sm leading-5 text-gray-500">{children}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
