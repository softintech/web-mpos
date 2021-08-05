import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/ShopsCreshops/ShopsCreshopsActions";
import { useShopsCreshopsUIContext } from "../ShopsCreshopsUIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function ShopsCreshopsDeleteDialog({ show, onHide }) {
  // ShopsCreshops UI Context
  const ShopsCreshopsUIContext = useShopsCreshopsUIContext();
  const ShopsCreshopsUIProps = useMemo(() => {
    return {
      ids: ShopsCreshopsUIContext.ids,
      setIds: ShopsCreshopsUIContext.setIds,
      queryParams: ShopsCreshopsUIContext.queryParams,
    };
  }, [ShopsCreshopsUIContext]);

  // ShopsCreshops Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.ShopsCreshops.actionsLoading }),
    shallowEqual
  );

  // if ShopsCreshops weren't selected we should close modal
  useEffect(() => {
    if (!ShopsCreshopsUIProps.ids || ShopsCreshopsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ShopsCreshopsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteShopsCreshops = () => {
    // server request for deleting ShopsCreshop by selected ids
    dispatch(actions.deleteShopsCreshops(ShopsCreshopsUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchShopsCreshops(ShopsCreshopsUIProps.queryParams)).then(
        () => {
          // clear selections list
          ShopsCreshopsUIProps.setIds([]);
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
          ShopsCreshops Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected ShopsCreshops?</span>
        )}
        {isLoading && <span>ShopsCreshop are deleting...</span>}
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
            onClick={deleteShopsCreshops}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
