import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { PuyPursFilter } from "./PuyPurs-filter/PuyPursFilter";
import { PuyPursTable } from "./PuyPurs-table/PuyPursTable";
import { PuyPursGrouping } from "./PuyPurs-grouping/PuyPursGrouping";
import { usePuyPursUIContext } from "./PuyPursUIContext";
import { Link } from "react-router-dom";
import { useLang, setLanguage } from "./../../../../../_metronic/i18n";


export function PuyPursCard() {
  const PuyPursUIContext = usePuyPursUIContext();
  const PuyPursUIProps = useMemo(() => {
    return {
      ids: PuyPursUIContext.ids,
      newPuyPurButtonClick: PuyPursUIContext.newPuyPurButtonClick,
      newShopsPageCreshopButtonClick: PuyPursUIContext.newShopsPageCreshopButtonClick,
    };
  }, [PuyPursUIContext]);

  return (
    <Card>
      <CardHeader title="PuyPurs list">
        <CardHeaderToolbar>
          <Link to="/dashboard">
          {useLang()=='en'?"back":"ย้อนกลับ"}
          </Link>

        </CardHeaderToolbar>

      </CardHeader>
      <CardBody>
        <PuyPursFilter  name="New"/>
        {PuyPursUIProps.ids.length > 0 && <PuyPursGrouping />}
        <PuyPursTable />
      </CardBody>
    </Card>
  );
}
