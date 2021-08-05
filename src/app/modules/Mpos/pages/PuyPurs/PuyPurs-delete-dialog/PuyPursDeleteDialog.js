import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/PuyPurs/PuyPursActions";
import { usePuyPursUIContext } from "../PuyPursUIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function PuyPursDeleteDialog({ show, onHide }) {
  // PuyPurs UI Context
  const PuyPursUIContext = usePuyPursUIContext();
  const PuyPursUIProps = useMemo(() => {
    return {
      ids: PuyPursUIContext.ids,
      setIds: PuyPursUIContext.setIds,
      queryParams: PuyPursUIContext.queryParams,
    };
  }, [PuyPursUIContext]);

  // PuyPurs Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.PuyPurs.actionsLoading }),
    shallowEqual
  );

  // if PuyPurs weren't selected we should close modal
  useEffect(() => {
    if (!PuyPursUIProps.ids || PuyPursUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PuyPursUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deletePuyPurs = () => {
    // server request for deleting PuyPur by selected ids
    dispatch(actions.deletePuyPurs(PuyPursUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchPuyPurs(PuyPursUIProps.queryParams)).then(
        () => {
          // clear selections list
          PuyPursUIProps.setIds([]);
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
          PuyPurs Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected PuyPurs?</span>
        )}
        {isLoading && <span>PuyPur are deleting...</span>}
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
            onClick={deletePuyPurs}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
