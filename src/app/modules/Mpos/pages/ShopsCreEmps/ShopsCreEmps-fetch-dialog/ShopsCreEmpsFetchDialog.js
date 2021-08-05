import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import {
  ShopsCreEmpStatusCssClasses,
  ShopsCreEmpStatusTitles,
} from "../ShopsCreEmpsUIHelpers";
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

export function ShopsCreEmpsFetchDialog({ show, onHide }) {
  // ShopsCreEmps UI Context
  const ShopsCreEmpsUIContext = useShopsCreEmpsUIContext();
  const ShopsCreEmpsUIProps = useMemo(() => {
    return {
      ids: ShopsCreEmpsUIContext.ids,
    };
  }, [ShopsCreEmpsUIContext]);

  // ShopsCreEmps Redux state
  const { ShopsCreEmps } = useSelector(
    (state) => ({
      ShopsCreEmps: selectedShopsCreEmps(
        state.ShopsCreEmps.entities,
        ShopsCreEmpsUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if ShopsCreEmps weren't selected we should close modal
  useEffect(() => {
    if (!ShopsCreEmpsUIProps.ids || ShopsCreEmpsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ShopsCreEmpsUIProps.ids]);

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
