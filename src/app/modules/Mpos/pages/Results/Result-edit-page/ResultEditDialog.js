import React, { useEffect, useMemo } from "react";
import { Card, Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/Results/ResultsActions";
import { ResultEditDialogHeader } from "./ResultEditDialogHeader";
import { ResultEditForm } from "./ResultEditForm";
import { useResultsUIContext } from "../ResultsUIContext";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";

export function ResultEditPage({ id, show, onHide }) {
  // Results UI Context
  const ResultsUIContext = useResultsUIContext();
  const ResultsUIProps = useMemo(() => {
    return {
      initResult: ResultsUIContext.initResult,
    };
  }, [ResultsUIContext]);

  // Results Redux state
  const dispatch = useDispatch();
  const { actionsLoading, ResultForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.Results.actionsLoading,
      ResultForEdit: state.Results.ResultForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Result by id
    dispatch(actions.fetchResult(id));
  }, [id, dispatch]);

  // server request for saving Result
  const saveResult = (Result) => {
    if (!id) {
      // server request for creating Result
      dispatch(actions.createResult(Result)).then(() => onHide());
    } else {
      // server request for updating Result
      dispatch(actions.updateResult(Result)).then(() => onHide());
    }
  };
  return (
    <div style={{ display: show ? 'block' : 'none' }}>

      <ResultEditForm
        saveResult={saveResult}
        actionsLoading={actionsLoading}
        Result={ResultForEdit || ResultsUIProps.initResult}
        onHide={onHide}
        id={id}
      />
    </div>
   
  );
}
