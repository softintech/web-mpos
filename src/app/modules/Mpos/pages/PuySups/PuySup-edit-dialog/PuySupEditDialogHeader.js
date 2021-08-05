import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function PuySupEditDialogHeader({ id }) {
  // PuySups Redux state
  const { PuySupForEdit, actionsLoading } = useSelector(
    (state) => ({
      PuySupForEdit: state.PuySups.PuySupForEdit,
      actionsLoading: state.PuySups.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New PuySup";
    if (PuySupForEdit && id) {
      _title = `Edit PuySup '${PuySupForEdit.firstName} ${PuySupForEdit.lastName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [PuySupForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
