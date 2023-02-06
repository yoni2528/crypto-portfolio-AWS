import clsx from "clsx";
import React from "react";
import styles from "./Button.module.css";

const Button: React.FC<{
  type: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  btnText?: string;
  active?: boolean;
}> = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={clsx(
        styles.btn,
        styles[props.type],
        props.active && styles[`${props.type}-active`]
      )}
    >
      {props.btnText}
    </button>
  );
};

export default Button;
