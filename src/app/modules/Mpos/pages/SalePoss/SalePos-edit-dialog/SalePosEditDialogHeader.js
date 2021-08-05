import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function SalePosEditDialogHeader({ id }) {
  // SalePoss Redux state
  const { SalePosForEdit, actionsLoading } = useSelector(
    (state) => ({
      SalePosForEdit: state.SalePoss.SalePosForEdit,
      actionsLoading: state.SalePoss.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New SalePos";
    if (SalePosForEdit && id) {
      _title = `Edit SalePos '${SalePosForEdit.firstName} ${SalePosForEdit.lastName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [SalePosForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
