import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/SalePoss/SalePossActions";
import { useSalePossUIContext } from "../SalePossUIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function SalePossDeleteDialog({ show, onHide }) {
  // SalePoss UI Context
  const SalePossUIContext = useSalePossUIContext();
  const SalePossUIProps = useMemo(() => {
    return {
      ids: SalePossUIContext.ids,
      setIds: SalePossUIContext.setIds,
      queryParams: SalePossUIContext.queryParams,
    };
  }, [SalePossUIContext]);

  // SalePoss Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.SalePoss.actionsLoading }),
    shallowEqual
  );

  // if SalePoss weren't selected we should close modal
  useEffect(() => {
    if (!SalePossUIProps.ids || SalePossUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SalePossUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteSalePoss = () => {
    // server request for deleting SalePos by selected ids
    dispatch(actions.deleteSalePoss(SalePossUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchSalePoss(SalePossUIProps.queryParams)).then(
        () => {
          // clear selections list
          SalePossUIProps.setIds([]);
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
          SalePoss Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected SalePoss?</span>
        )}
        {isLoading && <span>SalePos are deleting...</span>}
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
            onClick={deleteSalePoss}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
