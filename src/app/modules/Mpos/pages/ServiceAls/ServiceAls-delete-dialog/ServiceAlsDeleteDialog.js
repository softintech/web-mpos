import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/ServiceAls/ServiceAlsActions";
import { useServiceAlsUIContext } from "../ServiceAlsUIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function ServiceAlsDeleteDialog({ show, onHide }) {
  // ServiceAls UI Context
  const ServiceAlsUIContext = useServiceAlsUIContext();
  const ServiceAlsUIProps = useMemo(() => {
    return {
      ids: ServiceAlsUIContext.ids,
      setIds: ServiceAlsUIContext.setIds,
      queryParams: ServiceAlsUIContext.queryParams,
    };
  }, [ServiceAlsUIContext]);

  // ServiceAls Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.ServiceAls.actionsLoading }),
    shallowEqual
  );

  // if ServiceAls weren't selected we should close modal
  useEffect(() => {
    if (!ServiceAlsUIProps.ids || ServiceAlsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ServiceAlsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteServiceAls = () => {
    // server request for deleting ServiceAl by selected ids
    dispatch(actions.deleteServiceAls(ServiceAlsUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchServiceAls(ServiceAlsUIProps.queryParams)).then(
        () => {
          // clear selections list
          ServiceAlsUIProps.setIds([]);
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
          ServiceAls Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected ServiceAls?</span>
        )}
        {isLoading && <span>ServiceAl are deleting...</span>}
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
            onClick={deleteServiceAls}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
