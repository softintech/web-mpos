import React, { useEffect, useMemo } from "react";
import { Card, Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/SaleProducts/SaleProductsActions";
import { SaleProductEditDialogHeader } from "./SaleProductEditDialogHeader";
import { SaleProductEditForm } from "./SaleProductEditForm";
import { useSaleProductsUIContext } from "../SaleProductsUIContext";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";

export function SaleProductEditPage({ id, show, onHide }) {
  // SaleProducts UI Context
  const SaleProductsUIContext = useSaleProductsUIContext();
  const SaleProductsUIProps = useMemo(() => {
    return {
      initSaleProduct: SaleProductsUIContext.initSaleProduct,
    };
  }, [SaleProductsUIContext]);

  // SaleProducts Redux state
  const dispatch = useDispatch();
  const { actionsLoading, SaleProductForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.SaleProducts.actionsLoading,
      SaleProductForEdit: state.SaleProducts.SaleProductForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting SaleProduct by id
    dispatch(actions.fetchSaleProduct(id));
  }, [id, dispatch]);

  // server request for saving SaleProduct
  const saveSaleProduct = (SaleProduct) => {
    if (!id) {
      // server request for creating SaleProduct
      dispatch(actions.createSaleProduct(SaleProduct)).then(() => onHide());
    } else {
      // server request for updating SaleProduct
      dispatch(actions.updateSaleProduct(SaleProduct)).then(() => onHide());
    }
  };
  return (
    <div style={{ display: show ? 'block' : 'none' }}>

      <SaleProductEditForm
        saveSaleProduct={saveSaleProduct}
        actionsLoading={actionsLoading}
        SaleProduct={SaleProductForEdit || SaleProductsUIProps.initSaleProduct}
        onHide={onHide}
        id={id}
      />
    </div>
   
  );
}
