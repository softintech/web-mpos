import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import { useLang, setLanguage } from "./../../../../../../_metronic/i18n";

export function StockMatEditDialogHeader({ id,onHide }) {
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
      {/* closeButton */}
      <Modal.Header >
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
        <a className="hover" onClick={onHide}>{useLang()=='en'?"back":"ย้อนกลับ"}</a>
      </Modal.Header>
    </>
  );
}
