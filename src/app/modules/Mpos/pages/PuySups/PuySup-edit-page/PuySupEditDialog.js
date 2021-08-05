import React, { useEffect, useMemo } from "react";
import { Card, Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/PuySups/PuySupsActions";
import { PuySupEditDialogHeader } from "./PuySupEditDialogHeader";
import { PuySupEditForm } from "./PuySupEditForm";
import { usePuySupsUIContext } from "../PuySupsUIContext";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";

export function PuySupEditPage({ id, show, onHide }) {
  // PuySups UI Context
  const PuySupsUIContext = usePuySupsUIContext();
  const PuySupsUIProps = useMemo(() => {
    return {
      initPuySup: PuySupsUIContext.initPuySup,
    };
  }, [PuySupsUIContext]);

  // PuySups Redux state
  const dispatch = useDispatch();
  const { actionsLoading, PuySupForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.PuySups.actionsLoading,
      PuySupForEdit: state.PuySups.PuySupForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting PuySup by id
    dispatch(actions.fetchPuySup(id));
  }, [id, dispatch]);

  // server request for saving PuySup
  const savePuySup = (PuySup) => {
    if (!id) {
      // server request for creating PuySup
      dispatch(actions.createPuySup(PuySup)).then(() => onHide());
    } else {
      // server request for updating PuySup
      dispatch(actions.updatePuySup(PuySup)).then(() => onHide());
    }
  };
  return (
    <div style={{ display: show ? 'block' : 'none' }}>

      <PuySupEditForm
        savePuySup={savePuySup}
        actionsLoading={actionsLoading}
        PuySup={PuySupForEdit || PuySupsUIProps.initPuySup}
        onHide={onHide}
        id={id}
      />
    </div>
   
  );
}
