import React, { useEffect, useMemo } from "react";
import { Card, Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/ServiceContracts/ServiceContractsActions";
import { ServiceContractEditDialogHeader } from "./ServiceContractEditDialogHeader";
import { ServiceContractEditForm } from "./ServiceContractEditForm";
import { useServiceContractsUIContext } from "../ServiceContractsUIContext";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";

export function ServiceContractEditPage({ id, show, onHide }) {
  // ServiceContracts UI Context
  const ServiceContractsUIContext = useServiceContractsUIContext();
  const ServiceContractsUIProps = useMemo(() => {
    return {
      initServiceContract: ServiceContractsUIContext.initServiceContract,
    };
  }, [ServiceContractsUIContext]);

  // ServiceContracts Redux state
  const dispatch = useDispatch();
  const { actionsLoading, ServiceContractForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.ServiceContracts.actionsLoading,
      ServiceContractForEdit: state.ServiceContracts.ServiceContractForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting ServiceContract by id
    dispatch(actions.fetchServiceContract(id));
  }, [id, dispatch]);

  // server request for saving ServiceContract
  const saveServiceContract = (ServiceContract) => {
    if (!id) {
      // server request for creating ServiceContract
      dispatch(actions.createServiceContract(ServiceContract)).then(() => onHide());
    } else {
      // server request for updating ServiceContract
      dispatch(actions.updateServiceContract(ServiceContract)).then(() => onHide());
    }
  };
  return (
    <div style={{ display: show ? 'block' : 'none' }}>

      <ServiceContractEditForm
        saveServiceContract={saveServiceContract}
        actionsLoading={actionsLoading}
        ServiceContract={ServiceContractForEdit || ServiceContractsUIProps.initServiceContract}
        onHide={onHide}
        id={id}
      />
    </div>
   
  );
}
