import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function ServiceContractEditDialogHeader({ id }) {
  // ServiceContracts Redux state
  const { ServiceContractForEdit, actionsLoading } = useSelector(
    (state) => ({
      ServiceContractForEdit: state.ServiceContracts.ServiceContractForEdit,
      actionsLoading: state.ServiceContracts.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New ServiceContract";
    if (ServiceContractForEdit && id) {
      _title = `Edit ServiceContract '${ServiceContractForEdit.firstName} ${ServiceContractForEdit.lastName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [ServiceContractForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
