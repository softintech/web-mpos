// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/SaleProducts/SaleProductsActions";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../SaleProductsUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useSaleProductsUIContext } from "../SaleProductsUIContext";

export function SaleProductsTable() {
  // SaleProducts UI Context
  const SaleProductsUIContext = useSaleProductsUIContext();
  const SaleProductsUIProps = useMemo(() => {
    return {
      ids: SaleProductsUIContext.ids,
      setIds: SaleProductsUIContext.setIds,
      queryParams: SaleProductsUIContext.queryParams,
      setQueryParams: SaleProductsUIContext.setQueryParams,
      openEditSaleProductDialog: SaleProductsUIContext.openEditSaleProductDialog,
      openDeleteSaleProductDialog: SaleProductsUIContext.openDeleteSaleProductDialog,
    };
  }, [SaleProductsUIContext]);

  // Getting curret state of SaleProducts list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.SaleProducts }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // SaleProducts Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    SaleProductsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchSaleProducts(SaleProductsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SaleProductsUIProps.queryParams, dispatch]);
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
        openEditSaleProductDialog: SaleProductsUIProps.openEditSaleProductDialog,
        openDeleteSaleProductDialog: SaleProductsUIProps.openDeleteSaleProductDialog,
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
    sizePerPage: SaleProductsUIProps.queryParams.pageSize,
    page: SaleProductsUIProps.queryParams.pageNumber,
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
                  SaleProductsUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: SaleProductsUIProps.ids,
                  setIds: SaleProductsUIProps.setIds,
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
