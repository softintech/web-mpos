import React from "react";
import { Route } from "react-router-dom";
import { SaleProductsLoadingDialog } from "./SaleProducts-loading-dialog/SaleProductsLoadingDialog";
import { SaleProductEditDialog } from "./SaleProduct-edit-dialog/SaleProductEditDialog";
import { SaleProductEditPage } from "./SaleProduct-edit-page/SaleProductEditDialog";
import { SaleProductDeleteDialog } from "./SaleProduct-delete-dialog/SaleProductDeleteDialog";
import { SaleProductsDeleteDialog } from "./SaleProducts-delete-dialog/SaleProductsDeleteDialog";
import { SaleProductsFetchDialog } from "./SaleProducts-fetch-dialog/SaleProductsFetchDialog";
import { SaleProductsUpdateStateDialog } from "./SaleProducts-update-status-dialog/SaleProductsUpdateStateDialog";
import { SaleProductsUIProvider } from "./SaleProductsUIContext";
import { SaleProductsCard } from "./SaleProductsCard";
import {store} from './Store';
import { Card } from "react-bootstrap";

export function SaleProductsPage({ history }) {
  const pages =
  "/" +
  history.location.pathname.split("/")[1] +
  "/" +
  history.location.pathname.split("/")[2]+
  "/" +
  history.location.pathname.split("/")[3];

  const SaleProductsUIEvents = {
    newShopsPageCreshopButtonClick: () => {
      store.dispatch({type:"pagehistory",value:1})
      history.push(`${pages}/pagenew`);
    },
    newSaleProductButtonClick: () => {
      store.dispatch({type:"pagehistory",value:2})
      history.push(`${pages}/new`);
    },
    openEditSaleProductDialog: (id) => {
      store.dispatch({type:"pagehistory",value:3})
      history.push(`${pages}/${id}/edit`);
    },
    openDeleteSaleProductDialog: (id) => {
      store.dispatch({type:"pagehistory",value:4})
      history.push(`${pages}/${id}/delete`);
    },
    openDeleteSaleProductsDialog: () => {
      store.dispatch({type:"pagehistory",value:5})
      history.push(`${pages}/deleteSaleProducts`);
    },
    openFetchSaleProductsDialog: () => {
      store.dispatch({type:"pagehistory",value:6})
      history.push(`${pages}/fetch`);
    },
    openUpdateSaleProductsStatusDialog: () => {
      store.dispatch({type:"pagehistory",value:7})
      history.push(`${pages}/updateStatus`);
    }
  }

  return (
    <SaleProductsUIProvider SaleProductsUIEvents={SaleProductsUIEvents}>
      <SaleProductsLoadingDialog />
      <Route path={`${pages}/pagenew`}>
        {({ history, match }) => (
          <SaleProductEditPage
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
          <SaleProductEditDialog
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
          <SaleProductEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              store.dispatch({type:"pagehistory",value:0})
              history.push(`${pages}`);
            }}
          />
        )}
      </Route>
      <Route path={`${pages}/deleteSaleProducts`}>
        {({ history, match }) => (
          <SaleProductsDeleteDialog
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
          <SaleProductDeleteDialog
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
          <SaleProductsFetchDialog
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
          <SaleProductsUpdateStateDialog
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
        <SaleProductsCard/>
      </span>
    </SaleProductsUIProvider>
  );
}
