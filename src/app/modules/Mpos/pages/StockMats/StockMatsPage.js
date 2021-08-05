import React from "react";
import { Route } from "react-router-dom";
import { StockMatsLoadingDialog } from "./StockMats-loading-dialog/StockMatsLoadingDialog";
import { StockMatEditDialog } from "./StockMat-edit-dialog/StockMatEditDialog";
import { StockMatEditPage } from "./StockMat-edit-page/StockMatEditDialog";
import { StockMatDeleteDialog } from "./StockMat-delete-dialog/StockMatDeleteDialog";
import { StockMatsDeleteDialog } from "./StockMats-delete-dialog/StockMatsDeleteDialog";
import { StockMatsFetchDialog } from "./StockMats-fetch-dialog/StockMatsFetchDialog";
import { StockMatsUpdateStateDialog } from "./StockMats-update-status-dialog/StockMatsUpdateStateDialog";
import { StockMatsUIProvider } from "./StockMatsUIContext";
import { StockMatsCard } from "./StockMatsCard";
import {store} from './Store';
import { Card } from "react-bootstrap";

export function StockMatsPage({ history }) {
  const pages =
  "/" +
  history.location.pathname.split("/")[1] +
  "/" +
  history.location.pathname.split("/")[2]+
  "/" +
  history.location.pathname.split("/")[3];

  const StockMatsUIEvents = {
    newShopsPageCreshopButtonClick: () => {
      store.dispatch({type:"pagehistory",value:1})
      history.push(`${pages}/pagenew`);
    },
    newStockMatButtonClick: () => {
      store.dispatch({type:"pagehistory",value:2})
      history.push(`${pages}/new`);
    },
    openEditStockMatDialog: (id) => {
      store.dispatch({type:"pagehistory",value:3})
      history.push(`${pages}/${id}/edit`);
    },
    openDeleteStockMatDialog: (id) => {
      store.dispatch({type:"pagehistory",value:4})
      history.push(`${pages}/${id}/delete`);
    },
    openDeleteStockMatsDialog: () => {
      store.dispatch({type:"pagehistory",value:5})
      history.push(`${pages}/deleteStockMats`);
    },
    openFetchStockMatsDialog: () => {
      store.dispatch({type:"pagehistory",value:6})
      history.push(`${pages}/fetch`);
    },
    openUpdateStockMatsStatusDialog: () => {
      store.dispatch({type:"pagehistory",value:7})
      history.push(`${pages}/updateStatus`);
    }
  }

  return (
    <StockMatsUIProvider StockMatsUIEvents={StockMatsUIEvents}>
      <StockMatsLoadingDialog />
      <Route path={`${pages}/pagenew`}>
        {({ history, match }) => (
          <StockMatEditPage
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
          <StockMatEditDialog
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
          <StockMatEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              store.dispatch({type:"pagehistory",value:0})
              history.push(`${pages}`);
            }}
          />
        )}
      </Route>
      <Route path={`${pages}/deleteStockMats`}>
        {({ history, match }) => (
          <StockMatsDeleteDialog
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
          <StockMatDeleteDialog
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
          <StockMatsFetchDialog
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
          <StockMatsUpdateStateDialog
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
        <StockMatsCard/>
      </span>
    </StockMatsUIProvider>
  );
}
