import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  ShopsCreEmpStatusCssClasses,
  ShopsCreEmpStatusTitles,
} from "../ShopsCreEmpsUIHelpers";
import * as actions from "../../../_redux/ShopsCreEmps/ShopsCreEmpsActions";
import { useShopsCreEmpsUIContext } from "../ShopsCreEmpsUIContext";

const selectedShopsCreEmps = (entities, ids) => {
  const _ShopsCreEmps = [];
  ids.forEach((id) => {
    const ShopsCreEmp = entities.find((el) => el.id === id);
    if (ShopsCreEmp) {
      _ShopsCreEmps.push(ShopsCreEmp);
    }
  });
  return _ShopsCreEmps;
};

export function ShopsCreEmpsUpdateStateDialog({ show, onHide }) {
  // ShopsCreEmps UI Context
  const ShopsCreEmpsUIContext = useShopsCreEmpsUIContext();
  const ShopsCreEmpsUIProps = useMemo(() => {
    return {
      ids: ShopsCreEmpsUIContext.ids,
      setIds: ShopsCreEmpsUIContext.setIds,
      queryParams: ShopsCreEmpsUIContext.queryParams,
    };
  }, [ShopsCreEmpsUIContext]);

  // ShopsCreEmps Redux state
  const { ShopsCreEmps, isLoading } = useSelector(
    (state) => ({
      ShopsCreEmps: selectedShopsCreEmps(
        state.ShopsCreEmps.entities,
        ShopsCreEmpsUIProps.ids
      ),
      isLoading: state.ShopsCreEmps.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!ShopsCreEmpsUIProps.ids || ShopsCreEmpsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ShopsCreEmpsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update ShopsCreEmps status by selected ids
    dispatch(actions.updateShopsCreEmpsStatus(ShopsCreEmpsUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchShopsCreEmps(ShopsCreEmpsUIProps.queryParams)).then(
          () => {
            // clear selections list
            ShopsCreEmpsUIProps.setIds([]);
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
          Status has been updated for selected ShopsCreEmps
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
              <th>ShopsCreEmp</th>
            </tr>
          </thead>
          <tbody>
            {ShopsCreEmps.map((ShopsCreEmp) => (
              <tr key={`id${ShopsCreEmp.id}`}>
                <td>{ShopsCreEmp.id}</td>
                <td>
                  <span
                    className={`label label-lg label-light-${
                      ShopsCreEmpStatusCssClasses[ShopsCreEmp.status]
                    } label-inline`}
                  >
                    {" "}
                    {ShopsCreEmpStatusTitles[ShopsCreEmp.status]}
                  </span>
                </td>
                <td>
                  <span className="ml-3">
                    {ShopsCreEmp.lastName}, {ShopsCreEmp.firstName}
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
