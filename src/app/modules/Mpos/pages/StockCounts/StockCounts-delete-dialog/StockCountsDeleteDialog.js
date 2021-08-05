import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/StockCounts/StockCountsActions";
import { useStockCountsUIContext } from "../StockCountsUIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function StockCountsDeleteDialog({ show, onHide }) {
  // StockCounts UI Context
  const StockCountsUIContext = useStockCountsUIContext();
  const StockCountsUIProps = useMemo(() => {
    return {
      ids: StockCountsUIContext.ids,
      setIds: StockCountsUIContext.setIds,
      queryParams: StockCountsUIContext.queryParams,
    };
  }, [StockCountsUIContext]);

  // StockCounts Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.StockCounts.actionsLoading }),
    shallowEqual
  );

  // if StockCounts weren't selected we should close modal
  useEffect(() => {
    if (!StockCountsUIProps.ids || StockCountsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [StockCountsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteStockCounts = () => {
    // server request for deleting StockCount by selected ids
    dispatch(actions.deleteStockCounts(StockCountsUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchStockCounts(StockCountsUIProps.queryParams)).then(
        () => {
          // clear selections list
          StockCountsUIProps.setIds([]);
          // closing delete modal
          onHide();
        }
      );
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
          StockCounts Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected StockCounts?</span>
        )}
        {isLoading && <span>StockCount are deleting...</span>}
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
            onClick={deleteStockCounts}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
