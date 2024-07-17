// Button.tsx
import React from "react";

interface ButtonProps {
  nameBtn: string;
  onClickBtn: () => void;
  disabled?: boolean;
  widthClass?: string;
  heightClass?: string;
  paddingClass?: string;
  fontSizeClass?: string;
  additionalClasses?: string;
  backgroundColor?: string;
  textColor?: string;
  borderRounded?: string;
}

const Button: React.FC<ButtonProps> = ({
  nameBtn,
  onClickBtn,
  disabled = false,
  widthClass = "w-full",
  heightClass = "h-auto",
  paddingClass = "py-3",
  fontSizeClass = "text-base",
  additionalClasses = "",
  backgroundColor = "bg-yellow-400",
  textColor = "text-black",
  borderRounded = "rounded-md",
}) => {
  return (
    <button
      onClick={onClickBtn}
      disabled={disabled}
      className={`${backgroundColor} ${textColor} ${widthClass} ${heightClass} ${borderRounded}
      ${paddingClass} ${fontSizeClass} 
      ${additionalClasses} 
       flex items-center justify-center rounded-lg font-semibold`}
    >
      {nameBtn}
    </button>
  );
};

export default Button;
