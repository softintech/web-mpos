import React from "react";
import { Route } from "react-router-dom";
import { ShopsCreshopsLoadingDialog } from "./ShopsCreshops-loading-dialog/ShopsCreshopsLoadingDialog";
import { ShopsCreshopEditDialog } from "./ShopsCreshop-edit-dialog/ShopsCreshopEditDialog";
import { ShopsCreshopEditPage } from "./ShopsCreshop-edit-page/ShopsCreshopEditDialog";
import { ShopsCreshopDeleteDialog } from "./ShopsCreshop-delete-dialog/ShopsCreshopDeleteDialog";
import { ShopsCreshopsDeleteDialog } from "./ShopsCreshops-delete-dialog/ShopsCreshopsDeleteDialog";
import { ShopsCreshopsFetchDialog } from "./ShopsCreshops-fetch-dialog/ShopsCreshopsFetchDialog";
import { ShopsCreshopsUpdateStateDialog } from "./ShopsCreshops-update-status-dialog/ShopsCreshopsUpdateStateDialog";
import { ShopsCreshopsUIProvider } from "./ShopsCreshopsUIContext";
import { ShopsCreshopsCard } from "./ShopsCreshopsCard";
import {store} from './Store';
import { Card } from "react-bootstrap";

export function ShopsCreshopsPage({ history }) {
  const pages =
  "/" +
  history.location.pathname.split("/")[1] +
  "/" +
  history.location.pathname.split("/")[2]+
  "/" +
  history.location.pathname.split("/")[3];

  const ShopsCreshopsUIEvents = {
    newShopsPageCreshopButtonClick: () => {
      store.dispatch({type:"pagehistory",value:1})
      history.push(`${pages}/pagenew`);
    },
    newShopsCreshopButtonClick: () => {
      store.dispatch({type:"pagehistory",value:2})
      history.push(`${pages}/new`);
    },
    openEditShopsCreshopDialog: (id) => {
      store.dispatch({type:"pagehistory",value:3})
      history.push(`${pages}/${id}/edit`);
    },
    openDeleteShopsCreshopDialog: (id) => {
      store.dispatch({type:"pagehistory",value:4})
      history.push(`${pages}/${id}/delete`);
    },
    openDeleteShopsCreshopsDialog: () => {
      store.dispatch({type:"pagehistory",value:5})
      history.push(`${pages}/deleteShopsCreshops`);
    },
    openFetchShopsCreshopsDialog: () => {
      store.dispatch({type:"pagehistory",value:6})
      history.push(`${pages}/fetch`);
    },
    openUpdateShopsCreshopsStatusDialog: () => {
      store.dispatch({type:"pagehistory",value:7})
      history.push(`${pages}/updateStatus`);
    }
  }

  return (
    <ShopsCreshopsUIProvider ShopsCreshopsUIEvents={ShopsCreshopsUIEvents}>
      <ShopsCreshopsLoadingDialog />
      <Route path={`${pages}/pagenew`}>
        {({ history, match }) => (
          <ShopsCreshopEditPage
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
          <ShopsCreshopEditDialog
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
          <ShopsCreshopEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              store.dispatch({type:"pagehistory",value:0})
              history.push(`${pages}`);
            }}
          />
        )}
      </Route>
      <Route path={`${pages}/deleteShopsCreshops`}>
        {({ history, match }) => (
          <ShopsCreshopsDeleteDialog
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
          <ShopsCreshopDeleteDialog
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
          <ShopsCreshopsFetchDialog
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
          <ShopsCreshopsUpdateStateDialog
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
        <ShopsCreshopsCard/>
      </span>
    </ShopsCreshopsUIProvider>
  );
}
