import React, { useEffect, useState } from "react";
import AuthModal from "../../Components/AuthModals/AuthModal";
import { State } from "../../Types";
import { connect, ConnectedProps } from "react-redux";

const AuthPage = (props: PropsFromRedux) => {
  const [slide, setSlide] = useState<number>(500);

  useEffect(() => {
    const url = window.location.pathname;

    if (url === `/signup`) setSlide(0);
    if (props.user) window.location.href = "/";
  }, [props.user]);

  return (
    <div style={{ padding: `60px`, zIndex: -3 }}>
      <AuthModal slide={slide} />
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  user: state.user,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AuthPage);
