import React, { useState, useContext } from "react";
import { Tracker, CheckerType, RaterType } from "../../Types";
import { Modal } from "react-bootstrap";
import classes from "./SurveyForm.module.css";
// import { Formik, Form, Field } from "formik";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import icons from "url:../../bootstrap-icons/bootstrap-icons.svg";
import DbContext from "../../Context/DbContext";
import {
  TextField,
  Divider,
  Card,
  CardHeader,
  Checkbox,
  ListItemIcon,
  ListItemText,
  ListItem,
  Button,
} from "@material-ui/core";
// import TextField from "@material-ui/core/TextField";

const not = (a: Tracker[], b: Tracker[]) => {
  return a.filter((value) => !b.includes(value));
};

const intersection = (a: Tracker[], b: Tracker[]) => {
  return a.filter((value) => b.includes(value));
};

const union = (a: Tracker[], b: Tracker[]) => {
  return [...a, ...not(b, a)];
};

const SurveyFormModal: React.FC<{
  show: boolean;
  closeHandler: () => void;
  checkers: CheckerType[];
  raters: RaterType[];
}> = React.memo(({ show, closeHandler, checkers, raters }) => {
  const [checked, setChecked] = useState<Tracker[]>([]);
  const [left, setLeft] = useState<Tracker[]>([...checkers, ...raters]);
  const [right, setRight] = useState<Tracker[]>([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);
  const [expanded, setExpanded] = useState<string[]>([`raters`, `checkers`]);
  const [name, setName] = useState("");
  const userDb = useContext(DbContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const closeForm = () => {
    closeHandler();
  };

  const saveForm = () => {
    userDb!
      .collection(`surveys`)
      .add({
        name: name,
        trackers: right.map((tracker) => tracker.id),
      })
      .then(() => {
        closeForm();
      })
      .catch((err: any) => console.log(err));
  };

  const handleToggle = (value: Tracker) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const numberOfChecked = (items: Tracker[]) =>
    intersection(checked, items).length;

  const handleToggleAll = (items: Tracker[]) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const expand = (event: any, nodeIds: string[]) => {
    setExpanded(nodeIds);
  };

  const customList = (title: React.ReactNode, items: Tracker[]) => (
    <Card>
      <CardHeader
        className={classes.CardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <TreeView
        defaultCollapseIcon={
          <svg width="20" height="20" fill="currentColor">
            <use href={`${icons}#chevron-up`} />
          </svg>
        }
        defaultExpandIcon={
          <svg width="20" height="20" fill="currentColor">
            <use href={`${icons}#chevron-down`} />
          </svg>
        }
        expanded={expanded}
        onNodeToggle={expand}
      >
        <TreeItem nodeId="raters" label="Raters">
          {items
            .filter((tracker) => tracker.type === `rater`)
            .map((rater) => {
              return (
                <ListItem
                  key={rater.id}
                  role="listitem"
                  button
                  onClick={handleToggle(rater)}
                >
                  <ListItemIcon>
                    <Checkbox checked={checked.includes(rater)} disableRipple />
                  </ListItemIcon>
                  <ListItemText id={rater.id} primary={rater.name} />
                </ListItem>
              );
            })}
        </TreeItem>
        <TreeItem nodeId="checkers" label="Checkers">
          {items
            .filter((tracker) => tracker.type === `checker`)
            .map((checker) => {
              return (
                <ListItem
                  key={checker.id}
                  role="listitem"
                  button
                  onClick={handleToggle(checker)}
                >
                  <ListItemIcon>
                    <Checkbox
                      checked={checked.includes(checker)}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText id={checker.id} primary={checker.name} />
                </ListItem>
              );
            })}
        </TreeItem>
      </TreeView>
    </Card>
  );

  const formElement: JSX.Element = (
    <form className={classes.Form}>
      <TextField
        id="standard-basic"
        label="Name"
        required
        value={name}
        onChange={handleChange}
        error={name.length < 4 && name.length > 0}
      />
      <div className={classes.Transfer}>
        {customList("Choices", left)}
        <div className={classes.Movers}>
          <Button
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
          >
            &lt;
          </Button>
        </div>
        {customList("Chosen", right)}
      </div>
    </form>
  );

  return (
    <Modal show={show} onHide={closeForm}>
      <Modal.Header></Modal.Header>
      <Modal.Body>{formElement}</Modal.Body>
      <Modal.Footer>
        <Button onClick={closeForm}>Close</Button>
        <Button onClick={saveForm}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
});

export default SurveyFormModal;
