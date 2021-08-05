import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";
import { PuyMatsPage } from "./PuyMats/PuyMatsPage";
import { PuyPursPage } from "./PuyPurs/PuyPursPage";
import { PuySupsPage } from "./PuySups/PuySupsPage";
import { ResultsPage } from "./Results/ResultsPage";
import { SalePossPage } from "./SalePoss/SalePossPage";
import { SaleProductsPage } from "./SaleProducts/SaleProductsPage";
import { ServiceAlsPage } from "./ServiceAls/ServiceAlsPage";
import { ServiceContractsPage } from "./ServiceContracts/ServiceContractsPage";
import { ShopsCreEmpsPage } from "./ShopsCreEmps/ShopsCreEmpsPage";
import { ShopsCreshopsPage } from "./ShopsCreshops/ShopsCreshopsPage";
import { StockCountsPage } from "./StockCounts/StockCountsPage";
import { StockMatsPage } from "./StockMats/StockMatsPage";

export default function MposPage() {

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from eCommerce root URL to /customers */
          <Redirect
            exact={true}
            from="/mpos"
            to="/mpos/ร้านค้า/สร้างร้านค้า"
          />
        }
        <ContentRoute path="/mpos/ซื้อ/วัตถุดิบ" component={PuyMatsPage} />
        <ContentRoute path="/mpos/ซื้อ/สั่งซื้อ" component={PuyPursPage} />
        <ContentRoute path="/mpos/ซื้อ/ซัพฟลายเออร์" component={PuySupsPage} />
        <ContentRoute path="/mpos/สรุป" component={ResultsPage} />
        <ContentRoute path="/mpos/ขายสินค้า/ขายสินค้า" component={SalePossPage} />
        <ContentRoute path="/mpos/ขายสินค้า/สินค้า" component={SaleProductsPage} />
        <ContentRoute path="/mpos/บริการ/แจ้งปัญหา" component={ServiceAlsPage} />
        <ContentRoute path="/mpos/บริการ/ต่อสัญญา" component={ServiceContractsPage} />
        <ContentRoute path="/mpos/ร้านค้า/สร้างพนักงาน" component={ShopsCreEmpsPage} />
        <ContentRoute path="/mpos/ร้านค้า/สร้างร้านค้า" component={ShopsCreshopsPage} />
        <ContentRoute path="/mpos/สต๊อก/นับสต๊อก" component={StockCountsPage} />
        <ContentRoute path="/mpos/สต๊อก/สต๊อกวัตถุดิบ" component={StockMatsPage} />

      </Switch>
    </Suspense>
  );
}
