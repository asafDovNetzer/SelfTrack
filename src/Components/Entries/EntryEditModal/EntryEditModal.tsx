import React, { useContext } from "react";
// import { Modal } from "react-bootstrap";
import * as types from "../../../Types";
import EntryEditForm from "../StopwatchEntries/EntryEditForm";
import { db } from "../../../Firebase";
import DbContext from "../../../Context/DbContext";
import Modal from "../../UI/Modal/Modal";
// import DateContext from "../../../Context/DateContext";

const EntryEditModal: React.FC<{
  show: boolean;
  closeHandler: () => void;
  entry: types.CompleteEntry | null;
  newEntryHandler: (timestamp: number) => void;
  editHandler: (batch: types.Batch) => void;
}> = ({ show, closeHandler, editHandler, entry, newEntryHandler }) => {
  const userDb = useContext(DbContext);

  // console.log(`rendering entry edit modal`, entry);

  const submit = (from: number, to: number) => {
    if (!entry?.index) {
      newEntryHandler(from);
      newEntryHandler(to);
    } else {
      changeEntry(from, to);
    }
    closeHandler();
  };

  const changeEntry = (from: number, to: number) => {
    console.log(`change`);

    const batch = db.batch();

    const fromRef = userDb!.collection(`entries`).doc(entry!.from.id);
    batch.update(fromRef, { timestamp: from });

    if (entry!.to.id) {
      const toRef = userDb!.collection(`entries`).doc(entry!.to.id);
      batch.update(toRef, { timestamp: to });
    }

    if (!entry!.to.id) {
      console.log(`do something else`);
      newEntryHandler(to);
    }

    editHandler(batch);
  };

  return (
    <Modal show={show} onHide={closeHandler}>
      <div style={{ width: `100%`, height: `60px` }}>
        Change the beginning and ending
      </div>
      <div style={{ width: `100%`, height: `max-content` }}>
        <EntryEditForm
          onCancel={closeHandler}
          entry={entry}
          submitHandler={submit}
        />
      </div>
    </Modal>
  );
};

export default EntryEditModal;
