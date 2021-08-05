import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import { useLang, setLanguage } from "./../../../../../../_metronic/i18n";

export function SaleProductEditDialogHeader({ id,onHide }) {
  // SaleProducts Redux state
  const { SaleProductForEdit, actionsLoading } = useSelector(
    (state) => ({
      SaleProductForEdit: state.SaleProducts.SaleProductForEdit,
      actionsLoading: state.SaleProducts.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New SaleProduct";
    if (SaleProductForEdit && id) {
      _title = `Edit SaleProduct '${SaleProductForEdit.firstName} ${SaleProductForEdit.lastName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [SaleProductForEdit, actionsLoading]);

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
