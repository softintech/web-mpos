import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { ShopsCreshopsFilter } from "./ShopsCreshops-filter/ShopsCreshopsFilter";
import { ShopsCreshopsTable } from "./ShopsCreshops-table/ShopsCreshopsTable";
import { ShopsCreshopsGrouping } from "./ShopsCreshops-grouping/ShopsCreshopsGrouping";
import { useShopsCreshopsUIContext } from "./ShopsCreshopsUIContext";
import { Link } from "react-router-dom";
import { useLang, setLanguage } from "./../../../../../_metronic/i18n";

export function ShopsCreshopsCard() {
  const ShopsCreshopsUIContext = useShopsCreshopsUIContext();
  const ShopsCreshopsUIProps = useMemo(() => {
    return {
      ids: ShopsCreshopsUIContext.ids,
      newShopsCreshopButtonClick: ShopsCreshopsUIContext.newShopsCreshopButtonClick,
      newShopsPageCreshopButtonClick: ShopsCreshopsUIContext.newShopsPageCreshopButtonClick,
    };
  }, [ShopsCreshopsUIContext]);

  return (
    <Card>
      <CardHeader title={useLang()=='en'?"ShopsCreshops list":"ShopsCreshops รายการ"}>
        <CardHeaderToolbar>
          <Link to="/dashboard">
          {useLang()=='en'?"back":"ย้อนกลับ"}
          </Link>

        </CardHeaderToolbar>

      </CardHeader>
      <CardBody>
        <ShopsCreshopsFilter  name={useLang()=='en'?"New":"เพิ่ม"}/>
        {ShopsCreshopsUIProps.ids.length > 0 && <ShopsCreshopsGrouping />}
        <ShopsCreshopsTable />
      </CardBody>
    </Card>
  );
}
