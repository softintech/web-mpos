import React, { useEffect, useMemo } from "react";
import { Card, Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/ShopsCreEmps/ShopsCreEmpsActions";
import { ShopsCreEmpEditDialogHeader } from "./ShopsCreEmpEditDialogHeader";
import { ShopsCreEmpEditForm } from "./ShopsCreEmpEditForm";
import { useShopsCreEmpsUIContext } from "../ShopsCreEmpsUIContext";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";

export function ShopsCreEmpEditPage({ id, show, onHide }) {
  // ShopsCreEmps UI Context
  const ShopsCreEmpsUIContext = useShopsCreEmpsUIContext();
  const ShopsCreEmpsUIProps = useMemo(() => {
    return {
      initShopsCreEmp: ShopsCreEmpsUIContext.initShopsCreEmp,
    };
  }, [ShopsCreEmpsUIContext]);

  // ShopsCreEmps Redux state
  const dispatch = useDispatch();
  const { actionsLoading, ShopsCreEmpForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.ShopsCreEmps.actionsLoading,
      ShopsCreEmpForEdit: state.ShopsCreEmps.ShopsCreEmpForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting ShopsCreEmp by id
    dispatch(actions.fetchShopsCreEmp(id));
  }, [id, dispatch]);

  // server request for saving ShopsCreEmp
  const saveShopsCreEmp = (ShopsCreEmp) => {
    if (!id) {
      // server request for creating ShopsCreEmp
      dispatch(actions.createShopsCreEmp(ShopsCreEmp)).then(() => onHide());
    } else {
      // server request for updating ShopsCreEmp
      dispatch(actions.updateShopsCreEmp(ShopsCreEmp)).then(() => onHide());
    }
  };
  return (
    <div style={{ display: show ? 'block' : 'none' }}>

      <ShopsCreEmpEditForm
        saveShopsCreEmp={saveShopsCreEmp}
        actionsLoading={actionsLoading}
        ShopsCreEmp={ShopsCreEmpForEdit || ShopsCreEmpsUIProps.initShopsCreEmp}
        onHide={onHide}
        id={id}
      />
    </div>
   
  );
}
