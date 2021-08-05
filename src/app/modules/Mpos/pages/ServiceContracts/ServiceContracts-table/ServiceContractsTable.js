// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/ServiceContracts/ServiceContractsActions";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../ServiceContractsUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useServiceContractsUIContext } from "../ServiceContractsUIContext";

export function ServiceContractsTable() {
  // ServiceContracts UI Context
  const ServiceContractsUIContext = useServiceContractsUIContext();
  const ServiceContractsUIProps = useMemo(() => {
    return {
      ids: ServiceContractsUIContext.ids,
      setIds: ServiceContractsUIContext.setIds,
      queryParams: ServiceContractsUIContext.queryParams,
      setQueryParams: ServiceContractsUIContext.setQueryParams,
      openEditServiceContractDialog: ServiceContractsUIContext.openEditServiceContractDialog,
      openDeleteServiceContractDialog: ServiceContractsUIContext.openDeleteServiceContractDialog,
    };
  }, [ServiceContractsUIContext]);

  // Getting curret state of ServiceContracts list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.ServiceContracts }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // ServiceContracts Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    ServiceContractsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchServiceContracts(ServiceContractsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ServiceContractsUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "id",
      text: "ID",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "firstName",
      text: "Firstname",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "lastName",
      text: "Lastname",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "gender",
      text: "Gender",
      sort: false,
      sortCaret: sortCaret,
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      sortCaret: sortCaret,
      formatter: columnFormatters.StatusColumnFormatter,
      headerSortingClasses,
    },
    {
      dataField: "type",
      text: "Type",
      sort: true,
      sortCaret: sortCaret,
      formatter: columnFormatters.TypeColumnFormatter,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditServiceContractDialog: ServiceContractsUIProps.openEditServiceContractDialog,
        openDeleteServiceContractDialog: ServiceContractsUIProps.openDeleteServiceContractDialog,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: ServiceContractsUIProps.queryParams.pageSize,
    page: ServiceContractsUIProps.queryParams.pageNumber,
  };
  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              isLoading={listLoading}
              paginationProps={paginationProps}
            >
              <BootstrapTable
                wrapperClasses="table-responsive"
                bordered={false}
                classes="table table-head-custom table-vertical-center overflow-hidden"
                bootstrap4
                remote
                keyField="id"
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  ServiceContractsUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: ServiceContractsUIProps.ids,
                  setIds: ServiceContractsUIProps.setIds,
                })}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={entities} />
                <NoRecordsFoundMessage entities={entities} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}
