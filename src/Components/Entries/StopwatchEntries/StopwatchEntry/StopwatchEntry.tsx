import React from "react";
import icons from "url:../../bootstrap-icons/bootstrap-icons.svg";
import * as types from "../../../../Types";
import classes from "../StopwatchEntries.module.css";
import {
  absoluteTimestampToString,
  reletiveTimestampToString,
} from "../../../../HalperFunctions/HandleStopwatches";
import { Dropdown } from "react-bootstrap";

const Entry: React.FC<{
  entry: types.CompleteEntry;
  onDelete: (index: number) => void;
  onEdit: (index: number) => void;
}> = React.memo(({ entry, onDelete, onEdit }) => {
  const dropdownHandler = (event: any) => {
    const type: string = event.target!.outerText;
    if (type === `delete`) onDelete(entry.index);
    if (type === `edit`) onEdit(entry.index);
  };

  const from: string = absoluteTimestampToString(entry.from.timestamp);

  let entryEl = (
    <li className={classes.ListItem}>
      <p>{entry.index} .</p>
      <p>{from} - now</p>
      <p>--:--:--</p>
      <p>--:--:--</p>
    </li>
  );

  if (entry.to.timestamp) {
    const to: string = absoluteTimestampToString(entry.to!.timestamp);
    const subTotal: string = reletiveTimestampToString(entry.subTotal);
    const total: string = reletiveTimestampToString(entry.total);

    entryEl = (
      <li className={classes.ListItem}>
        <p>{entry.index} .</p>
        <p>
          {from} - {to}
        </p>
        <p>{subTotal}</p>
        <p>{total}</p>
        <Dropdown>
          <Dropdown.Toggle bsPrefix={classes.Dropdown}>
            <svg
              style={{ color: `white` }}
              width="16"
              height="16"
              fill="currentColor"
            >
              <use href={`${icons}#three-dots-vertical`} />
            </svg>
          </Dropdown.Toggle>

          <Dropdown.Menu onClick={dropdownHandler}>
            <Dropdown.Item eventKey="1">edit</Dropdown.Item>
            <Dropdown.Item eventKey="2">delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </li>
    );
  }

  return entryEl;
});

export default Entry;
