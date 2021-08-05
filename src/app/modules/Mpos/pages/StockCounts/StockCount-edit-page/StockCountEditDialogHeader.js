import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import { useLang, setLanguage } from "./../../../../../../_metronic/i18n";

export function StockCountEditDialogHeader({ id,onHide }) {
  // StockCounts Redux state
  const { StockCountForEdit, actionsLoading } = useSelector(
    (state) => ({
      StockCountForEdit: state.StockCounts.StockCountForEdit,
      actionsLoading: state.StockCounts.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New StockCount";
    if (StockCountForEdit && id) {
      _title = `Edit StockCount '${StockCountForEdit.firstName} ${StockCountForEdit.lastName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [StockCountForEdit, actionsLoading]);

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
