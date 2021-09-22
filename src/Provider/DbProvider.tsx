import { useEffect, useState } from "react";
import DbContext from "../Context/DbContext";
import { auth, db } from "../Firebase";
import * as types from "../Types";
import { connect, ConnectedProps } from "react-redux";
import * as actions from "../Store/Actions/ActionsIndex";

const DbProvider = (props: Props) => {
  const [userDb, setUserDb] = useState<types.DbRef>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // console.log(`detecting change`, user);
      if (!user) {
        props.noActiveUser();
      } else {
        const userDb = db.collection(`users`).doc(user!.uid);
        setUserDb(userDb);
        props.activeUser();
      }
    });

    return unsubscribe;
  }, [props]);

  return (
    <DbContext.Provider value={userDb}>{props.children}</DbContext.Provider>
  );
};

const mapDispatchToProps = {
  activeUser: () => actions.loginSuccess(),
  noActiveUser: () => actions.logout(),
};
const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  children: any;
};

export default connector(DbProvider);
