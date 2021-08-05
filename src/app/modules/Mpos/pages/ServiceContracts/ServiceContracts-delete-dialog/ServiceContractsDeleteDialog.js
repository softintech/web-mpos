import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/ServiceContracts/ServiceContractsActions";
import { useServiceContractsUIContext } from "../ServiceContractsUIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function ServiceContractsDeleteDialog({ show, onHide }) {
  // ServiceContracts UI Context
  const ServiceContractsUIContext = useServiceContractsUIContext();
  const ServiceContractsUIProps = useMemo(() => {
    return {
      ids: ServiceContractsUIContext.ids,
      setIds: ServiceContractsUIContext.setIds,
      queryParams: ServiceContractsUIContext.queryParams,
    };
  }, [ServiceContractsUIContext]);

  // ServiceContracts Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.ServiceContracts.actionsLoading }),
    shallowEqual
  );

  // if ServiceContracts weren't selected we should close modal
  useEffect(() => {
    if (!ServiceContractsUIProps.ids || ServiceContractsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ServiceContractsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteServiceContracts = () => {
    // server request for deleting ServiceContract by selected ids
    dispatch(actions.deleteServiceContracts(ServiceContractsUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchServiceContracts(ServiceContractsUIProps.queryParams)).then(
        () => {
          // clear selections list
          ServiceContractsUIProps.setIds([]);
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
          ServiceContracts Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected ServiceContracts?</span>
        )}
        {isLoading && <span>ServiceContract are deleting...</span>}
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
            onClick={deleteServiceContracts}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
