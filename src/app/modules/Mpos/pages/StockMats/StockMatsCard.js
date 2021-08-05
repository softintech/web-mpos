import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { StockMatsFilter } from "./StockMats-filter/StockMatsFilter";
import { StockMatsTable } from "./StockMats-table/StockMatsTable";
import { StockMatsGrouping } from "./StockMats-grouping/StockMatsGrouping";
import { useStockMatsUIContext } from "./StockMatsUIContext";
import { Link } from "react-router-dom";
import { useLang, setLanguage } from "./../../../../../_metronic/i18n";

export function StockMatsCard() {
  const StockMatsUIContext = useStockMatsUIContext();
  const StockMatsUIProps = useMemo(() => {
    return {
      ids: StockMatsUIContext.ids,
      newStockMatButtonClick: StockMatsUIContext.newStockMatButtonClick,
      newShopsPageCreshopButtonClick: StockMatsUIContext.newShopsPageCreshopButtonClick,
    };
  }, [StockMatsUIContext]);

  return (
    <Card>
      <CardHeader title="StockMats list">
        <CardHeaderToolbar>
          <Link to="/dashboard">
          {useLang()=='en'?"back":"ย้อนกลับ"}
          </Link>

        </CardHeaderToolbar>

      </CardHeader>
      <CardBody>
        <StockMatsFilter  name="New"/>
        {StockMatsUIProps.ids.length > 0 && <StockMatsGrouping />}
        <StockMatsTable />
      </CardBody>
    </Card>
  );
}
