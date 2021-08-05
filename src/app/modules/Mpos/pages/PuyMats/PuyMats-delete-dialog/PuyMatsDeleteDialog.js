import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/PuyMats/PuyMatsActions";
import { usePuyMatsUIContext } from "../PuyMatsUIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function PuyMatsDeleteDialog({ show, onHide }) {
  // PuyMats UI Context
  const PuyMatsUIContext = usePuyMatsUIContext();
  const PuyMatsUIProps = useMemo(() => {
    return {
      ids: PuyMatsUIContext.ids,
      setIds: PuyMatsUIContext.setIds,
      queryParams: PuyMatsUIContext.queryParams,
    };
  }, [PuyMatsUIContext]);

  // PuyMats Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.PuyMats.actionsLoading }),
    shallowEqual
  );

  // if PuyMats weren't selected we should close modal
  useEffect(() => {
    if (!PuyMatsUIProps.ids || PuyMatsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PuyMatsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deletePuyMats = () => {
    // server request for deleting PuyMat by selected ids
    dispatch(actions.deletePuyMats(PuyMatsUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchPuyMats(PuyMatsUIProps.queryParams)).then(
        () => {
          // clear selections list
          PuyMatsUIProps.setIds([]);
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
          PuyMats Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected PuyMats?</span>
        )}
        {isLoading && <span>PuyMat are deleting...</span>}
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
            onClick={deletePuyMats}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
