import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  ServiceAlStatusCssClasses,
  ServiceAlStatusTitles,
} from "../ServiceAlsUIHelpers";
import * as actions from "../../../_redux/ServiceAls/ServiceAlsActions";
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

export function ServiceAlsUpdateStateDialog({ show, onHide }) {
  // ServiceAls UI Context
  const ServiceAlsUIContext = useServiceAlsUIContext();
  const ServiceAlsUIProps = useMemo(() => {
    return {
      ids: ServiceAlsUIContext.ids,
      setIds: ServiceAlsUIContext.setIds,
      queryParams: ServiceAlsUIContext.queryParams,
    };
  }, [ServiceAlsUIContext]);

  // ServiceAls Redux state
  const { ServiceAls, isLoading } = useSelector(
    (state) => ({
      ServiceAls: selectedServiceAls(
        state.ServiceAls.entities,
        ServiceAlsUIProps.ids
      ),
      isLoading: state.ServiceAls.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!ServiceAlsUIProps.ids || ServiceAlsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ServiceAlsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update ServiceAls status by selected ids
    dispatch(actions.updateServiceAlsStatus(ServiceAlsUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchServiceAls(ServiceAlsUIProps.queryParams)).then(
          () => {
            // clear selections list
            ServiceAlsUIProps.setIds([]);
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
          Status has been updated for selected ServiceAls
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
