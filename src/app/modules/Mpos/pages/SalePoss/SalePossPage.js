import React from "react";
import { Route } from "react-router-dom";
import { SalePossLoadingDialog } from "./SalePoss-loading-dialog/SalePossLoadingDialog";
import { SalePosEditDialog } from "./SalePos-edit-dialog/SalePosEditDialog";
import { SalePosEditPage } from "./SalePos-edit-page/SalePosEditDialog";
import { SalePosDeleteDialog } from "./SalePos-delete-dialog/SalePosDeleteDialog";
import { SalePossDeleteDialog } from "./SalePoss-delete-dialog/SalePossDeleteDialog";
import { SalePossFetchDialog } from "./SalePoss-fetch-dialog/SalePossFetchDialog";
import { SalePossUpdateStateDialog } from "./SalePoss-update-status-dialog/SalePossUpdateStateDialog";
import { SalePossUIProvider } from "./SalePossUIContext";
import { SalePossCard } from "./SalePossCard";
import {store} from './Store';
import { Card } from "react-bootstrap";

export function SalePossPage({ history }) {
  const pages =
  "/" +
  history.location.pathname.split("/")[1] +
  "/" +
  history.location.pathname.split("/")[2]+
  "/" +
  history.location.pathname.split("/")[3];

  const SalePossUIEvents = {
    newShopsPageCreshopButtonClick: () => {
      store.dispatch({type:"pagehistory",value:1})
      history.push(`${pages}/pagenew`);
    },
    newSalePosButtonClick: () => {
      store.dispatch({type:"pagehistory",value:2})
      history.push(`${pages}/new`);
    },
    openEditSalePosDialog: (id) => {
      store.dispatch({type:"pagehistory",value:3})
      history.push(`${pages}/${id}/edit`);
    },
    openDeleteSalePosDialog: (id) => {
      store.dispatch({type:"pagehistory",value:4})
      history.push(`${pages}/${id}/delete`);
    },
    openDeleteSalePossDialog: () => {
      store.dispatch({type:"pagehistory",value:5})
      history.push(`${pages}/deleteSalePoss`);
    },
    openFetchSalePossDialog: () => {
      store.dispatch({type:"pagehistory",value:6})
      history.push(`${pages}/fetch`);
    },
    openUpdateSalePossStatusDialog: () => {
      store.dispatch({type:"pagehistory",value:7})
      history.push(`${pages}/updateStatus`);
    }
  }

  return (
    <SalePossUIProvider SalePossUIEvents={SalePossUIEvents}>
      <SalePossLoadingDialog />
      <Route path={`${pages}/pagenew`}>
        {({ history, match }) => (
          <SalePosEditPage
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
          <SalePosEditDialog
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
          <SalePosEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              store.dispatch({type:"pagehistory",value:0})
              history.push(`${pages}`);
            }}
          />
        )}
      </Route>
      <Route path={`${pages}/deleteSalePoss`}>
        {({ history, match }) => (
          <SalePossDeleteDialog
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
          <SalePosDeleteDialog
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
          <SalePossFetchDialog
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
          <SalePossUpdateStateDialog
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
        <SalePossCard/>
      </span>
    </SalePossUIProvider>
  );
}
