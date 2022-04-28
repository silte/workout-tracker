import React from "react";

interface IProps {
  children: React.ReactNode;
  help?: string;
  id: string;
  isRequired?: boolean;
  type?: "text" | "number";
  value?: string | number;
  inputRef?:
    | React.LegacyRef<HTMLInputElement>
    | React.RefObject<HTMLInputElement>;
}

const Input = ({
  children,
  help = "",
  id,
  isRequired = false,
  type = "text",
  value = "",
  inputRef: reference,
}: IProps): JSX.Element => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-5 text-gray-700"
      >
        {children}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          ref={reference}
          id={id}
          type={type}
          className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm `}
          aria-describedby={help && `${id}-description`}
          defaultValue={value}
          required={isRequired}
        />
      </div>
      {help && (
        <p className="mt-2 text-sm text-gray-500" id={`${id}-description`}>
          {help}
        </p>
      )}
    </div>
  );
};

export default Input;
