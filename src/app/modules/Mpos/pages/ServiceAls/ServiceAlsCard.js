import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { ServiceAlsFilter } from "./ServiceAls-filter/ServiceAlsFilter";
import { ServiceAlsTable } from "./ServiceAls-table/ServiceAlsTable";
import { ServiceAlsGrouping } from "./ServiceAls-grouping/ServiceAlsGrouping";
import { useServiceAlsUIContext } from "./ServiceAlsUIContext";
import { Link } from "react-router-dom";
import { useLang, setLanguage } from "./../../../../../_metronic/i18n";

export function ServiceAlsCard() {
  const ServiceAlsUIContext = useServiceAlsUIContext();
  const ServiceAlsUIProps = useMemo(() => {
    return {
      ids: ServiceAlsUIContext.ids,
      newServiceAlButtonClick: ServiceAlsUIContext.newServiceAlButtonClick,
      newShopsPageCreshopButtonClick: ServiceAlsUIContext.newShopsPageCreshopButtonClick,
    };
  }, [ServiceAlsUIContext]);

  return (
    <Card>
      <CardHeader title="ServiceAls list">
        <CardHeaderToolbar>
          <Link to="/dashboard">
          {useLang()=='en'?"back":"ย้อนกลับ"}
          </Link>

        </CardHeaderToolbar>

      </CardHeader>
      <CardBody>
        <ServiceAlsFilter  name="New"/>
        {ServiceAlsUIProps.ids.length > 0 && <ServiceAlsGrouping />}
        <ServiceAlsTable />
      </CardBody>
    </Card>
  );
}
