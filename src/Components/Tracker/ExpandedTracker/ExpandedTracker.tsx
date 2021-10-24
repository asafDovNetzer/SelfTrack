import React from "react";
import classes from "./ExpandedTracker.module.css";
import icons from "url:../../bootstrap-icons/bootstrap-icons.svg";
import InputField from "../../FormElements/InputField/InputField";
// import { CirclePicker } from "react-color";
import Box from "../../UI/Box/Box";
import * as actions from "../../../Store/Actions/ActionsIndex";
import { connect, ConnectedProps } from "react-redux";
import { DbRef } from "../../../Types";
import DbContext from "../../../Context/DbContext";
import {
  collection,
  onSnapshot,
  QuerySnapshot,
  query,
  where,
} from "firebase/firestore";
import { Tracker, State } from "../../../Types";
import ColorPicker from "../../FormElements/ColorPicker/ColorPicker";
import MessageModal from "../../UI/MessageModal/MessageModal";
// const initialBoxs = {
//   description: true,
// };

const ExpandedTracker = (props: Props) => {
  // const [boxs, setBoxs] = React.useState<any>(initialBoxs);
  const [fieldInEdit, setFieldInEdit] = React.useState<string>(``);
  const [name, setName] = React.useState<string>(``);
  const [type, setType] = React.useState<string>(``);
  const [description, setDescription] = React.useState<string>(``);
  const [color, setColor] = React.useState<string>(``);
  const [stepSize, setStepSize] = React.useState<number>(1);
  const [displayMessage, setDisplayMessage] = React.useState<boolean>(false);

  const userDb = React.useContext(DbContext);

  React.useEffect(() => {
    if (!userDb) return;

    const trackersRef = collection(userDb!, "trackers");

    const q = query(trackersRef, where("id", "==", props.id));

    const unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot) => {
      snapshot.forEach((doc: any) => {
        // console.log(`once`);
        const tracker: Tracker = doc.data();

        setName(tracker.name);
        setType(tracker.type);
        setDescription(tracker.description);
        setColor(tracker.color);
        setStepSize(tracker.size);
      });
    });

    if (!props.user) unsubscribe();

    return unsubscribe;
  }, [props, userDb]);

  const handleCloseBox = (name: string) => {
    // setBoxs({
    //   ...boxs,
    //   [name]: !boxs[name],
    // });
  };

  const editField = (field: string) => {
    setFieldInEdit(field);
  };

  const handleChangeColor = (color: any) => {
    console.log(color.hex);
    submitChange(`color`, color.hex);
  };

  const submitChange = (field: string, value: string | number) => {
    props.updateField(userDb!, props.id, field, value);
  };

  const cancelEdit = () => {
    setFieldInEdit(``);
  };

  const handleDelete = () => {
    setDisplayMessage(true);
  };

  const deleteTracker = () => {
    props.deleteTracker(userDb!, props.id);
    props.deleteEntries(userDb!, props.id);
    props.onClose();
  };

  return (
    <div className={classes.Container}>
      <div className={classes.Modal} style={{ borderColor: color }}>
        <div className={classes.Field}>
          <Box
            label="Name"
            name="name"
            closable={false}
            display={true}
            onClose={handleCloseBox}
          >
            <div className={classes.Header}>
              <InputField
                name="Name"
                value={name}
                width={undefined}
                description="the name and stuff"
                type="text"
                readOnly={fieldInEdit !== `name`}
                submitHandler={(value: string | number) => {
                  submitChange(`name`, value);
                  setFieldInEdit(``);
                }}
                validators={[
                  (value: string | number) => {
                    return value.toString().length < 1
                      ? `Must have a name`
                      : ``;
                  },
                  (value: string | number) => {
                    return value.toString().length > 19
                      ? `Name cannot be longer than 20 characters`
                      : ``;
                  },
                ]}
              />
              <p className={classes.HeaderType}>{type}</p>
              <button className={classes.Pen} onClick={() => editField(`name`)}>
                <svg width="16" height="16" fill="currentColor">
                  <use href={`${icons}#pen`} />
                </svg>
              </button>
            </div>
          </Box>
          <Box
            label="Description"
            name="description"
            closable={false}
            display={true}
            onClose={handleCloseBox}
          >
            <div className={classes.Description}>
              <InputField
                name="Description"
                value={description}
                width={undefined}
                description="the name and stuff"
                type="textarea"
                readOnly={fieldInEdit !== `description`}
                submitHandler={(value: string | number) => {
                  submitChange(`description`, value);
                  setFieldInEdit(``);
                }}
                validators={[
                  (value: string | number) => {
                    return value.toString().length > 200
                      ? `Description cannot be longer than 200 characters`
                      : ``;
                  },
                ]}
              />
              <button
                className={classes.Pen}
                onClick={() => editField(`description`)}
              >
                <svg width="16" height="16" fill="currentColor">
                  <use href={`${icons}#pen`} />
                </svg>
              </button>
            </div>
          </Box>
          {type === `counter` ? (
            <Box
              label="Step Size"
              name="stepSize"
              closable={false}
              display={true}
              onClose={handleCloseBox}
            >
              <div className={classes.StepSize}>
                <InputField
                  name="Step Size"
                  value={stepSize}
                  width="40px"
                  description="the name and stuff"
                  type="number"
                  readOnly={fieldInEdit !== `stepSize`}
                  submitHandler={(value: string | number) => {
                    submitChange(`size`, value);
                    setFieldInEdit(``);
                  }}
                  validators={[
                    (value: string | number) => {
                      return value < 1 ? `Step size has to be at least 1` : ``;
                    },
                  ]}
                />
                <button
                  className={classes.Pen}
                  onClick={() => editField(`stepSize`)}
                >
                  <svg width="16" height="16" fill="currentColor">
                    <use href={`${icons}#pen`} />
                  </svg>
                </button>
              </div>
            </Box>
          ) : null}
        </div>
        <Box
          label="Color"
          name="actions"
          closable={false}
          display={true}
          onClose={handleCloseBox}
        >
          <div className={classes.Color}>
            {/* <CirclePicker onChangeComplete={handleChangeColor} color={color} /> */}
            <ColorPicker color={color} onChange={handleChangeColor} />
          </div>
        </Box>
        <Box
          label=""
          name="actions"
          closable={false}
          display={true}
          onClose={handleCloseBox}
        >
          <div className={classes.ButtonPanel}>
            {/* <button className={classes.EditButton}>Delete Entries</button> */}
            <button onClick={handleDelete} className={classes.DeleteButton}>
              Delete Tracker
            </button>
          </div>
        </Box>
        <div
          style={{ display: fieldInEdit === `` ? `none` : `unset` }}
          onClick={cancelEdit}
          className={classes.Backdrop}
        ></div>
        {displayMessage ? (
          <MessageModal
            main="Are you Sure?"
            sub="This action cannot be reversed..."
            onYes={deleteTracker}
            onNo={() => setDisplayMessage(false)}
          />
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state: State) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  deleteTracker: (userDb: DbRef, id: string) =>
    actions.deleteTracker(userDb, id),
  deleteEntries: (userDb: DbRef, id: string) =>
    actions.deleteEntries(userDb, id),
  updateField: (
    userDb: DbRef,
    id: string,
    field: string,
    value: string | number
  ) => actions.updateField(userDb, id, field, value),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  id: string;
  onClose: () => void;
};

export default connector(ExpandedTracker);
