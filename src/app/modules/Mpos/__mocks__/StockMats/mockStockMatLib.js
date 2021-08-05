import Ajax, { ajax } from "./../../../libs/ajax";
import { Token, hosts, hostname } from "./../../../libs/config";
import * as actions from "../_redux/esss/esssActions";
import React, { useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import essTableMock from "./essTableMock";
import axios from "axios";
import { initialFilter } from "./../pages/esss/EsssUIHelpers";
import $ from "jquery";
import userTableMock from "./../../Auth/__mocks__/userTableMock";

export const StockMatS_URL = "api/esss";

export async function AjaxDataStockMat(resove = "") {
  const idapp = localStorage.getItem("idapp");

  let _essGroup = parseInt(idapp);
  //const data = await new Promise((r, j) => ajax.Get(`${hosts}/StockMat/all/${_essGroup}`, Token, '', r));

  new Promise((r, j) => {
    ajax.Get(`${hosts}/StockMat/all/${_essGroup}`, Token, "", r);
  }).then(data => {
    if (data != false) {
      let da = data != "" ? JSON.parse(data) : "";
      const das = Object.entries(da).map(([key, value], i) => {
        const id = parseInt(value.id);
        const active = value.active;

        const newData = {
          id,
          active
        };
        essTableMock.push(newData);
      });
      if (resove != "") {
        resove(das);
      } else {
        return das;
      }
    }
  });
}
export const update = (id, data, userId, r = "") => {
  console.log(data);
  let obj = {
    action: "tb_leave_request",
    id: id == undefined ? "" : id,
    sql: {
      id_application: "",
      active: "1"
    }
  };

  console.log(obj);
  const res = new Promise((r, j) =>
    ajax.Post(`${hosts}/StockMat/update`, Token, obj, r)
  );
  res.then(v => {
    console.log(v);
    if (v != false) {
      let obj = {
        id: parseInt(v),
        check_hour: data.check_hour
      };
      if (r != "") {
        r(obj);
      } else {
        return obj;
      }
    } else {
      if (r != "") {
        r(false);
      } else {
        return false;
      }
    }
  });
};
export const updatedbStatus = (id, status, r = "") => {
  let obj = {
    action: "tb_leave_request",
    id: id,
    sql: {
      emreq_active: {
        val: status,
        type: "BOOLEAN"
      }
    }
  };
  const res = new Promise((r, j) =>
    ajax.Post(`${hosts}/StockMat/update`, Token, obj, r)
  );
  res.then(v => {
    console.log(v);
    if (v != false) {
      if (r != "") {
        r(true);
      } else {
        return true;
      }
    } else {
      if (r != "") {
        r(false);
      } else {
        return false;
      }
    }
  });
};
export const deletedb = (id, r = "") => {
  let obj = {
    action: "tb_leave_request",
    id: id
  };
  const res = new Promise((r, j) =>
    ajax.Post(`${hosts}/StockMat/delete`, Token, obj, r)
  );
  res.then(v => {
    console.log(v);
    if (v != false) {
      if (r != "") {
        r(true);
      } else {
        return true;
      }
    } else {
      if (r != "") {
        r(false);
      } else {
        return false;
      }
    }
  });
};

