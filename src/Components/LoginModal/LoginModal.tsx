import React, { useRef, useContext } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Form, Button, Modal } from "react-bootstrap";
import classes from "./Login.module.css";
import { LoginData } from "../../Types";
import * as actions from "../../Store/Actions/ActionsIndex";
// import DbContext from "../../Context/DbContext";

const Login = (props: Props) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // const userDb = useContext(DbContext);

  // console.log(props.show);
  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const loginData = {
      email: emailRef.current!.value,
      password: passwordRef.current!.value,
    };

    props.onLogin(loginData);
  };

  // if (!!userDb) return null;

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Body>
        <Form className={classes.Form} onSubmit={submitHandler}>
          <Form.Group controlId="formBasicEmail" className={classes.Control}>
            <Form.Control
              placeholder="Your Email address"
              type="text"
              ref={emailRef}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword" className={classes.Control}>
            <Form.Control
              placeholder="Password"
              type="password"
              ref={passwordRef}
            />
          </Form.Group>
          <Button variant="success" type="submit">
            Login
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const mapDispatchToProps = {
  onLogin: (data: LoginData) => actions.loginAsync(data),
};
const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  show: boolean;
  handleClose: () => void;
};

export default connector(Login);
