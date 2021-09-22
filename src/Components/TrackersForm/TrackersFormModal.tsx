import React, { useState, useContext, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Pagination from "@material-ui/lab/Pagination";
import { Tracker } from "../../Types";
import Divider from "@material-ui/core/Divider";
import classes from "./StopwatchForm/TrackerForm.module.css";
import { SliderPicker } from "react-color";
import { Formik, Form, Field } from "formik";
import Select from "@material-ui/core/Select";
import DbContext from "../../Context/DbContext";
import {
  createNewTracker,
  updateTracker,
} from "../../HalperFunctions/CreateTrackers";
import FakeTracker from "./FakeTracker/FakeTracker";
import { MenuItem, TextField } from "@material-ui/core";

const TrackersFormModal: React.FC<{
  show: boolean;
  selected: Tracker | null;
  closeHandler: () => void;
  type: string;
}> = React.memo(({ show, selected, closeHandler, type }) => {
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(1);
  const [color, setColor] = useState<string>(`#000000`);
  const [errors, setErrors] = useState<any>({});
  const [name, setName] = useState<string>(`Give me a cool name`);
  const [description, setDescription] = useState<string>(``);
  const [size, setSize] = useState<string>(`1`);

  const userDb = useContext(DbContext);

  useEffect(() => {
    if (selected) {
      setName(selected.name);
      setColor(selected.color);
      setDescription(selected.description);
      setSize(selected.size ? selected.size.toString() : `1`);
    }
  }, [selected]);

  useEffect(() => {
    if (type !== `counter`) {
      setPages(1);
      // setSize(`1`);
    } else {
      setPages(2);
    }
  }, [type]);

  const changePage = (event: any, page: number) => {
    setPage(page);
  };

  const closeForm = () => {
    setColor(`#000000`);
    setName(`Give me a cool name`);
    setSize(`1`);
    setDescription(``);
    setErrors({});
    setPage(1);
    closeHandler();
  };

  const saveForm = () => {
    // console.log(values);

    if (!selected) {
      createNewTracker(userDb, type, name, description, color, size);
    }

    if (selected) {
      updateTracker(userDb, selected.id, name, description, color, size);
    }

    closeForm();
  };

  const handleChangeComplete = (color: any) => {
    setColor(color.hex);
  };

  const changeSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(event.target.value);
  };

  const initialValues: any = {
    name: selected ? selected.name : ``,
    description: selected ? selected.description : ``,
  };

  const formElement: JSX.Element = (
    <Formik
      initialValues={initialValues}
      onSubmit={() => {
        saveForm();
      }}
      validate={(values) => {
        const errors: any = {};

        if (!values.name) {
          errors.name = `Required`;
          setName(`Give me a cool name`);
        } else if (values.name.length > 15) {
          errors.name = "Must be 15 characters or less";
        } else if (values.name.length < 4) {
          errors.name = "Must be 4 characters or more";
        }
        setErrors(errors);
        setName(values.name);
        setDescription(values.description);
      }}
    >
      {() => (
        <Form className={classes.Form}>
          <div style={{ display: page === 1 ? `unset` : `none` }}>
            <div className={classes.Field}>
              <label>Name:</label>
              <Field
                type="text"
                name="name"
                placeholder="e.g Watching T.V..."
              />
            </div>
            <p style={{ color: `red` }}>{errors.name}</p>
            <Divider variant="middle" />
            <div className={classes.Field}>
              <label>Description:</label>
              <Field
                type="text"
                as="textarea"
                name="description"
                placeholder="e.g The amount of time i spend on watching T.V..."
              />
            </div>
            <Divider variant="middle" />
            <SliderPicker
              onChangeComplete={handleChangeComplete}
              color={color}
            />
          </div>
          <div style={{ display: page === 2 ? `unset` : `none` }}>
            <div className={classes.Field}>
              <label>Choose a step size:</label>
              <TextField
                value={size}
                onChange={changeSize}
                id="standard-number"
                type="number"
                // defaultValue={size}
                variant="outlined"
                style={{ width: `100px` }}
              />
            </div>
            <p style={{ color: `red` }}>{errors.name}</p>
            <Divider variant="middle" />
            {/* <Divider variant="middle" /> */}
            {/* <div className={classes.Field}>
              <label>Is it a part of a Survey?</label>
              <Select value="" onChange={() => {}}>
                <MenuItem value="group1">survey 1</MenuItem>
                <MenuItem
                  value="
                survey2"
                >
                  survey 2
                </MenuItem>
              </Select>
            </div> */}
          </div>
        </Form>
      )}
    </Formik>
  );

  return (
    <Modal show={show} onHide={closeForm}>
      <Modal.Header>
        <FakeTracker type={type} color={color} name={name} size={+size!} />
      </Modal.Header>
      <Modal.Body>{formElement}</Modal.Body>
      <Modal.Footer>
        <Button onClick={closeForm} variant="secondary">
          Close
        </Button>
        <Pagination count={pages} page={page} onChange={changePage} />
        <Button
          disabled={!!errors.name || color === `#000000`}
          variant="primary"
          onClick={saveForm}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default TrackersFormModal;
