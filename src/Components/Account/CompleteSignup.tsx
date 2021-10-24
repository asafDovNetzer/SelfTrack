import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { useEffect } from "react";
import { State } from "../../Types";
import { auth } from "../../Firebase";
import Spinner from "../Spinner/Spinner";
import { applyActionCode } from "firebase/auth";

const getParameterByName = (name: string) => {
  const lengthOfParam: number = name.length;
  const search: string = window.location.search;

  for (let i = 0; i < search.length - lengthOfParam; i++) {
    const string = search.slice(i, i + lengthOfParam);
    if (string === name) {
      const startIndex: number = i + lengthOfParam + 1;

      for (let j = startIndex + 1; j < search.length; j++) {
        if (search[j] === `&`) {
          const indexOfEnd: number = j;
          const param: string = search.slice(startIndex, indexOfEnd);
          return param;
        }
      }
      break;
    }
  }
  return null;
};

const CompleteSignup = (props: PropsFromRedux) => {
  useEffect(() => {
    if (!props.user) return;

    const actionCode: string | null = getParameterByName("oobCode");

    if (!!actionCode) {
      applyActionCode(auth, actionCode)
        .then(() => {
          window.location.href = "/app";
        })
        .catch((err) => console.log(err));
    }
  }, [props.user]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: `space-around`,
        alignItems: "center",
      }}
    >
      <Spinner />
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  user: state.user,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CompleteSignup);
