import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/StockCounts/StockCountsActions";
import {useStockCountsUIContext} from "../StockCountsUIContext";

export function StockCountDeleteDialog({ id, show, onHide }) {
  // StockCounts UI Context
  const StockCountsUIContext = useStockCountsUIContext();
  const StockCountsUIProps = useMemo(() => {
    return {
      setIds: StockCountsUIContext.setIds,
      queryParams: StockCountsUIContext.queryParams
    };
  }, [StockCountsUIContext]);

  // StockCounts Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.StockCounts.actionsLoading }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteStockCount = () => {
    // server request for deleting StockCount by id
    dispatch(actions.deleteStockCount(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchStockCounts(StockCountsUIProps.queryParams));
      // clear selections list
      StockCountsUIProps.setIds([]);
      // closing delete modal
      onHide();
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {/*begin::Loading*/}
      {isLoading && <ModalProgressBar />}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          StockCount Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this StockCount?</span>
        )}
        {isLoading && <span>StockCount is deleting...</span>}
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
            onClick={deleteStockCount}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
