import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import {
  StockMatStatusCssClasses,
  StockMatStatusTitles,
} from "../StockMatsUIHelpers";
import { useStockMatsUIContext } from "../StockMatsUIContext";

const selectedStockMats = (entities, ids) => {
  const _StockMats = [];
  ids.forEach((id) => {
    const StockMat = entities.find((el) => el.id === id);
    if (StockMat) {
      _StockMats.push(StockMat);
    }
  });
  return _StockMats;
};

export function StockMatsFetchDialog({ show, onHide }) {
  // StockMats UI Context
  const StockMatsUIContext = useStockMatsUIContext();
  const StockMatsUIProps = useMemo(() => {
    return {
      ids: StockMatsUIContext.ids,
    };
  }, [StockMatsUIContext]);

  // StockMats Redux state
  const { StockMats } = useSelector(
    (state) => ({
      StockMats: selectedStockMats(
        state.StockMats.entities,
        StockMatsUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if StockMats weren't selected we should close modal
  useEffect(() => {
    if (!StockMatsUIProps.ids || StockMatsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [StockMatsUIProps.ids]);

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
              <th>StockMat</th>
            </tr>
          </thead>
          <tbody>
            {StockMats.map((StockMat) => (
              <tr key={`id${StockMat.id}`}>
                <td>{StockMat.id}</td>
                <td>
                  <span
                    className={`label label-lg label-light-${
                      StockMatStatusCssClasses[StockMat.status]
                    } label-inline`}
                  >
                    {" "}
                    {StockMatStatusTitles[StockMat.status]}
                  </span>
                </td>
                <td>
                  <span className="ml-3">
                    {StockMat.lastName}, {StockMat.firstName}
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
