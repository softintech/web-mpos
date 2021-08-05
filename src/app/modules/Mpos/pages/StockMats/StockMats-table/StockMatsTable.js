// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/StockMats/StockMatsActions";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../StockMatsUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useStockMatsUIContext } from "../StockMatsUIContext";

export function StockMatsTable() {
  // StockMats UI Context
  const StockMatsUIContext = useStockMatsUIContext();
  const StockMatsUIProps = useMemo(() => {
    return {
      ids: StockMatsUIContext.ids,
      setIds: StockMatsUIContext.setIds,
      queryParams: StockMatsUIContext.queryParams,
      setQueryParams: StockMatsUIContext.setQueryParams,
      openEditStockMatDialog: StockMatsUIContext.openEditStockMatDialog,
      openDeleteStockMatDialog: StockMatsUIContext.openDeleteStockMatDialog,
    };
  }, [StockMatsUIContext]);

  // Getting curret state of StockMats list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.StockMats }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // StockMats Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    StockMatsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchStockMats(StockMatsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [StockMatsUIProps.queryParams, dispatch]);
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
        openEditStockMatDialog: StockMatsUIProps.openEditStockMatDialog,
        openDeleteStockMatDialog: StockMatsUIProps.openDeleteStockMatDialog,
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
    sizePerPage: StockMatsUIProps.queryParams.pageSize,
    page: StockMatsUIProps.queryParams.pageNumber,
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
                  StockMatsUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: StockMatsUIProps.ids,
                  setIds: StockMatsUIProps.setIds,
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
