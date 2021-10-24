import React from "react";
import classes from "./Box.module.css";
// import Divider from "../../UI/Divider";

const Box: React.FC<{
  display: boolean;
  name: string;
  label: string;
  closable: boolean;
  onClose: (name: string) => void;
}> = (props) => {
  if (!props.display) return null;

  const handleClose = () => {
    props.onClose(props.name);
  };

  return (
    <div className={classes.Box}>
      <button
        style={{ display: props.closable ? `unset` : `none` }}
        onClick={handleClose}
        className={classes.Button}
      >
        x
      </button>
      <h5 className={classes.Label}>{props.label}</h5>
      <main>{props.children}</main>
    </div>
  );
};

export default Box;
