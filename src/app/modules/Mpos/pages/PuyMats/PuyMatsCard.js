import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { PuyMatsFilter } from "./PuyMats-filter/PuyMatsFilter";
import { PuyMatsTable } from "./PuyMats-table/PuyMatsTable";
import { PuyMatsGrouping } from "./PuyMats-grouping/PuyMatsGrouping";
import { usePuyMatsUIContext } from "./PuyMatsUIContext";
import { Link } from "react-router-dom";
import { useLang, setLanguage } from "./../../../../../_metronic/i18n";

export function PuyMatsCard() {
  const PuyMatsUIContext = usePuyMatsUIContext();
  const PuyMatsUIProps = useMemo(() => {
    return {
      ids: PuyMatsUIContext.ids,
      newPuyMatButtonClick: PuyMatsUIContext.newPuyMatButtonClick,
      newShopsPageCreshopButtonClick: PuyMatsUIContext.newShopsPageCreshopButtonClick,
    };
  }, [PuyMatsUIContext]);

  return (
    <Card>
      <CardHeader title="PuyMats list">
        <CardHeaderToolbar>
          <Link to="/dashboard">
            {useLang()=='en'?"back":"ย้อนกลับ"}
          </Link>

        </CardHeaderToolbar>

      </CardHeader>
      <CardBody>
        <PuyMatsFilter  name="New"/>
        {PuyMatsUIProps.ids.length > 0 && <PuyMatsGrouping />}
        <PuyMatsTable />
      </CardBody>
    </Card>
  );
}
