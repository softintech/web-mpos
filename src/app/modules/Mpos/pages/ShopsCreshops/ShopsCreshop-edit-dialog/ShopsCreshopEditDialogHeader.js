import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function ShopsCreshopEditDialogHeader({ id }) {
  // ShopsCreshops Redux state
  const { ShopsCreshopForEdit, actionsLoading } = useSelector(
    (state) => ({
      ShopsCreshopForEdit: state.ShopsCreshops.ShopsCreshopForEdit,
      actionsLoading: state.ShopsCreshops.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New ShopsCreshop";
    if (ShopsCreshopForEdit && id) {
      _title = `Edit ShopsCreshop '${ShopsCreshopForEdit.firstName} ${ShopsCreshopForEdit.lastName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [ShopsCreshopForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
