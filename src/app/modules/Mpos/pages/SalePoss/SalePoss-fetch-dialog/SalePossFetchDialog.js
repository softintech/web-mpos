import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import {
  SalePosStatusCssClasses,
  SalePosStatusTitles,
} from "../SalePossUIHelpers";
import { useSalePossUIContext } from "../SalePossUIContext";

const selectedSalePoss = (entities, ids) => {
  const _SalePoss = [];
  ids.forEach((id) => {
    const SalePos = entities.find((el) => el.id === id);
    if (SalePos) {
      _SalePoss.push(SalePos);
    }
  });
  return _SalePoss;
};

export function SalePossFetchDialog({ show, onHide }) {
  // SalePoss UI Context
  const SalePossUIContext = useSalePossUIContext();
  const SalePossUIProps = useMemo(() => {
    return {
      ids: SalePossUIContext.ids,
    };
  }, [SalePossUIContext]);

  // SalePoss Redux state
  const { SalePoss } = useSelector(
    (state) => ({
      SalePoss: selectedSalePoss(
        state.SalePoss.entities,
        SalePossUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if SalePoss weren't selected we should close modal
  useEffect(() => {
    if (!SalePossUIProps.ids || SalePossUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SalePossUIProps.ids]);

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
              <th>SalePos</th>
            </tr>
          </thead>
          <tbody>
            {SalePoss.map((SalePos) => (
              <tr key={`id${SalePos.id}`}>
                <td>{SalePos.id}</td>
                <td>
                  <span
                    className={`label label-lg label-light-${
                      SalePosStatusCssClasses[SalePos.status]
                    } label-inline`}
                  >
                    {" "}
                    {SalePosStatusTitles[SalePos.status]}
                  </span>
                </td>
                <td>
                  <span className="ml-3">
                    {SalePos.lastName}, {SalePos.firstName}
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
