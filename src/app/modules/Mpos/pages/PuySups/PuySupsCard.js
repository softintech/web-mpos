import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { PuySupsFilter } from "./PuySups-filter/PuySupsFilter";
import { PuySupsTable } from "./PuySups-table/PuySupsTable";
import { PuySupsGrouping } from "./PuySups-grouping/PuySupsGrouping";
import { usePuySupsUIContext } from "./PuySupsUIContext";
import { Link } from "react-router-dom";
import { useLang, setLanguage } from "./../../../../../_metronic/i18n";

export function PuySupsCard() {
  const PuySupsUIContext = usePuySupsUIContext();
  const PuySupsUIProps = useMemo(() => {
    return {
      ids: PuySupsUIContext.ids,
      newPuySupButtonClick: PuySupsUIContext.newPuySupButtonClick,
      newShopsPageCreshopButtonClick: PuySupsUIContext.newShopsPageCreshopButtonClick,
    };
  }, [PuySupsUIContext]);

  return (
    <Card>
      <CardHeader title="PuySups list">
        <CardHeaderToolbar>
          <Link to="/dashboard">
          {useLang()=='en'?"back":"ย้อนกลับ"}
          </Link>

        </CardHeaderToolbar>

      </CardHeader>
      <CardBody>
        <PuySupsFilter  name="New"/>
        {PuySupsUIProps.ids.length > 0 && <PuySupsGrouping />}
        <PuySupsTable />
      </CardBody>
    </Card>
  );
}
