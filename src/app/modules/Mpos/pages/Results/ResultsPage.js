import React from "react";
import { Route } from "react-router-dom";
import { ResultsLoadingDialog } from "./Results-loading-dialog/ResultsLoadingDialog";
import { ResultEditDialog } from "./Result-edit-dialog/ResultEditDialog";
import { ResultEditPage } from "./Result-edit-page/ResultEditDialog";
import { ResultDeleteDialog } from "./Result-delete-dialog/ResultDeleteDialog";
import { ResultsDeleteDialog } from "./Results-delete-dialog/ResultsDeleteDialog";
import { ResultsFetchDialog } from "./Results-fetch-dialog/ResultsFetchDialog";
import { ResultsUpdateStateDialog } from "./Results-update-status-dialog/ResultsUpdateStateDialog";
import { ResultsUIProvider } from "./ResultsUIContext";
import { ResultsCard } from "./ResultsCard";
import {store} from './Store';
import { Card } from "react-bootstrap";

export function ResultsPage({ history }) {
  const pages =
  "/" +
  history.location.pathname.split("/")[1] +
  "/" +
  history.location.pathname.split("/")[2]+
  "/" +
  history.location.pathname.split("/")[3] == undefined ?'':history.location.pathname.split("/")[3];

  const ResultsUIEvents = {
    newShopsPageCreshopButtonClick: () => {
      store.dispatch({type:"pagehistory",value:1})
      history.push(`${pages}/pagenew`);
    },
    newResultButtonClick: () => {
      store.dispatch({type:"pagehistory",value:2})
      history.push(`${pages}/new`);
    },
    openEditResultDialog: (id) => {
      store.dispatch({type:"pagehistory",value:3})
      history.push(`${pages}/${id}/edit`);
    },
    openDeleteResultDialog: (id) => {
      store.dispatch({type:"pagehistory",value:4})
      history.push(`${pages}/${id}/delete`);
    },
    openDeleteResultsDialog: () => {
      store.dispatch({type:"pagehistory",value:5})
      history.push(`${pages}/deleteResults`);
    },
    openFetchResultsDialog: () => {
      store.dispatch({type:"pagehistory",value:6})
      history.push(`${pages}/fetch`);
    },
    openUpdateResultsStatusDialog: () => {
      store.dispatch({type:"pagehistory",value:7})
      history.push(`${pages}/updateStatus`);
    }
  }

  return (
    <ResultsUIProvider ResultsUIEvents={ResultsUIEvents}>
      <ResultsLoadingDialog />
      <Route path={`${pages}/pagenew`}>
        {({ history, match }) => (
          <ResultEditPage
            show={match != null}
            onHide={() => {
              store.dispatch({type:"pagehistory",value:0})
              history.push(`${pages}`);
            }}
          />
        )}
      </Route>
      <Route path={`${pages}/new`}>
        {({ history, match }) => (
          <ResultEditDialog
            show={match != null}
            onHide={() => {
              store.dispatch({type:"pagehistory",value:0})
              history.push(`${pages}`);
            }}
          />
        )}
      </Route>
      <Route path={`${pages}/:id/edit`}>
        {({ history, match }) => (
          <ResultEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              store.dispatch({type:"pagehistory",value:0})
              history.push(`${pages}`);
            }}
          />
        )}
      </Route>
      <Route path={`${pages}/deleteResults`}>
        {({ history, match }) => (
          <ResultsDeleteDialog
            show={match != null}
            onHide={() => {
              store.dispatch({type:"pagehistory",value:0})
              history.push(`${pages}`);
            }}
          />
        )}
      </Route>
      <Route path={`${pages}/:id/delete`}>
        {({ history, match }) => (
          <ResultDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              store.dispatch({type:"pagehistory",value:0})
              history.push(`${pages}`);
            }}
          />
        )}
      </Route>
      <Route path={`${pages}/fetch`}>
        {({ history, match }) => (
          <ResultsFetchDialog
            show={match != null}
            onHide={() => {
              store.dispatch({type:"pagehistory",value:0})
              history.push(`${pages}`);
            }}
          />
        )}
      </Route>
      <Route path={`${pages}/updateStatus`}>
        {({ history, match }) => (
          <ResultsUpdateStateDialog
            show={match != null}
            onHide={() => {
              store.dispatch({type:"pagehistory",value:0})
              history.push(`${pages}`);
            }}
          />
        )}
      </Route>
      <span
      style={{
        display:(store.getState().pagehistory == 0?'block':'none')
      }}>
        <ResultsCard/>
      </span>
    </ResultsUIProvider>
  );
}
