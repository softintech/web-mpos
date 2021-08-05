import React, { useEffect, useMemo } from "react";
import { Card, Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/StockMats/StockMatsActions";
import { StockMatEditDialogHeader } from "./StockMatEditDialogHeader";
import { StockMatEditForm } from "./StockMatEditForm";
import { useStockMatsUIContext } from "../StockMatsUIContext";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";

export function StockMatEditPage({ id, show, onHide }) {
  // StockMats UI Context
  const StockMatsUIContext = useStockMatsUIContext();
  const StockMatsUIProps = useMemo(() => {
    return {
      initStockMat: StockMatsUIContext.initStockMat,
    };
  }, [StockMatsUIContext]);

  // StockMats Redux state
  const dispatch = useDispatch();
  const { actionsLoading, StockMatForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.StockMats.actionsLoading,
      StockMatForEdit: state.StockMats.StockMatForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting StockMat by id
    dispatch(actions.fetchStockMat(id));
  }, [id, dispatch]);

  // server request for saving StockMat
  const saveStockMat = (StockMat) => {
    if (!id) {
      // server request for creating StockMat
      dispatch(actions.createStockMat(StockMat)).then(() => onHide());
    } else {
      // server request for updating StockMat
      dispatch(actions.updateStockMat(StockMat)).then(() => onHide());
    }
  };
  return (
    <div style={{ display: show ? 'block' : 'none' }}>

      <StockMatEditForm
        saveStockMat={saveStockMat}
        actionsLoading={actionsLoading}
        StockMat={StockMatForEdit || StockMatsUIProps.initStockMat}
        onHide={onHide}
        id={id}
      />
    </div>
   
  );
}
