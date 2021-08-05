import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import {
  SaleProductStatusCssClasses,
  SaleProductStatusTitles,
} from "../SaleProductsUIHelpers";
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

export function SaleProductsFetchDialog({ show, onHide }) {
  // SaleProducts UI Context
  const SaleProductsUIContext = useSaleProductsUIContext();
  const SaleProductsUIProps = useMemo(() => {
    return {
      ids: SaleProductsUIContext.ids,
    };
  }, [SaleProductsUIContext]);

  // SaleProducts Redux state
  const { SaleProducts } = useSelector(
    (state) => ({
      SaleProducts: selectedSaleProducts(
        state.SaleProducts.entities,
        SaleProductsUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if SaleProducts weren't selected we should close modal
  useEffect(() => {
    if (!SaleProductsUIProps.ids || SaleProductsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SaleProductsUIProps.ids]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Fetch selected elements
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
            onClick={onHide}
            className="btn btn-primary btn-elevate"
          >
            Ok
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
