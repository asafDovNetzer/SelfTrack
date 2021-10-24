import React from "react";
import { connect, ConnectedProps } from "react-redux";
// import { User } from "../../../Types";
// import * as firebase from "../../../Firebase";
import icons from "url:../../bootstrap-icons/bootstrap-icons.svg";
import classes from "../ModalContent.module.css";
import { LoginData } from "../../../Types";
import * as actions from "../../../Store/Actions/ActionsIndex";
import UIclasses from "../../UI/General.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
// import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
// import Auxiliary from "../../../hoc/Auxiliary";

// const validationSchema =

const Login = (props: Props) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
      password: yup
        .string()
        .min(8, "Password should be of minimum 8 characters length")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      props.onLogin({
        email: values.email,
        password: values.password,
      });
    },
  });

  const loginWithGoogle = () => {
    props.onLoginGoogle();
  };

  const resetHandler = () => {
    props.onRecover();
  };

  const switchHandler = () => {
    props.onSwitch();
  };

  return (
    <div style={{ width: `500px` }} className={classes.Modal}>
      <div className={classes.field}>
        <button className={classes.GoogleButton} onClick={loginWithGoogle}>
          <svg
            style={{ marginRight: `8px` }}
            width="20"
            height="20"
            fill="currentColor"
          >
            <use href={`${icons}#google`} />
          </svg>
          Continue with Google
        </button>
      </div>
      {/* <div className={classes.field}>
        <button className={UIclasses.Button} onClick={loginWithFacebook}>
          <svg
            style={{ marginRight: `8px` }}
            width="20"
            height="20"
            fill="currentColor"
          >
            <use href={`${icons}#facebook`} />
          </svg>
          Continue with Facebook
        </button>
      </div> */}
      <div className={classes.Field}>
        <p>OR</p>
      </div>
      <form className={classes.Form} onSubmit={formik.handleSubmit}>
        <div className={classes.InputField}>
          <TextField
            id="emailLogin"
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </div>
        <div className={classes.InputField}>
          <TextField
            id="passwordLogin"
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </div>
        <div className={classes.Field}>
          <button className={classes.AuthButton} type="submit">
            Login
          </button>
        </div>
      </form>
      <div className={classes.field}>
        <p>
          Forgot your password?
          <button
            onClick={resetHandler}
            className={UIclasses.BackgroundlessButton}
          >
            Recover it
          </button>
        </p>
      </div>
      <div className={classes.field}>
        <p>
          Don't have an account?
          <button
            onClick={switchHandler}
            className={UIclasses.BackgroundlessButton}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  onLogin: (data: LoginData) => actions.loginAsync(data),
  onLoginGoogle: () => actions.loginGoogle(),
  onLoginFacebook: () => actions.loginFacebook(),
};
const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  onSwitch: () => void;
  onRecover: () => void;
};

export default connector(Login);
