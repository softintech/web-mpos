import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import {
  StockCountStatusCssClasses,
  StockCountStatusTitles,
} from "../StockCountsUIHelpers";
import { useStockCountsUIContext } from "../StockCountsUIContext";

const selectedStockCounts = (entities, ids) => {
  const _StockCounts = [];
  ids.forEach((id) => {
    const StockCount = entities.find((el) => el.id === id);
    if (StockCount) {
      _StockCounts.push(StockCount);
    }
  });
  return _StockCounts;
};

export function StockCountsFetchDialog({ show, onHide }) {
  // StockCounts UI Context
  const StockCountsUIContext = useStockCountsUIContext();
  const StockCountsUIProps = useMemo(() => {
    return {
      ids: StockCountsUIContext.ids,
    };
  }, [StockCountsUIContext]);

  // StockCounts Redux state
  const { StockCounts } = useSelector(
    (state) => ({
      StockCounts: selectedStockCounts(
        state.StockCounts.entities,
        StockCountsUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if StockCounts weren't selected we should close modal
  useEffect(() => {
    if (!StockCountsUIProps.ids || StockCountsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [StockCountsUIProps.ids]);

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
              <th>StockCount</th>
            </tr>
          </thead>
          <tbody>
            {StockCounts.map((StockCount) => (
              <tr key={`id${StockCount.id}`}>
                <td>{StockCount.id}</td>
                <td>
                  <span
                    className={`label label-lg label-light-${
                      StockCountStatusCssClasses[StockCount.status]
                    } label-inline`}
                  >
                    {" "}
                    {StockCountStatusTitles[StockCount.status]}
                  </span>
                </td>
                <td>
                  <span className="ml-3">
                    {StockCount.lastName}, {StockCount.firstName}
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
