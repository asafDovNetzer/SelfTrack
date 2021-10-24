import React from "react";
// import Auxiliary from "../../../hoc/Auxiliary";
import classes from "./InputField.module.css";

const InputField = (props: Props) => {
  const [value, setValue] = React.useState<string | number>(``);
  const [touched, setTouched] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>(``);

  React.useEffect(() => {
    setValue(props.value);
  }, [props]);

  const handleChange = (event: any) => {
    setTouched(true);
    const newValue = event.target.value;
    setValue(newValue);

    let newError: string;
    props.validators.forEach((validator) => {
      newError = !!validator(newValue) ? validator(newValue) : newError;
    });

    setError(newError!);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.submitHandler(value);
  };

  let borderColor: string = `rgb(0, 153, 255)`;
  if (touched && !!error) borderColor = `red`;
  if (props.readOnly) borderColor = `lightgrey`;

  return (
    <form
      style={{ zIndex: props.readOnly ? 0 : 1 }}
      onSubmit={handleSubmit}
      className={classes.Form}
    >
      {props.type === `textarea` ? (
        <textarea
          style={{
            borderColor: borderColor,
            width: props.width ? props.width : "max-content",
          }}
          id={props.name}
          value={value}
          readOnly={props.readOnly}
          onChange={handleChange}
        />
      ) : (
        <input
          style={{
            borderColor: borderColor,
            width: props.width ? props.width : "",
          }}
          id={props.name}
          type={props.type}
          value={value}
          readOnly={props.readOnly}
          onChange={handleChange}
        />
      )}
      <div className={classes.Message}>
        <p>{error}</p>
      </div>
      <button
        style={{
          display: props.readOnly ? `none` : `unset`,
          bottom: props.type === `textarea` ? `10px` : `unset`,
          top: props.type !== `textarea` ? `10px` : `unset`,
        }}
        disabled={!!error}
        className={classes.Save}
        type="submit"
      >
        Save
      </button>
    </form>
  );
};

type Props = {
  name: string;
  width: string | undefined;
  description: string;
  type: string;
  value: string | number;
  validators: ((value: string | number) => string)[];
  readOnly: boolean;
  submitHandler: (value: string | number) => void;
};

export default InputField;
