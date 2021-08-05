import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/PuySups/PuySupsActions";
import { usePuySupsUIContext } from "../PuySupsUIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function PuySupsDeleteDialog({ show, onHide }) {
  // PuySups UI Context
  const PuySupsUIContext = usePuySupsUIContext();
  const PuySupsUIProps = useMemo(() => {
    return {
      ids: PuySupsUIContext.ids,
      setIds: PuySupsUIContext.setIds,
      queryParams: PuySupsUIContext.queryParams,
    };
  }, [PuySupsUIContext]);

  // PuySups Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.PuySups.actionsLoading }),
    shallowEqual
  );

  // if PuySups weren't selected we should close modal
  useEffect(() => {
    if (!PuySupsUIProps.ids || PuySupsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PuySupsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deletePuySups = () => {
    // server request for deleting PuySup by selected ids
    dispatch(actions.deletePuySups(PuySupsUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchPuySups(PuySupsUIProps.queryParams)).then(
        () => {
          // clear selections list
          PuySupsUIProps.setIds([]);
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
          PuySups Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected PuySups?</span>
        )}
        {isLoading && <span>PuySup are deleting...</span>}
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
            onClick={deletePuySups}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
