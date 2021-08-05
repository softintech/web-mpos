import React from "react";
import { Route } from "react-router-dom";
import { ServiceAlsLoadingDialog } from "./ServiceAls-loading-dialog/ServiceAlsLoadingDialog";
import { ServiceAlEditDialog } from "./ServiceAl-edit-dialog/ServiceAlEditDialog";
import { ServiceAlEditPage } from "./ServiceAl-edit-page/ServiceAlEditDialog";
import { ServiceAlDeleteDialog } from "./ServiceAl-delete-dialog/ServiceAlDeleteDialog";
import { ServiceAlsDeleteDialog } from "./ServiceAls-delete-dialog/ServiceAlsDeleteDialog";
import { ServiceAlsFetchDialog } from "./ServiceAls-fetch-dialog/ServiceAlsFetchDialog";
import { ServiceAlsUpdateStateDialog } from "./ServiceAls-update-status-dialog/ServiceAlsUpdateStateDialog";
import { ServiceAlsUIProvider } from "./ServiceAlsUIContext";
import { ServiceAlsCard } from "./ServiceAlsCard";
import {store} from './Store';
import { Card } from "react-bootstrap";

export function ServiceAlsPage({ history }) {
  const pages =
  "/" +
  history.location.pathname.split("/")[1] +
  "/" +
  history.location.pathname.split("/")[2]+
  "/" +
  history.location.pathname.split("/")[3];

  const ServiceAlsUIEvents = {
    newShopsPageCreshopButtonClick: () => {
      store.dispatch({type:"pagehistory",value:1})
      history.push(`${pages}/pagenew`);
    },
    newServiceAlButtonClick: () => {
      store.dispatch({type:"pagehistory",value:2})
      history.push(`${pages}/new`);
    },
    openEditServiceAlDialog: (id) => {
      store.dispatch({type:"pagehistory",value:3})
      history.push(`${pages}/${id}/edit`);
    },
    openDeleteServiceAlDialog: (id) => {
      store.dispatch({type:"pagehistory",value:4})
      history.push(`${pages}/${id}/delete`);
    },
    openDeleteServiceAlsDialog: () => {
      store.dispatch({type:"pagehistory",value:5})
      history.push(`${pages}/deleteServiceAls`);
    },
    openFetchServiceAlsDialog: () => {
      store.dispatch({type:"pagehistory",value:6})
      history.push(`${pages}/fetch`);
    },
    openUpdateServiceAlsStatusDialog: () => {
      store.dispatch({type:"pagehistory",value:7})
      history.push(`${pages}/updateStatus`);
    }
  }

  return (
    <ServiceAlsUIProvider ServiceAlsUIEvents={ServiceAlsUIEvents}>
      <ServiceAlsLoadingDialog />
      <Route path={`${pages}/pagenew`}>
        {({ history, match }) => (
          <ServiceAlEditPage
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
          <ServiceAlEditDialog
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
          <ServiceAlEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              store.dispatch({type:"pagehistory",value:0})
              history.push(`${pages}`);
            }}
          />
        )}
      </Route>
      <Route path={`${pages}/deleteServiceAls`}>
        {({ history, match }) => (
          <ServiceAlsDeleteDialog
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
          <ServiceAlDeleteDialog
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
          <ServiceAlsFetchDialog
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
          <ServiceAlsUpdateStateDialog
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
        <ServiceAlsCard/>
      </span>
    </ServiceAlsUIProvider>
  );
}
