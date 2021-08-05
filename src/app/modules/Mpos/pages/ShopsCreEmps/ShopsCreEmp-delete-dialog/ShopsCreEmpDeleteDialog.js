import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/ShopsCreEmps/ShopsCreEmpsActions";
import {useShopsCreEmpsUIContext} from "../ShopsCreEmpsUIContext";

export function ShopsCreEmpDeleteDialog({ id, show, onHide }) {
  // ShopsCreEmps UI Context
  const ShopsCreEmpsUIContext = useShopsCreEmpsUIContext();
  const ShopsCreEmpsUIProps = useMemo(() => {
    return {
      setIds: ShopsCreEmpsUIContext.setIds,
      queryParams: ShopsCreEmpsUIContext.queryParams
    };
  }, [ShopsCreEmpsUIContext]);

  // ShopsCreEmps Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.ShopsCreEmps.actionsLoading }),
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

  const deleteShopsCreEmp = () => {
    // server request for deleting ShopsCreEmp by id
    dispatch(actions.deleteShopsCreEmp(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchShopsCreEmps(ShopsCreEmpsUIProps.queryParams));
      // clear selections list
      ShopsCreEmpsUIProps.setIds([]);
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
          ShopsCreEmp Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this ShopsCreEmp?</span>
        )}
        {isLoading && <span>ShopsCreEmp is deleting...</span>}
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
            onClick={deleteShopsCreEmp}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
