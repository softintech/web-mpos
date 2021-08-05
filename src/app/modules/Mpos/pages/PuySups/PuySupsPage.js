import React from "react";
import { Route } from "react-router-dom";
import { PuySupsLoadingDialog } from "./PuySups-loading-dialog/PuySupsLoadingDialog";
import { PuySupEditDialog } from "./PuySup-edit-dialog/PuySupEditDialog";
import { PuySupEditPage } from "./PuySup-edit-page/PuySupEditDialog";
import { PuySupDeleteDialog } from "./PuySup-delete-dialog/PuySupDeleteDialog";
import { PuySupsDeleteDialog } from "./PuySups-delete-dialog/PuySupsDeleteDialog";
import { PuySupsFetchDialog } from "./PuySups-fetch-dialog/PuySupsFetchDialog";
import { PuySupsUpdateStateDialog } from "./PuySups-update-status-dialog/PuySupsUpdateStateDialog";
import { PuySupsUIProvider } from "./PuySupsUIContext";
import { PuySupsCard } from "./PuySupsCard";
import {store} from './Store';
import { Card } from "react-bootstrap";

export function PuySupsPage({ history }) {
  const pages =
  "/" +
  history.location.pathname.split("/")[1] +
  "/" +
  history.location.pathname.split("/")[2]+
  "/" +
  history.location.pathname.split("/")[3];

  const PuySupsUIEvents = {
    newShopsPageCreshopButtonClick: () => {
      store.dispatch({type:"pagehistory",value:1})
      history.push(`${pages}/pagenew`);
    },
    newPuySupButtonClick: () => {
      store.dispatch({type:"pagehistory",value:2})
      history.push(`${pages}/new`);
    },
    openEditPuySupDialog: (id) => {
      store.dispatch({type:"pagehistory",value:3})
      history.push(`${pages}/${id}/edit`);
    },
    openDeletePuySupDialog: (id) => {
      store.dispatch({type:"pagehistory",value:4})
      history.push(`${pages}/${id}/delete`);
    },
    openDeletePuySupsDialog: () => {
      store.dispatch({type:"pagehistory",value:5})
      history.push(`${pages}/deletePuySups`);
    },
    openFetchPuySupsDialog: () => {
      store.dispatch({type:"pagehistory",value:6})
      history.push(`${pages}/fetch`);
    },
    openUpdatePuySupsStatusDialog: () => {
      store.dispatch({type:"pagehistory",value:7})
      history.push(`${pages}/updateStatus`);
    }
  }

  return (
    <PuySupsUIProvider PuySupsUIEvents={PuySupsUIEvents}>
      <PuySupsLoadingDialog />
      <Route path={`${pages}/pagenew`}>
        {({ history, match }) => (
          <PuySupEditPage
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
          <PuySupEditDialog
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
          <PuySupEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              store.dispatch({type:"pagehistory",value:0})
              history.push(`${pages}`);
            }}
          />
        )}
      </Route>
      <Route path={`${pages}/deletePuySups`}>
        {({ history, match }) => (
          <PuySupsDeleteDialog
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
          <PuySupDeleteDialog
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
          <PuySupsFetchDialog
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
          <PuySupsUpdateStateDialog
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
        <PuySupsCard/>
      </span>
    </PuySupsUIProvider>
  );
}
