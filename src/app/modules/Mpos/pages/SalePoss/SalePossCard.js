import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { SalePossFilter } from "./SalePoss-filter/SalePossFilter";
import { SalePossTable } from "./SalePoss-table/SalePossTable";
import { SalePossGrouping } from "./SalePoss-grouping/SalePossGrouping";
import { useSalePossUIContext } from "./SalePossUIContext";
import { Link } from "react-router-dom";
import { useLang, setLanguage } from "./../../../../../_metronic/i18n";

export function SalePossCard() {
  const SalePossUIContext = useSalePossUIContext();
  const SalePossUIProps = useMemo(() => {
    return {
      ids: SalePossUIContext.ids,
      newSalePosButtonClick: SalePossUIContext.newSalePosButtonClick,
      newShopsPageCreshopButtonClick: SalePossUIContext.newShopsPageCreshopButtonClick,
    };
  }, [SalePossUIContext]);

  return (
    <Card>
      <CardHeader title="SalePoss list">
        <CardHeaderToolbar>
          <Link to="/dashboard">
          {useLang()=='en'?"back":"ย้อนกลับ"}
          </Link>

        </CardHeaderToolbar>

      </CardHeader>
      <CardBody>
        <SalePossFilter  name="New"/>
        {SalePossUIProps.ids.length > 0 && <SalePossGrouping />}
        <SalePossTable />
      </CardBody>
    </Card>
  );
}
