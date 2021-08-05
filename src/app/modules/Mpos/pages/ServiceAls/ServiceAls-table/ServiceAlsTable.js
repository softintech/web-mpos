// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/ServiceAls/ServiceAlsActions";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../ServiceAlsUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useServiceAlsUIContext } from "../ServiceAlsUIContext";

export function ServiceAlsTable() {
  // ServiceAls UI Context
  const ServiceAlsUIContext = useServiceAlsUIContext();
  const ServiceAlsUIProps = useMemo(() => {
    return {
      ids: ServiceAlsUIContext.ids,
      setIds: ServiceAlsUIContext.setIds,
      queryParams: ServiceAlsUIContext.queryParams,
      setQueryParams: ServiceAlsUIContext.setQueryParams,
      openEditServiceAlDialog: ServiceAlsUIContext.openEditServiceAlDialog,
      openDeleteServiceAlDialog: ServiceAlsUIContext.openDeleteServiceAlDialog,
    };
  }, [ServiceAlsUIContext]);

  // Getting curret state of ServiceAls list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.ServiceAls }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // ServiceAls Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    ServiceAlsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchServiceAls(ServiceAlsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ServiceAlsUIProps.queryParams, dispatch]);
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
        openEditServiceAlDialog: ServiceAlsUIProps.openEditServiceAlDialog,
        openDeleteServiceAlDialog: ServiceAlsUIProps.openDeleteServiceAlDialog,
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
    sizePerPage: ServiceAlsUIProps.queryParams.pageSize,
    page: ServiceAlsUIProps.queryParams.pageNumber,
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
                  ServiceAlsUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: ServiceAlsUIProps.ids,
                  setIds: ServiceAlsUIProps.setIds,
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
