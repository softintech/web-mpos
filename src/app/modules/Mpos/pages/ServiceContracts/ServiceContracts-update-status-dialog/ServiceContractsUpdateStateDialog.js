import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  ServiceContractStatusCssClasses,
  ServiceContractStatusTitles,
} from "../ServiceContractsUIHelpers";
import * as actions from "../../../_redux/ServiceContracts/ServiceContractsActions";
import { useServiceContractsUIContext } from "../ServiceContractsUIContext";

const selectedServiceContracts = (entities, ids) => {
  const _ServiceContracts = [];
  ids.forEach((id) => {
    const ServiceContract = entities.find((el) => el.id === id);
    if (ServiceContract) {
      _ServiceContracts.push(ServiceContract);
    }
  });
  return _ServiceContracts;
};

export function ServiceContractsUpdateStateDialog({ show, onHide }) {
  // ServiceContracts UI Context
  const ServiceContractsUIContext = useServiceContractsUIContext();
  const ServiceContractsUIProps = useMemo(() => {
    return {
      ids: ServiceContractsUIContext.ids,
      setIds: ServiceContractsUIContext.setIds,
      queryParams: ServiceContractsUIContext.queryParams,
    };
  }, [ServiceContractsUIContext]);

  // ServiceContracts Redux state
  const { ServiceContracts, isLoading } = useSelector(
    (state) => ({
      ServiceContracts: selectedServiceContracts(
        state.ServiceContracts.entities,
        ServiceContractsUIProps.ids
      ),
      isLoading: state.ServiceContracts.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!ServiceContractsUIProps.ids || ServiceContractsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ServiceContractsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update ServiceContracts status by selected ids
    dispatch(actions.updateServiceContractsStatus(ServiceContractsUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchServiceContracts(ServiceContractsUIProps.queryParams)).then(
          () => {
            // clear selections list
            ServiceContractsUIProps.setIds([]);
            // closing delete modal
            onHide();
          }
        );
      }
    );
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Status has been updated for selected ServiceContracts
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block cursor-default">
        {/*begin::Loading*/}
        {isLoading && (
          <div className="overlay-layer">
            <div className="spinner spinner-lg spinner-primary" />
          </div>
        )}
        {/*end::Loading*/}
        <table className="table table table-head-custom table-vertical-center overflow-hidden">
          <thead>
            <tr>
              <th>ID</th>
              <th>STATUS</th>
              <th>ServiceContract</th>
            </tr>
          </thead>
          <tbody>
            {ServiceContracts.map((ServiceContract) => (
              <tr key={`id${ServiceContract.id}`}>
                <td>{ServiceContract.id}</td>
                <td>
                  <span
                    className={`label label-lg label-light-${
                      ServiceContractStatusCssClasses[ServiceContract.status]
                    } label-inline`}
                  >
                    {" "}
                    {ServiceContractStatusTitles[ServiceContract.status]}
                  </span>
                </td>
                <td>
                  <span className="ml-3">
                    {ServiceContract.lastName}, {ServiceContract.firstName}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer className="form">
        <div className="form-group">
          <select
            className="form-control"
            value={status}
            onChange={(e) => setStatus(+e.target.value)}
          >
            <option value="0">Suspended</option>
            <option value="1">Active</option>
            <option value="2">Pending</option>
          </select>
        </div>
        <div className="form-group">
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate mr-3"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={updateStatus}
            className="btn btn-primary btn-elevate"
          >
            Update Status
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
