import React, { useEffect, useMemo } from "react";
import { Card, Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/ServiceAls/ServiceAlsActions";
import { ServiceAlEditDialogHeader } from "./ServiceAlEditDialogHeader";
import { ServiceAlEditForm } from "./ServiceAlEditForm";
import { useServiceAlsUIContext } from "../ServiceAlsUIContext";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";

export function ServiceAlEditPage({ id, show, onHide }) {
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
    <div style={{ display: show ? 'block' : 'none' }}>

      <ServiceAlEditForm
        saveServiceAl={saveServiceAl}
        actionsLoading={actionsLoading}
        ServiceAl={ServiceAlForEdit || ServiceAlsUIProps.initServiceAl}
        onHide={onHide}
        id={id}
      />
    </div>
   
  );
}
