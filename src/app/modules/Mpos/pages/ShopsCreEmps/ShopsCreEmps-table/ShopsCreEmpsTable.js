// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/ShopsCreEmps/ShopsCreEmpsActions";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../ShopsCreEmpsUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useShopsCreEmpsUIContext } from "../ShopsCreEmpsUIContext";

export function ShopsCreEmpsTable() {
  // ShopsCreEmps UI Context
  const ShopsCreEmpsUIContext = useShopsCreEmpsUIContext();
  const ShopsCreEmpsUIProps = useMemo(() => {
    return {
      ids: ShopsCreEmpsUIContext.ids,
      setIds: ShopsCreEmpsUIContext.setIds,
      queryParams: ShopsCreEmpsUIContext.queryParams,
      setQueryParams: ShopsCreEmpsUIContext.setQueryParams,
      openEditShopsCreEmpDialog: ShopsCreEmpsUIContext.openEditShopsCreEmpDialog,
      openDeleteShopsCreEmpDialog: ShopsCreEmpsUIContext.openDeleteShopsCreEmpDialog,
    };
  }, [ShopsCreEmpsUIContext]);

  // Getting curret state of ShopsCreEmps list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.ShopsCreEmps }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // ShopsCreEmps Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    ShopsCreEmpsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchShopsCreEmps(ShopsCreEmpsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ShopsCreEmpsUIProps.queryParams, dispatch]);
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
        openEditShopsCreEmpDialog: ShopsCreEmpsUIProps.openEditShopsCreEmpDialog,
        openDeleteShopsCreEmpDialog: ShopsCreEmpsUIProps.openDeleteShopsCreEmpDialog,
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
    sizePerPage: ShopsCreEmpsUIProps.queryParams.pageSize,
    page: ShopsCreEmpsUIProps.queryParams.pageNumber,
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
                  ShopsCreEmpsUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: ShopsCreEmpsUIProps.ids,
                  setIds: ShopsCreEmpsUIProps.setIds,
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
