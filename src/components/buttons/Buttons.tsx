import React from 'react';
import styles from "./Buttons.module.scss"

interface ButtonsProps {
  text: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

const Buttons: React.FC<ButtonsProps> = ({
  text,
  onClick,
  className,
  disabled,
  children,
}) => {

  return (
    
    <button
      className={disabled === true ? styles.buttons + ' ' + styles.buttonDisabled : styles.buttons} 
      onClick={onClick}
      disabled={disabled}
    >
      {text} {children}
    </button>
    
  );
};

export default Buttons;