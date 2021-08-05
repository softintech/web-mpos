import React from "react";
import { Route } from "react-router-dom";
import { StockCountsLoadingDialog } from "./StockCounts-loading-dialog/StockCountsLoadingDialog";
import { StockCountEditDialog } from "./StockCount-edit-dialog/StockCountEditDialog";
import { StockCountEditPage } from "./StockCount-edit-page/StockCountEditDialog";
import { StockCountDeleteDialog } from "./StockCount-delete-dialog/StockCountDeleteDialog";
import { StockCountsDeleteDialog } from "./StockCounts-delete-dialog/StockCountsDeleteDialog";
import { StockCountsFetchDialog } from "./StockCounts-fetch-dialog/StockCountsFetchDialog";
import { StockCountsUpdateStateDialog } from "./StockCounts-update-status-dialog/StockCountsUpdateStateDialog";
import { StockCountsUIProvider } from "./StockCountsUIContext";
import { StockCountsCard } from "./StockCountsCard";
import {store} from './Store';
import { Card } from "react-bootstrap";

export function StockCountsPage({ history }) {
  const pages =
  "/" +
  history.location.pathname.split("/")[1] +
  "/" +
  history.location.pathname.split("/")[2]+
  "/" +
  history.location.pathname.split("/")[3];

  const StockCountsUIEvents = {
    newShopsPageCreshopButtonClick: () => {
      store.dispatch({type:"pagehistory",value:1})
      history.push(`${pages}/pagenew`);
    },
    newStockCountButtonClick: () => {
      store.dispatch({type:"pagehistory",value:2})
      history.push(`${pages}/new`);
    },
    openEditStockCountDialog: (id) => {
      store.dispatch({type:"pagehistory",value:3})
      history.push(`${pages}/${id}/edit`);
    },
    openDeleteStockCountDialog: (id) => {
      store.dispatch({type:"pagehistory",value:4})
      history.push(`${pages}/${id}/delete`);
    },
    openDeleteStockCountsDialog: () => {
      store.dispatch({type:"pagehistory",value:5})
      history.push(`${pages}/deleteStockCounts`);
    },
    openFetchStockCountsDialog: () => {
      store.dispatch({type:"pagehistory",value:6})
      history.push(`${pages}/fetch`);
    },
    openUpdateStockCountsStatusDialog: () => {
      store.dispatch({type:"pagehistory",value:7})
      history.push(`${pages}/updateStatus`);
    }
  }

  return (
    <StockCountsUIProvider StockCountsUIEvents={StockCountsUIEvents}>
      <StockCountsLoadingDialog />
      <Route path={`${pages}/pagenew`}>
        {({ history, match }) => (
          <StockCountEditPage
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
          <StockCountEditDialog
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
          <StockCountEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              store.dispatch({type:"pagehistory",value:0})
              history.push(`${pages}`);
            }}
          />
        )}
      </Route>
      <Route path={`${pages}/deleteStockCounts`}>
        {({ history, match }) => (
          <StockCountsDeleteDialog
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
          <StockCountDeleteDialog
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
          <StockCountsFetchDialog
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
          <StockCountsUpdateStateDialog
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
        <StockCountsCard/>
      </span>
    </StockCountsUIProvider>
  );
}
