import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/PuyPurs/PuyPursActions";
import {usePuyPursUIContext} from "../PuyPursUIContext";

export function PuyPurDeleteDialog({ id, show, onHide }) {
  // PuyPurs UI Context
  const PuyPursUIContext = usePuyPursUIContext();
  const PuyPursUIProps = useMemo(() => {
    return {
      setIds: PuyPursUIContext.setIds,
      queryParams: PuyPursUIContext.queryParams
    };
  }, [PuyPursUIContext]);

  // PuyPurs Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.PuyPurs.actionsLoading }),
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

  const deletePuyPur = () => {
    // server request for deleting PuyPur by id
    dispatch(actions.deletePuyPur(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchPuyPurs(PuyPursUIProps.queryParams));
      // clear selections list
      PuyPursUIProps.setIds([]);
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
          PuyPur Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this PuyPur?</span>
        )}
        {isLoading && <span>PuyPur is deleting...</span>}
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
            onClick={deletePuyPur}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
