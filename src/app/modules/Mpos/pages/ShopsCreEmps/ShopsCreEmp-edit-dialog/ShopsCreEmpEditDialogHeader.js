import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function ShopsCreEmpEditDialogHeader({ id }) {
  // ShopsCreEmps Redux state
  const { ShopsCreEmpForEdit, actionsLoading } = useSelector(
    (state) => ({
      ShopsCreEmpForEdit: state.ShopsCreEmps.ShopsCreEmpForEdit,
      actionsLoading: state.ShopsCreEmps.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New ShopsCreEmp";
    if (ShopsCreEmpForEdit && id) {
      _title = `Edit ShopsCreEmp '${ShopsCreEmpForEdit.firstName} ${ShopsCreEmpForEdit.lastName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [ShopsCreEmpForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
