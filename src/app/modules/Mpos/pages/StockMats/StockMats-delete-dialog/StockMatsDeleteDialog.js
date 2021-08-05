import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/StockMats/StockMatsActions";
import { useStockMatsUIContext } from "../StockMatsUIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function StockMatsDeleteDialog({ show, onHide }) {
  // StockMats UI Context
  const StockMatsUIContext = useStockMatsUIContext();
  const StockMatsUIProps = useMemo(() => {
    return {
      ids: StockMatsUIContext.ids,
      setIds: StockMatsUIContext.setIds,
      queryParams: StockMatsUIContext.queryParams,
    };
  }, [StockMatsUIContext]);

  // StockMats Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.StockMats.actionsLoading }),
    shallowEqual
  );

  // if StockMats weren't selected we should close modal
  useEffect(() => {
    if (!StockMatsUIProps.ids || StockMatsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [StockMatsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteStockMats = () => {
    // server request for deleting StockMat by selected ids
    dispatch(actions.deleteStockMats(StockMatsUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchStockMats(StockMatsUIProps.queryParams)).then(
        () => {
          // clear selections list
          StockMatsUIProps.setIds([]);
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
          StockMats Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected StockMats?</span>
        )}
        {isLoading && <span>StockMat are deleting...</span>}
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
            onClick={deleteStockMats}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
