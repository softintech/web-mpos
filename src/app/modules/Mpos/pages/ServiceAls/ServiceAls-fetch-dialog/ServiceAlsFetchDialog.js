import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import {
  ServiceAlStatusCssClasses,
  ServiceAlStatusTitles,
} from "../ServiceAlsUIHelpers";
import { useServiceAlsUIContext } from "../ServiceAlsUIContext";

const selectedServiceAls = (entities, ids) => {
  const _ServiceAls = [];
  ids.forEach((id) => {
    const ServiceAl = entities.find((el) => el.id === id);
    if (ServiceAl) {
      _ServiceAls.push(ServiceAl);
    }
  });
  return _ServiceAls;
};

export function ServiceAlsFetchDialog({ show, onHide }) {
  // ServiceAls UI Context
  const ServiceAlsUIContext = useServiceAlsUIContext();
  const ServiceAlsUIProps = useMemo(() => {
    return {
      ids: ServiceAlsUIContext.ids,
    };
  }, [ServiceAlsUIContext]);

  // ServiceAls Redux state
  const { ServiceAls } = useSelector(
    (state) => ({
      ServiceAls: selectedServiceAls(
        state.ServiceAls.entities,
        ServiceAlsUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if ServiceAls weren't selected we should close modal
  useEffect(() => {
    if (!ServiceAlsUIProps.ids || ServiceAlsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ServiceAlsUIProps.ids]);

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
              <th>ServiceAl</th>
            </tr>
          </thead>
          <tbody>
            {ServiceAls.map((ServiceAl) => (
              <tr key={`id${ServiceAl.id}`}>
                <td>{ServiceAl.id}</td>
                <td>
                  <span
                    className={`label label-lg label-light-${
                      ServiceAlStatusCssClasses[ServiceAl.status]
                    } label-inline`}
                  >
                    {" "}
                    {ServiceAlStatusTitles[ServiceAl.status]}
                  </span>
                </td>
                <td>
                  <span className="ml-3">
                    {ServiceAl.lastName}, {ServiceAl.firstName}
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
