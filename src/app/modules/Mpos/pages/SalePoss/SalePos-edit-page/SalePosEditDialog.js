import React, { useEffect, useMemo } from "react";
import { Card, Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/SalePoss/SalePossActions";
import { SalePosEditDialogHeader } from "./SalePosEditDialogHeader";
import { SalePosEditForm } from "./SalePosEditForm";
import { useSalePossUIContext } from "../SalePossUIContext";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";

export function SalePosEditPage({ id, show, onHide }) {
  // SalePoss UI Context
  const SalePossUIContext = useSalePossUIContext();
  const SalePossUIProps = useMemo(() => {
    return {
      initSalePos: SalePossUIContext.initSalePos,
    };
  }, [SalePossUIContext]);

  // SalePoss Redux state
  const dispatch = useDispatch();
  const { actionsLoading, SalePosForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.SalePoss.actionsLoading,
      SalePosForEdit: state.SalePoss.SalePosForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting SalePos by id
    dispatch(actions.fetchSalePos(id));
  }, [id, dispatch]);

  // server request for saving SalePos
  const saveSalePos = (SalePos) => {
    if (!id) {
      // server request for creating SalePos
      dispatch(actions.createSalePos(SalePos)).then(() => onHide());
    } else {
      // server request for updating SalePos
      dispatch(actions.updateSalePos(SalePos)).then(() => onHide());
    }
  };
  return (
    <div style={{ display: show ? 'block' : 'none' }}>

      <SalePosEditForm
        saveSalePos={saveSalePos}
        actionsLoading={actionsLoading}
        SalePos={SalePosForEdit || SalePossUIProps.initSalePos}
        onHide={onHide}
        id={id}
      />
    </div>
   
  );
}
