import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { ShopsCreEmpsFilter } from "./ShopsCreEmps-filter/ShopsCreEmpsFilter";
import { ShopsCreEmpsTable } from "./ShopsCreEmps-table/ShopsCreEmpsTable";
import { ShopsCreEmpsGrouping } from "./ShopsCreEmps-grouping/ShopsCreEmpsGrouping";
import { useShopsCreEmpsUIContext } from "./ShopsCreEmpsUIContext";
import { Link } from "react-router-dom";
import { useLang, setLanguage } from "./../../../../../_metronic/i18n";

export function ShopsCreEmpsCard() {
  const ShopsCreEmpsUIContext = useShopsCreEmpsUIContext();
  const ShopsCreEmpsUIProps = useMemo(() => {
    return {
      ids: ShopsCreEmpsUIContext.ids,
      newShopsCreEmpButtonClick: ShopsCreEmpsUIContext.newShopsCreEmpButtonClick,
      newShopsPageCreshopButtonClick: ShopsCreEmpsUIContext.newShopsPageCreshopButtonClick,
    };
  }, [ShopsCreEmpsUIContext]);

  return (
    <Card>
      <CardHeader title="ShopsCreEmps list">
        <CardHeaderToolbar>
          <Link to="/dashboard">
           {useLang()=='en'?"back":"ย้อนกลับ"}
          </Link>

        </CardHeaderToolbar>

      </CardHeader>
      <CardBody>
        <ShopsCreEmpsFilter  name="New"/>
        {ShopsCreEmpsUIProps.ids.length > 0 && <ShopsCreEmpsGrouping />}
        <ShopsCreEmpsTable />
      </CardBody>
    </Card>
  );
}
