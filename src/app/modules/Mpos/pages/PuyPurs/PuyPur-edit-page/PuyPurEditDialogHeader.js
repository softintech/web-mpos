import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import { useLang, setLanguage } from "./../../../../../../_metronic/i18n";

export function PuyPurEditDialogHeader({ id,onHide }) {
  // PuyPurs Redux state
  const { PuyPurForEdit, actionsLoading } = useSelector(
    (state) => ({
      PuyPurForEdit: state.PuyPurs.PuyPurForEdit,
      actionsLoading: state.PuyPurs.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New PuyPur";
    if (PuyPurForEdit && id) {
      _title = `Edit PuyPur '${PuyPurForEdit.firstName} ${PuyPurForEdit.lastName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [PuyPurForEdit, actionsLoading]);

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
