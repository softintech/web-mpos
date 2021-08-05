import React from "react";
import {
  MixedWidget1,
  MixedWidget14,
  ListsWidget9,
  StatsWidget11,
  StatsWidget12,
  ListsWidget1,
  AdvanceTablesWidget2,
  AdvanceTablesWidget4,
  ListsWidget3,
  ListsWidget4,
  ListsWidget8,
} from "../widgets";
export function Demo1Dashboard() {
  return (
    <>

      <div className="row">
        <div className="col-md-6">
          <div className="col-lg-12 col-xxl-12">
            <StatsWidget11
              className="card-stretch card-stretch-half gutter-b"
              symbolShape="circle"
              baseColor="success"
            />
            <StatsWidget12 className="card-stretch card-stretch-half gutter-b" />
          </div>
        </div>

      </div>

    </>
  );
}
