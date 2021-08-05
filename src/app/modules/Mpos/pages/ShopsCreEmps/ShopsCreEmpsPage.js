import React from "react";
import { Route } from "react-router-dom";
import { ShopsCreEmpsLoadingDialog } from "./ShopsCreEmps-loading-dialog/ShopsCreEmpsLoadingDialog";
import { ShopsCreEmpEditDialog } from "./ShopsCreEmp-edit-dialog/ShopsCreEmpEditDialog";
import { ShopsCreEmpEditPage } from "./ShopsCreEmp-edit-page/ShopsCreEmpEditDialog";
import { ShopsCreEmpDeleteDialog } from "./ShopsCreEmp-delete-dialog/ShopsCreEmpDeleteDialog";
import { ShopsCreEmpsDeleteDialog } from "./ShopsCreEmps-delete-dialog/ShopsCreEmpsDeleteDialog";
import { ShopsCreEmpsFetchDialog } from "./ShopsCreEmps-fetch-dialog/ShopsCreEmpsFetchDialog";
import { ShopsCreEmpsUpdateStateDialog } from "./ShopsCreEmps-update-status-dialog/ShopsCreEmpsUpdateStateDialog";
import { ShopsCreEmpsUIProvider } from "./ShopsCreEmpsUIContext";
import { ShopsCreEmpsCard } from "./ShopsCreEmpsCard";
import {store} from './Store';
import { Card } from "react-bootstrap";

export function ShopsCreEmpsPage({ history }) {
  const pages =
  "/" +
  history.location.pathname.split("/")[1] +
  "/" +
  history.location.pathname.split("/")[2]+
  "/" +
  history.location.pathname.split("/")[3];

  const ShopsCreEmpsUIEvents = {
    newShopsPageCreshopButtonClick: () => {
      store.dispatch({type:"pagehistory",value:1})
      history.push(`${pages}/pagenew`);
    },
    newShopsCreEmpButtonClick: () => {
      store.dispatch({type:"pagehistory",value:2})
      history.push(`${pages}/new`);
    },
    openEditShopsCreEmpDialog: (id) => {
      store.dispatch({type:"pagehistory",value:3})
      history.push(`${pages}/${id}/edit`);
    },
    openDeleteShopsCreEmpDialog: (id) => {
      store.dispatch({type:"pagehistory",value:4})
      history.push(`${pages}/${id}/delete`);
    },
    openDeleteShopsCreEmpsDialog: () => {
      store.dispatch({type:"pagehistory",value:5})
      history.push(`${pages}/deleteShopsCreEmps`);
    },
    openFetchShopsCreEmpsDialog: () => {
      store.dispatch({type:"pagehistory",value:6})
      history.push(`${pages}/fetch`);
    },
    openUpdateShopsCreEmpsStatusDialog: () => {
      store.dispatch({type:"pagehistory",value:7})
      history.push(`${pages}/updateStatus`);
    }
  }

  return (
    <ShopsCreEmpsUIProvider ShopsCreEmpsUIEvents={ShopsCreEmpsUIEvents}>
      <ShopsCreEmpsLoadingDialog />
      <Route path={`${pages}/pagenew`}>
        {({ history, match }) => (
          <ShopsCreEmpEditPage
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
          <ShopsCreEmpEditDialog
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
          <ShopsCreEmpEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              store.dispatch({type:"pagehistory",value:0})
              history.push(`${pages}`);
            }}
          />
        )}
      </Route>
      <Route path={`${pages}/deleteShopsCreEmps`}>
        {({ history, match }) => (
          <ShopsCreEmpsDeleteDialog
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
          <ShopsCreEmpDeleteDialog
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
          <ShopsCreEmpsFetchDialog
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
          <ShopsCreEmpsUpdateStateDialog
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
        <ShopsCreEmpsCard/>
      </span>
    </ShopsCreEmpsUIProvider>
  );
}
