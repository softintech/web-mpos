import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import {
  ServiceContractStatusCssClasses,
  ServiceContractStatusTitles,
} from "../ServiceContractsUIHelpers";
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

export function ServiceContractsFetchDialog({ show, onHide }) {
  // ServiceContracts UI Context
  const ServiceContractsUIContext = useServiceContractsUIContext();
  const ServiceContractsUIProps = useMemo(() => {
    return {
      ids: ServiceContractsUIContext.ids,
    };
  }, [ServiceContractsUIContext]);

  // ServiceContracts Redux state
  const { ServiceContracts } = useSelector(
    (state) => ({
      ServiceContracts: selectedServiceContracts(
        state.ServiceContracts.entities,
        ServiceContractsUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if ServiceContracts weren't selected we should close modal
  useEffect(() => {
    if (!ServiceContractsUIProps.ids || ServiceContractsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ServiceContractsUIProps.ids]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Fetch selected elements
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-primary btn-elevate"
          >
            Ok
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
