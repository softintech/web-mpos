import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { StockCountsFilter } from "./StockCounts-filter/StockCountsFilter";
import { StockCountsTable } from "./StockCounts-table/StockCountsTable";
import { StockCountsGrouping } from "./StockCounts-grouping/StockCountsGrouping";
import { useStockCountsUIContext } from "./StockCountsUIContext";
import { Link } from "react-router-dom";
import { useLang, setLanguage } from "./../../../../../_metronic/i18n";

export function StockCountsCard() {
  const StockCountsUIContext = useStockCountsUIContext();
  const StockCountsUIProps = useMemo(() => {
    return {
      ids: StockCountsUIContext.ids,
      newStockCountButtonClick: StockCountsUIContext.newStockCountButtonClick,
      newShopsPageCreshopButtonClick: StockCountsUIContext.newShopsPageCreshopButtonClick,
    };
  }, [StockCountsUIContext]);

  return (
    <Card>
      <CardHeader title="StockCounts list">
        <CardHeaderToolbar>
          <Link to="/dashboard">
          {useLang()=='en'?"back":"ย้อนกลับ"}
          </Link>

        </CardHeaderToolbar>

      </CardHeader>
      <CardBody>
        <StockCountsFilter  name="New"/>
        {StockCountsUIProps.ids.length > 0 && <StockCountsGrouping />}
        <StockCountsTable />
      </CardBody>
    </Card>
  );
}
