import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useServiceContractsUIContext } from "../ServiceContractsUIContext";

const prepareFilter = (queryParams, values) => {
  const { status, type, searchText } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};
  // Filter by status
  filter.status = status !== "" ? +status : undefined;
  // Filter by type
  filter.type = type !== "" ? +type : undefined;
  // Filter by all fields
  filter.lastName = searchText;
  if (searchText) {
    filter.firstName = searchText;
    filter.email = searchText;
    filter.ipAddress = searchText;
  }
  newQueryParams.filter = filter;
  return newQueryParams;
};

export function ServiceContractsFilter({ listLoading,name}) {
  // ServiceContracts UI Context
  const ServiceContractsUIContext = useServiceContractsUIContext();
  const ServiceContractsUIProps = useMemo(() => {
    return {
      queryParams: ServiceContractsUIContext.queryParams,
      setQueryParams: ServiceContractsUIContext.setQueryParams,
      newServiceContractButtonClick: ServiceContractsUIContext.newServiceContractButtonClick,
      newShopsPageCreshopButtonClick: ServiceContractsUIContext.newShopsPageCreshopButtonClick,
    };
  }, [ServiceContractsUIContext]);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(ServiceContractsUIProps.queryParams, values);
    if (!isEqual(newQueryParams, ServiceContractsUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      ServiceContractsUIProps.setQueryParams(newQueryParams);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          status: "", // values => All=""/Susspended=0/Active=1/Pending=2
          type: "", // values => All=""/Business=0/Individual=1
          searchText: "",
        }}
        onSubmit={(values) => {
          applyFilter(values);
        }}
      >
        {({
          values,
          handleSubmit,
          handleBlur,
          handleChange,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className="form form-label-right">
            <div className="form-group row">
              <div className="col-lg-2">
                <select
                  className="form-control"
                  name="status"
                  placeholder="Filter by Status"
                  // TODO: Change this code
                  onChange={(e) => {
                    setFieldValue("status", e.target.value);
                    handleSubmit();
                  }}
                  onBlur={handleBlur}
                  value={values.status}
                >
                  <option value="">All</option>
                  <option value="0">Susspended</option>
                  <option value="1">Active</option>
                  <option value="2">Pending</option>
                </select>
                <small className="form-text text-muted">

                </small>
              </div>
              <div className="col-lg-2">
                <select
                  className="form-control"
                  placeholder="Filter by Type"
                  name="type"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setFieldValue("type", e.target.value);
                    handleSubmit();
                  }}
                  value={values.type}
                >
                  <option value="">All</option>
                  <option value="0">Business</option>
                  <option value="1">Individual</option>
                </select>
                <small className="form-text text-muted">

                </small>
              </div>
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  name="searchText"
                  placeholder="Search"
                  onBlur={handleBlur}
                  value={values.searchText}
                  onChange={(e) => {
                    setFieldValue("searchText", e.target.value);
                    handleSubmit();
                  }}
                />
                <small className="form-text text-muted">

                </small>
              </div>
              <div className="col-lg-6" >
                <div className="float-sm-right">
                  <button
                      type="button"
                      className="btn btn-primary"
                      onClick={ServiceContractsUIProps.newShopsPageCreshopButtonClick}
                      >{name}
                  </button>
                </div>

              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}
