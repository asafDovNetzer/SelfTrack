import { useEffect, useState } from "react";
import DbContext from "../Context/DbContext";
import { auth, db } from "../Firebase";
import { DbRef, User } from "../Types";
import { connect, ConnectedProps } from "react-redux";
import * as actions from "../Store/Actions/ActionsIndex";

const DbProvider = (props: Props) => {
  const [userDb, setUserDb] = useState<DbRef>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // console.log(`detecting change`, user);
      if (!user) {
        props.noActiveUser();
      } else {
        console.log(user);

        const userDb = db.collection(`users`).doc(user!.uid);
        setUserDb(userDb);
        props.activeUser(user);
      }
    });

    return unsubscribe;
  }, [props]);

  return (
    <DbContext.Provider value={userDb}>{props.children}</DbContext.Provider>
  );
};

const mapDispatchToProps = {
  activeUser: (user: User) => actions.loginSuccess(user),
  noActiveUser: () => actions.logout(),
};
const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  children: any;
};

export default connector(DbProvider);
