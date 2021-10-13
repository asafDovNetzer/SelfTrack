import React from "react";
import { connect, ConnectedProps } from "react-redux";
// import { User } from "../../../Types";
// import * as firebase from "../../../Firebase";
// import icons from "url:../../bootstrap-icons/bootstrap-icons.svg";
import classes from "../ModalContent.module.css";
import { State } from "../../../Types";
import UIclasses from "../../UI/General.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
// import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Spinner from "../../Spinner/Spinner";

// const validationSchema =

const Recover = (props: Props) => {
  const [isSent, setIsSent] = React.useState<boolean | undefined>(false);
  const [email, setEmail] = React.useState<string>(``);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
    }),
    onSubmit: (values) => {
      setEmail(values.email);
      setIsSent(undefined);
      const auth = getAuth();
      sendPasswordResetEmail(auth, values.email)
        .then(() => {
          setIsSent(true);
        })
        .catch((error) => {
          const errorCode = error.code;
          //   const errorMessage = error.message;

          console.log(errorCode);
        });
    },
  });

  const backHandler = () => {
    props.onSwitch();
  };

  return (
    <div style={{ width: `500px` }} className={classes.Modal}>
      <form className={classes.Form} onSubmit={formik.handleSubmit}>
        <div className={classes.InputField}>
          <TextField
            id="email"
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
        <div className={classes.Field}>
          <button className={classes.AuthButton} type="submit">
            Send Email
          </button>
        </div>
      </form>
      {isSent ? (
        <div className={classes.Field}>
          <p>
            A password recovery email was sent to <mark>{email}</mark>
          </p>
        </div>
      ) : null}
      {isSent === undefined ? <Spinner /> : null}
      <div className={classes.Field}>
        <button
          onClick={backHandler}
          className={UIclasses.BackgroundlessButton}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  user: state.user,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  onSwitch: () => void;
};

export default connector(Recover);
