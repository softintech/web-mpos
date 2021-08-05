import React from "react";
import { Route } from "react-router-dom";
import { PuyMatsLoadingDialog } from "./PuyMats-loading-dialog/PuyMatsLoadingDialog";
import { PuyMatEditDialog } from "./PuyMat-edit-dialog/PuyMatEditDialog";
import { PuyMatEditPage } from "./PuyMat-edit-page/PuyMatEditDialog";
import { PuyMatDeleteDialog } from "./PuyMat-delete-dialog/PuyMatDeleteDialog";
import { PuyMatsDeleteDialog } from "./PuyMats-delete-dialog/PuyMatsDeleteDialog";
import { PuyMatsFetchDialog } from "./PuyMats-fetch-dialog/PuyMatsFetchDialog";
import { PuyMatsUpdateStateDialog } from "./PuyMats-update-status-dialog/PuyMatsUpdateStateDialog";
import { PuyMatsUIProvider } from "./PuyMatsUIContext";
import { PuyMatsCard } from "./PuyMatsCard";
import {store} from './Store';
import { Card } from "react-bootstrap";

export function PuyMatsPage({ history }) {
  const pages =
  "/" +
  history.location.pathname.split("/")[1] +
  "/" +
  history.location.pathname.split("/")[2]+
  "/" +
  history.location.pathname.split("/")[3];

  const PuyMatsUIEvents = {
    newShopsPageCreshopButtonClick: () => {
      store.dispatch({type:"pagehistory",value:1})
      history.push(`${pages}/pagenew`);
    },
    newPuyMatButtonClick: () => {
      store.dispatch({type:"pagehistory",value:2})
      history.push(`${pages}/new`);
    },
    openEditPuyMatDialog: (id) => {
      store.dispatch({type:"pagehistory",value:3})
      history.push(`${pages}/${id}/edit`);
    },
    openDeletePuyMatDialog: (id) => {
      store.dispatch({type:"pagehistory",value:4})
      history.push(`${pages}/${id}/delete`);
    },
    openDeletePuyMatsDialog: () => {
      store.dispatch({type:"pagehistory",value:5})
      history.push(`${pages}/deletePuyMats`);
    },
    openFetchPuyMatsDialog: () => {
      store.dispatch({type:"pagehistory",value:6})
      history.push(`${pages}/fetch`);
    },
    openUpdatePuyMatsStatusDialog: () => {
      store.dispatch({type:"pagehistory",value:7})
      history.push(`${pages}/updateStatus`);
    }
  }

  return (
    <PuyMatsUIProvider PuyMatsUIEvents={PuyMatsUIEvents}>
      <PuyMatsLoadingDialog />
      <Route path={`${pages}/pagenew`}>
        {({ history, match }) => (
          <PuyMatEditPage
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
          <PuyMatEditDialog
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
          <PuyMatEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              store.dispatch({type:"pagehistory",value:0})
              history.push(`${pages}`);
            }}
          />
        )}
      </Route>
      <Route path={`${pages}/deletePuyMats`}>
        {({ history, match }) => (
          <PuyMatsDeleteDialog
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
          <PuyMatDeleteDialog
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
          <PuyMatsFetchDialog
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
          <PuyMatsUpdateStateDialog
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
        <PuyMatsCard/>
      </span>
    </PuyMatsUIProvider>
  );
}
