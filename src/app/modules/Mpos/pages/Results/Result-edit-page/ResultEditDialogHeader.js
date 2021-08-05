import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import { useLang, setLanguage } from "./../../../../../../_metronic/i18n";

export function ResultEditDialogHeader({ id,onHide }) {
  // Results Redux state
  const { ResultForEdit, actionsLoading } = useSelector(
    (state) => ({
      ResultForEdit: state.Results.ResultForEdit,
      actionsLoading: state.Results.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New Result";
    if (ResultForEdit && id) {
      _title = `Edit Result '${ResultForEdit.firstName} ${ResultForEdit.lastName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [ResultForEdit, actionsLoading]);

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
