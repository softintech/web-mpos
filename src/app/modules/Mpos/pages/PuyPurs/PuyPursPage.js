import React from "react";
import { Route } from "react-router-dom";
import { PuyPursLoadingDialog } from "./PuyPurs-loading-dialog/PuyPursLoadingDialog";
import { PuyPurEditDialog } from "./PuyPur-edit-dialog/PuyPurEditDialog";
import { PuyPurEditPage } from "./PuyPur-edit-page/PuyPurEditDialog";
import { PuyPurDeleteDialog } from "./PuyPur-delete-dialog/PuyPurDeleteDialog";
import { PuyPursDeleteDialog } from "./PuyPurs-delete-dialog/PuyPursDeleteDialog";
import { PuyPursFetchDialog } from "./PuyPurs-fetch-dialog/PuyPursFetchDialog";
import { PuyPursUpdateStateDialog } from "./PuyPurs-update-status-dialog/PuyPursUpdateStateDialog";
import { PuyPursUIProvider } from "./PuyPursUIContext";
import { PuyPursCard } from "./PuyPursCard";
import {store} from './Store';
import { Card } from "react-bootstrap";

export function PuyPursPage({ history }) {
  const pages =
  "/" +
  history.location.pathname.split("/")[1] +
  "/" +
  history.location.pathname.split("/")[2]+
  "/" +
  history.location.pathname.split("/")[3];

  const PuyPursUIEvents = {
    newShopsPageCreshopButtonClick: () => {
      store.dispatch({type:"pagehistory",value:1})
      history.push(`${pages}/pagenew`);
    },
    newPuyPurButtonClick: () => {
      store.dispatch({type:"pagehistory",value:2})
      history.push(`${pages}/new`);
    },
    openEditPuyPurDialog: (id) => {
      store.dispatch({type:"pagehistory",value:3})
      history.push(`${pages}/${id}/edit`);
    },
    openDeletePuyPurDialog: (id) => {
      store.dispatch({type:"pagehistory",value:4})
      history.push(`${pages}/${id}/delete`);
    },
    openDeletePuyPursDialog: () => {
      store.dispatch({type:"pagehistory",value:5})
      history.push(`${pages}/deletePuyPurs`);
    },
    openFetchPuyPursDialog: () => {
      store.dispatch({type:"pagehistory",value:6})
      history.push(`${pages}/fetch`);
    },
    openUpdatePuyPursStatusDialog: () => {
      store.dispatch({type:"pagehistory",value:7})
      history.push(`${pages}/updateStatus`);
    }
  }

  return (
    <PuyPursUIProvider PuyPursUIEvents={PuyPursUIEvents}>
      <PuyPursLoadingDialog />
      <Route path={`${pages}/pagenew`}>
        {({ history, match }) => (
          <PuyPurEditPage
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
          <PuyPurEditDialog
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
          <PuyPurEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              store.dispatch({type:"pagehistory",value:0})
              history.push(`${pages}`);
            }}
          />
        )}
      </Route>
      <Route path={`${pages}/deletePuyPurs`}>
        {({ history, match }) => (
          <PuyPursDeleteDialog
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
          <PuyPurDeleteDialog
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
          <PuyPursFetchDialog
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
          <PuyPursUpdateStateDialog
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
        <PuyPursCard/>
      </span>
    </PuyPursUIProvider>
  );
}
