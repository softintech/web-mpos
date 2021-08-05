import React, { useEffect, useMemo } from "react";
import { Card, Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/StockCounts/StockCountsActions";
import { StockCountEditDialogHeader } from "./StockCountEditDialogHeader";
import { StockCountEditForm } from "./StockCountEditForm";
import { useStockCountsUIContext } from "../StockCountsUIContext";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";

export function StockCountEditPage({ id, show, onHide }) {
  // StockCounts UI Context
  const StockCountsUIContext = useStockCountsUIContext();
  const StockCountsUIProps = useMemo(() => {
    return {
      initStockCount: StockCountsUIContext.initStockCount,
    };
  }, [StockCountsUIContext]);

  // StockCounts Redux state
  const dispatch = useDispatch();
  const { actionsLoading, StockCountForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.StockCounts.actionsLoading,
      StockCountForEdit: state.StockCounts.StockCountForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting StockCount by id
    dispatch(actions.fetchStockCount(id));
  }, [id, dispatch]);

  // server request for saving StockCount
  const saveStockCount = (StockCount) => {
    if (!id) {
      // server request for creating StockCount
      dispatch(actions.createStockCount(StockCount)).then(() => onHide());
    } else {
      // server request for updating StockCount
      dispatch(actions.updateStockCount(StockCount)).then(() => onHide());
    }
  };
  return (
    <div style={{ display: show ? 'block' : 'none' }}>

      <StockCountEditForm
        saveStockCount={saveStockCount}
        actionsLoading={actionsLoading}
        StockCount={StockCountForEdit || StockCountsUIProps.initStockCount}
        onHide={onHide}
        id={id}
      />
    </div>
   
  );
}
