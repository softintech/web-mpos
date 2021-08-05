import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function StockMatEditDialogHeader({ id }) {
  // StockMats Redux state
  const { StockMatForEdit, actionsLoading } = useSelector(
    (state) => ({
      StockMatForEdit: state.StockMats.StockMatForEdit,
      actionsLoading: state.StockMats.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New StockMat";
    if (StockMatForEdit && id) {
      _title = `Edit StockMat '${StockMatForEdit.firstName} ${StockMatForEdit.lastName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [StockMatForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
