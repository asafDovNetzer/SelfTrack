import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { User } from "../../../Types";
import * as firebase from "../../../Firebase";
import UIclasses from "../../UI/General.module.css";
import classes from "../ModalContent.module.css";
import { LoginData } from "../../../Types";
import * as actions from "../../../Store/Actions/ActionsIndex";
// import { Formik, Form, Field } from "formik";
import { useFormik } from "formik";
import * as yup from "yup";
import TextField from "@material-ui/core/TextField";
import { sendEmailVerification, updateProfile } from "firebase/auth";

// const validationSchema =

const SignUp = (props: Props) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .max(20, "Name is too long")
        .required("Must have a name"),
      email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
      password: yup
        .string()
        .min(8, "Password should be of minimum 8 characters length")
        .required("Password is required"),
      passwordConfirmation: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Confirmation password is required"),
    }),
    onSubmit: (values) => {
      //   console.log(values);
      const userName: string =
        values.name.slice(0, 1).toUpperCase() +
        values.name.slice(1).toLowerCase();

      //   console.log(userName);
      props.setUserName(userName);

      firebase.auth
        .createUserWithEmailAndPassword(values.email, values.password)
        .then((userCredential) => {
          const user: User = userCredential.user;
          sendEmailVerification(user!).then(() => {
            console.log(`sent`);
          });
          updateProfile(user!, {
            displayName: userName,
          }).then(() => {
            console.log(userName);
          });
          console.log(user, `signup`);
        })
        .catch((error) => {
          if (error.code === `auth/invalid-email`) {
          }
          console.log(error.code);
        });
    },
  });

  const switchHandler = () => {
    props.onSwitch();
  };

  return (
    <div style={{ width: `500px` }} className={classes.Modal}>
      <form className={classes.Form} onSubmit={formik.handleSubmit}>
        <div className={classes.Field}>
          <TextField
            inputProps={{
              autoComplete: "new-password",
              form: {
                autoComplete: "off",
              },
            }}
            variant="outlined"
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </div>
        <div className={classes.Field}>
          <TextField
            inputProps={{
              autoComplete: "new-password",
              form: {
                autoComplete: "off",
              },
            }}
            variant="outlined"
            id="email-signup"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </div>
        <div className={classes.Field}>
          <TextField
            inputProps={{
              autoComplete: "new-password",
              form: {
                autoComplete: "off",
              },
            }}
            variant="outlined"
            id="password-signup"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </div>
        <div className={classes.Field}>
          <TextField
            id="passwordConfirmation"
            name="passwordConfirmation"
            label="Password Confirmation"
            type="password"
            variant="outlined"
            value={formik.values.passwordConfirmation}
            onChange={formik.handleChange}
            error={
              formik.touched.passwordConfirmation &&
              Boolean(formik.errors.passwordConfirmation)
            }
            helperText={
              formik.touched.passwordConfirmation &&
              formik.errors.passwordConfirmation
            }
          />
        </div>
        <div className={classes.Field}>
          <button className={classes.AuthButton} type="submit">
            Sign Up
          </button>
        </div>
      </form>
      <div className={classes.field}>
        <p>
          Already signed up?
          <button
            onClick={switchHandler}
            className={UIclasses.BackgroundlessButton}
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  onSignup: (data: LoginData) => actions.signupAsync(data),
  onSignUpGoogle: () => actions.loginGoogle(),
  setUserName: (userName: string) => actions.setUserName(userName),
};
const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  onSwitch: () => void;
};

export default connector(SignUp);
