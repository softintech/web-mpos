import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function ServiceAlEditDialogHeader({ id }) {
  // ServiceAls Redux state
  const { ServiceAlForEdit, actionsLoading } = useSelector(
    (state) => ({
      ServiceAlForEdit: state.ServiceAls.ServiceAlForEdit,
      actionsLoading: state.ServiceAls.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New ServiceAl";
    if (ServiceAlForEdit && id) {
      _title = `Edit ServiceAl '${ServiceAlForEdit.firstName} ${ServiceAlForEdit.lastName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [ServiceAlForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
