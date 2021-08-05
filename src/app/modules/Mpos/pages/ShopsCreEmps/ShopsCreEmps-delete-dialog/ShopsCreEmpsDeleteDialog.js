import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/ShopsCreEmps/ShopsCreEmpsActions";
import { useShopsCreEmpsUIContext } from "../ShopsCreEmpsUIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function ShopsCreEmpsDeleteDialog({ show, onHide }) {
  // ShopsCreEmps UI Context
  const ShopsCreEmpsUIContext = useShopsCreEmpsUIContext();
  const ShopsCreEmpsUIProps = useMemo(() => {
    return {
      ids: ShopsCreEmpsUIContext.ids,
      setIds: ShopsCreEmpsUIContext.setIds,
      queryParams: ShopsCreEmpsUIContext.queryParams,
    };
  }, [ShopsCreEmpsUIContext]);

  // ShopsCreEmps Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.ShopsCreEmps.actionsLoading }),
    shallowEqual
  );

  // if ShopsCreEmps weren't selected we should close modal
  useEffect(() => {
    if (!ShopsCreEmpsUIProps.ids || ShopsCreEmpsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ShopsCreEmpsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteShopsCreEmps = () => {
    // server request for deleting ShopsCreEmp by selected ids
    dispatch(actions.deleteShopsCreEmps(ShopsCreEmpsUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchShopsCreEmps(ShopsCreEmpsUIProps.queryParams)).then(
        () => {
          // clear selections list
          ShopsCreEmpsUIProps.setIds([]);
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
          ShopsCreEmps Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected ShopsCreEmps?</span>
        )}
        {isLoading && <span>ShopsCreEmp are deleting...</span>}
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
            onClick={deleteShopsCreEmps}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
