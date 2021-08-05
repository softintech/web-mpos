import React from "react";
import { Route } from "react-router-dom";
import { ServiceContractsLoadingDialog } from "./ServiceContracts-loading-dialog/ServiceContractsLoadingDialog";
import { ServiceContractEditDialog } from "./ServiceContract-edit-dialog/ServiceContractEditDialog";
import { ServiceContractEditPage } from "./ServiceContract-edit-page/ServiceContractEditDialog";
import { ServiceContractDeleteDialog } from "./ServiceContract-delete-dialog/ServiceContractDeleteDialog";
import { ServiceContractsDeleteDialog } from "./ServiceContracts-delete-dialog/ServiceContractsDeleteDialog";
import { ServiceContractsFetchDialog } from "./ServiceContracts-fetch-dialog/ServiceContractsFetchDialog";
import { ServiceContractsUpdateStateDialog } from "./ServiceContracts-update-status-dialog/ServiceContractsUpdateStateDialog";
import { ServiceContractsUIProvider } from "./ServiceContractsUIContext";
import { ServiceContractsCard } from "./ServiceContractsCard";
import {store} from './Store';
import { Card } from "react-bootstrap";

export function ServiceContractsPage({ history }) {
  const pages =
  "/" +
  history.location.pathname.split("/")[1] +
  "/" +
  history.location.pathname.split("/")[2]+
  "/" +
  history.location.pathname.split("/")[3];

  const ServiceContractsUIEvents = {
    newShopsPageCreshopButtonClick: () => {
      store.dispatch({type:"pagehistory",value:1})
      history.push(`${pages}/pagenew`);
    },
    newServiceContractButtonClick: () => {
      store.dispatch({type:"pagehistory",value:2})
      history.push(`${pages}/new`);
    },
    openEditServiceContractDialog: (id) => {
      store.dispatch({type:"pagehistory",value:3})
      history.push(`${pages}/${id}/edit`);
    },
    openDeleteServiceContractDialog: (id) => {
      store.dispatch({type:"pagehistory",value:4})
      history.push(`${pages}/${id}/delete`);
    },
    openDeleteServiceContractsDialog: () => {
      store.dispatch({type:"pagehistory",value:5})
      history.push(`${pages}/deleteServiceContracts`);
    },
    openFetchServiceContractsDialog: () => {
      store.dispatch({type:"pagehistory",value:6})
      history.push(`${pages}/fetch`);
    },
    openUpdateServiceContractsStatusDialog: () => {
      store.dispatch({type:"pagehistory",value:7})
      history.push(`${pages}/updateStatus`);
    }
  }

  return (
    <ServiceContractsUIProvider ServiceContractsUIEvents={ServiceContractsUIEvents}>
      <ServiceContractsLoadingDialog />
      <Route path={`${pages}/pagenew`}>
        {({ history, match }) => (
          <ServiceContractEditPage
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
          <ServiceContractEditDialog
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
          <ServiceContractEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              store.dispatch({type:"pagehistory",value:0})
              history.push(`${pages}`);
            }}
          />
        )}
      </Route>
      <Route path={`${pages}/deleteServiceContracts`}>
        {({ history, match }) => (
          <ServiceContractsDeleteDialog
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
          <ServiceContractDeleteDialog
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
          <ServiceContractsFetchDialog
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
          <ServiceContractsUpdateStateDialog
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
        <ServiceContractsCard/>
      </span>
    </ServiceContractsUIProvider>
  );
}
