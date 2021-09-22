import React from "react";
// import firebase from "firebase/app";
import * as types from "../Types";

const DbContext = React.createContext<types.DbRef | null>(null);

export default DbContext;
