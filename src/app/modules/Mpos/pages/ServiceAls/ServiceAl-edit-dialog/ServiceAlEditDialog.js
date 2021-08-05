import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/ServiceAls/ServiceAlsActions";
import { ServiceAlEditDialogHeader } from "./ServiceAlEditDialogHeader";
import { ServiceAlEditForm } from "./ServiceAlEditForm";
import { useServiceAlsUIContext } from "../ServiceAlsUIContext";

export function ServiceAlEditDialog({ id, show, onHide }) {
  // ServiceAls UI Context
  const ServiceAlsUIContext = useServiceAlsUIContext();
  const ServiceAlsUIProps = useMemo(() => {
    return {
      initServiceAl: ServiceAlsUIContext.initServiceAl,
    };
  }, [ServiceAlsUIContext]);

  // ServiceAls Redux state
  const dispatch = useDispatch();
  const { actionsLoading, ServiceAlForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.ServiceAls.actionsLoading,
      ServiceAlForEdit: state.ServiceAls.ServiceAlForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting ServiceAl by id
    dispatch(actions.fetchServiceAl(id));
  }, [id, dispatch]);

  // server request for saving ServiceAl
  const saveServiceAl = (ServiceAl) => {
    if (!id) {
      // server request for creating ServiceAl
      dispatch(actions.createServiceAl(ServiceAl)).then(() => onHide());
    } else {
      // server request for updating ServiceAl
      dispatch(actions.updateServiceAl(ServiceAl)).then(() => onHide());
    }
  };
  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <ServiceAlEditDialogHeader id={id} />
      <ServiceAlEditForm
        saveServiceAl={saveServiceAl}
        actionsLoading={actionsLoading}
        ServiceAl={ServiceAlForEdit || ServiceAlsUIProps.initServiceAl}
        onHide={onHide}
      />
    </Modal>

  );
}
