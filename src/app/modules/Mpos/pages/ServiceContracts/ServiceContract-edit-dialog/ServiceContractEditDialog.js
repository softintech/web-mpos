import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/ServiceContracts/ServiceContractsActions";
import { ServiceContractEditDialogHeader } from "./ServiceContractEditDialogHeader";
import { ServiceContractEditForm } from "./ServiceContractEditForm";
import { useServiceContractsUIContext } from "../ServiceContractsUIContext";

export function ServiceContractEditDialog({ id, show, onHide }) {
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
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <ServiceContractEditDialogHeader id={id} />
      <ServiceContractEditForm
        saveServiceContract={saveServiceContract}
        actionsLoading={actionsLoading}
        ServiceContract={ServiceContractForEdit || ServiceContractsUIProps.initServiceContract}
        onHide={onHide}
      />
    </Modal>

  );
}
