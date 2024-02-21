import * as React from "react";
import { Input, InputProps } from "./input";

interface PasswordInputProps extends InputProps {
  showVisibilityToggle?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  showVisibilityToggle = true,
  className,
  ...props
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        className={className}
        {...props}
      />
      {showVisibilityToggle && (
        <span className="absolute top-0 end-0 h-full flex items-center">
          <button
            type="button"
            className="p-2 rounded"
            onClick={handleTogglePasswordVisibility}
          >
            {showPassword ? (
              <svg
                className="flex-shrink-0 size-3.5 text-gray-400"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path
                  className="hs-password-active:hidden"
                  d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
                />
                <path
                  className="hs-password-active:hidden"
                  d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                />
                <path
                  className="hs-password-active:hidden"
                  d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                />
                <line
                  className="hs-password-active:hidden"
                  x1="2"
                  x2="22"
                  y1="2"
                  y2="22"
                />
                <path
                  className="hidden hs-password-active:block"
                  d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                />
                <circle
                  className="hidden hs-password-active:block"
                  cx="12"
                  cy="12"
                  r="3"
                />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.99967 3.3335C5.83301 3.3335 2.27467 5.92516 0.833008 9.5835C2.27467 13.2418 5.83301 15.8335 9.99967 15.8335C14.1663 15.8335 17.7247 13.2418 19.1663 9.5835C17.7247 5.92516 14.1663 3.3335 9.99967 3.3335ZM9.99967 13.7502C7.69967 13.7502 5.83301 11.8835 5.83301 9.5835C5.83301 7.2835 7.69967 5.41683 9.99967 5.41683C12.2997 5.41683 14.1663 7.2835 14.1663 9.5835C14.1663 11.8835 12.2997 13.7502 9.99967 13.7502ZM9.99967 7.0835C8.61634 7.0835 7.49967 8.20016 7.49967 9.5835C7.49967 10.9668 8.61634 12.0835 9.99967 12.0835C11.383 12.0835 12.4997 10.9668 12.4997 9.5835C12.4997 8.20016 11.383 7.0835 9.99967 7.0835Z"
                  fill="#7E8B99"
                />
              </svg>
            )}
          </button>
        </span>
      )}
    </div>
  );
};

export default PasswordInput;
