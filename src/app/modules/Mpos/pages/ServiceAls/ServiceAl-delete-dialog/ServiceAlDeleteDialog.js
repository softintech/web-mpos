import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/ServiceAls/ServiceAlsActions";
import {useServiceAlsUIContext} from "../ServiceAlsUIContext";

export function ServiceAlDeleteDialog({ id, show, onHide }) {
  // ServiceAls UI Context
  const ServiceAlsUIContext = useServiceAlsUIContext();
  const ServiceAlsUIProps = useMemo(() => {
    return {
      setIds: ServiceAlsUIContext.setIds,
      queryParams: ServiceAlsUIContext.queryParams
    };
  }, [ServiceAlsUIContext]);

  // ServiceAls Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.ServiceAls.actionsLoading }),
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

  const deleteServiceAl = () => {
    // server request for deleting ServiceAl by id
    dispatch(actions.deleteServiceAl(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchServiceAls(ServiceAlsUIProps.queryParams));
      // clear selections list
      ServiceAlsUIProps.setIds([]);
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
          ServiceAl Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this ServiceAl?</span>
        )}
        {isLoading && <span>ServiceAl is deleting...</span>}
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
            onClick={deleteServiceAl}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
