import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import { useLang, setLanguage } from "./../../../../../../_metronic/i18n";

export function PuySupEditDialogHeader({ id,onHide }) {
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
      {/* closeButton */}
      <Modal.Header >
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
        <a className="hover" onClick={onHide}>{useLang()=='en'?"back":"ย้อนกลับ"}</a>
      </Modal.Header>
    </>
  );
}
