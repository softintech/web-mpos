import React, { useEffect, useMemo } from "react";
import { Card, Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/ShopsCreshops/ShopsCreshopsActions";
import { ShopsCreshopEditDialogHeader } from "./ShopsCreshopEditDialogHeader";
import { ShopsCreshopEditForm } from "./ShopsCreshopEditForm";
import { useShopsCreshopsUIContext } from "../ShopsCreshopsUIContext";
import { useLang, setLanguage } from "./../../../../../../_metronic/i18n";

export function ShopsCreshopEditPage({ id, show, onHide }) {
  // ShopsCreshops UI Context
  const ShopsCreshopsUIContext = useShopsCreshopsUIContext();
  const ShopsCreshopsUIProps = useMemo(() => {
    return {
      initShopsCreshop: ShopsCreshopsUIContext.initShopsCreshop,
    };
  }, [ShopsCreshopsUIContext]);

  // ShopsCreshops Redux state
  const dispatch = useDispatch();
  const { actionsLoading, ShopsCreshopForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.ShopsCreshops.actionsLoading,
      ShopsCreshopForEdit: state.ShopsCreshops.ShopsCreshopForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting ShopsCreshop by id
    dispatch(actions.fetchShopsCreshop(id));
  }, [id, dispatch]);

  // server request for saving ShopsCreshop
  const saveShopsCreshop = (ShopsCreshop) => {
    if (!id) {
      // server request for creating ShopsCreshop
      dispatch(actions.createShopsCreshop(ShopsCreshop)).then(() => onHide());
    } else {
      // server request for updating ShopsCreshop
      dispatch(actions.updateShopsCreshop(ShopsCreshop)).then(() => onHide());
    }
  };
  return (
    <div style={{ display: show ? 'block' : 'none' }}>

      <ShopsCreshopEditForm
        saveShopsCreshop={saveShopsCreshop}
        actionsLoading={actionsLoading}
        ShopsCreshop={ShopsCreshopForEdit || ShopsCreshopsUIProps.initShopsCreshop}
        onHide={onHide}
        id={id}
        useLang={useLang()}
      />
    </div>

  );
}
