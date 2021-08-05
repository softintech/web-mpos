import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { SaleProductsFilter } from "./SaleProducts-filter/SaleProductsFilter";
import { SaleProductsTable } from "./SaleProducts-table/SaleProductsTable";
import { SaleProductsGrouping } from "./SaleProducts-grouping/SaleProductsGrouping";
import { useSaleProductsUIContext } from "./SaleProductsUIContext";
import { Link } from "react-router-dom";
import { useLang, setLanguage } from "./../../../../../_metronic/i18n";

export function SaleProductsCard() {
  const SaleProductsUIContext = useSaleProductsUIContext();
  const SaleProductsUIProps = useMemo(() => {
    return {
      ids: SaleProductsUIContext.ids,
      newSaleProductButtonClick: SaleProductsUIContext.newSaleProductButtonClick,
      newShopsPageCreshopButtonClick: SaleProductsUIContext.newShopsPageCreshopButtonClick,
    };
  }, [SaleProductsUIContext]);

  return (
    <Card>
      <CardHeader title="SaleProducts list">
        <CardHeaderToolbar>
          <Link to="/dashboard">
          {useLang()=='en'?"back":"ย้อนกลับ"}
          </Link>

        </CardHeaderToolbar>

      </CardHeader>
      <CardBody>
        <SaleProductsFilter  name="New"/>
        {SaleProductsUIProps.ids.length > 0 && <SaleProductsGrouping />}
        <SaleProductsTable />
      </CardBody>
    </Card>
  );
}
