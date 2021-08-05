import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/SaleProducts/SaleProductsActions";
import { useSaleProductsUIContext } from "../SaleProductsUIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function SaleProductsDeleteDialog({ show, onHide }) {
  // SaleProducts UI Context
  const SaleProductsUIContext = useSaleProductsUIContext();
  const SaleProductsUIProps = useMemo(() => {
    return {
      ids: SaleProductsUIContext.ids,
      setIds: SaleProductsUIContext.setIds,
      queryParams: SaleProductsUIContext.queryParams,
    };
  }, [SaleProductsUIContext]);

  // SaleProducts Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.SaleProducts.actionsLoading }),
    shallowEqual
  );

  // if SaleProducts weren't selected we should close modal
  useEffect(() => {
    if (!SaleProductsUIProps.ids || SaleProductsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SaleProductsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteSaleProducts = () => {
    // server request for deleting SaleProduct by selected ids
    dispatch(actions.deleteSaleProducts(SaleProductsUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchSaleProducts(SaleProductsUIProps.queryParams)).then(
        () => {
          // clear selections list
          SaleProductsUIProps.setIds([]);
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
          SaleProducts Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected SaleProducts?</span>
        )}
        {isLoading && <span>SaleProduct are deleting...</span>}
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
            onClick={deleteSaleProducts}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
