import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { ServiceContractsFilter } from "./ServiceContracts-filter/ServiceContractsFilter";
import { ServiceContractsTable } from "./ServiceContracts-table/ServiceContractsTable";
import { ServiceContractsGrouping } from "./ServiceContracts-grouping/ServiceContractsGrouping";
import { useServiceContractsUIContext } from "./ServiceContractsUIContext";
import { Link } from "react-router-dom";
import { useLang, setLanguage } from "./../../../../../_metronic/i18n";

export function ServiceContractsCard() {
  const ServiceContractsUIContext = useServiceContractsUIContext();
  const ServiceContractsUIProps = useMemo(() => {
    return {
      ids: ServiceContractsUIContext.ids,
      newServiceContractButtonClick: ServiceContractsUIContext.newServiceContractButtonClick,
      newShopsPageCreshopButtonClick: ServiceContractsUIContext.newShopsPageCreshopButtonClick,
    };
  }, [ServiceContractsUIContext]);

  return (
    <Card>
      <CardHeader title="ServiceContracts list">
        <CardHeaderToolbar>
          <Link to="/dashboard">
          {useLang()=='en'?"back":"ย้อนกลับ"}
          </Link>

        </CardHeaderToolbar>

      </CardHeader>
      <CardBody>
        <ServiceContractsFilter  name="New"/>
        {ServiceContractsUIProps.ids.length > 0 && <ServiceContractsGrouping />}
        <ServiceContractsTable />
      </CardBody>
    </Card>
  );
}
