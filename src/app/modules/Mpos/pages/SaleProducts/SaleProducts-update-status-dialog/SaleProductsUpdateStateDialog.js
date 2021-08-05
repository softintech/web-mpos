import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  SaleProductStatusCssClasses,
  SaleProductStatusTitles,
} from "../SaleProductsUIHelpers";
import * as actions from "../../../_redux/SaleProducts/SaleProductsActions";
import { useSaleProductsUIContext } from "../SaleProductsUIContext";

const selectedSaleProducts = (entities, ids) => {
  const _SaleProducts = [];
  ids.forEach((id) => {
    const SaleProduct = entities.find((el) => el.id === id);
    if (SaleProduct) {
      _SaleProducts.push(SaleProduct);
    }
  });
  return _SaleProducts;
};

export function SaleProductsUpdateStateDialog({ show, onHide }) {
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
  const { SaleProducts, isLoading } = useSelector(
    (state) => ({
      SaleProducts: selectedSaleProducts(
        state.SaleProducts.entities,
        SaleProductsUIProps.ids
      ),
      isLoading: state.SaleProducts.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!SaleProductsUIProps.ids || SaleProductsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SaleProductsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update SaleProducts status by selected ids
    dispatch(actions.updateSaleProductsStatus(SaleProductsUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchSaleProducts(SaleProductsUIProps.queryParams)).then(
          () => {
            // clear selections list
            SaleProductsUIProps.setIds([]);
            // closing delete modal
            onHide();
          }
        );
      }
    );
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Status has been updated for selected SaleProducts
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block cursor-default">
        {/*begin::Loading*/}
        {isLoading && (
          <div className="overlay-layer">
            <div className="spinner spinner-lg spinner-primary" />
          </div>
        )}
        {/*end::Loading*/}
        <table className="table table table-head-custom table-vertical-center overflow-hidden">
          <thead>
            <tr>
              <th>ID</th>
              <th>STATUS</th>
              <th>SaleProduct</th>
            </tr>
          </thead>
          <tbody>
            {SaleProducts.map((SaleProduct) => (
              <tr key={`id${SaleProduct.id}`}>
                <td>{SaleProduct.id}</td>
                <td>
                  <span
                    className={`label label-lg label-light-${
                      SaleProductStatusCssClasses[SaleProduct.status]
                    } label-inline`}
                  >
                    {" "}
                    {SaleProductStatusTitles[SaleProduct.status]}
                  </span>
                </td>
                <td>
                  <span className="ml-3">
                    {SaleProduct.lastName}, {SaleProduct.firstName}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer className="form">
        <div className="form-group">
          <select
            className="form-control"
            value={status}
            onChange={(e) => setStatus(+e.target.value)}
          >
            <option value="0">Suspended</option>
            <option value="1">Active</option>
            <option value="2">Pending</option>
          </select>
        </div>
        <div className="form-group">
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate mr-3"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={updateStatus}
            className="btn btn-primary btn-elevate"
          >
            Update Status
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
