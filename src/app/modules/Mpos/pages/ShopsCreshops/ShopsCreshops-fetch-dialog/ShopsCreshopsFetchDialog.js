import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import {
  ShopsCreshopStatusCssClasses,
  ShopsCreshopStatusTitles,
} from "../ShopsCreshopsUIHelpers";
import { useShopsCreshopsUIContext } from "../ShopsCreshopsUIContext";

const selectedShopsCreshops = (entities, ids) => {
  const _ShopsCreshops = [];
  ids.forEach((id) => {
    const ShopsCreshop = entities.find((el) => el.id === id);
    if (ShopsCreshop) {
      _ShopsCreshops.push(ShopsCreshop);
    }
  });
  return _ShopsCreshops;
};

export function ShopsCreshopsFetchDialog({ show, onHide }) {
  // ShopsCreshops UI Context
  const ShopsCreshopsUIContext = useShopsCreshopsUIContext();
  const ShopsCreshopsUIProps = useMemo(() => {
    return {
      ids: ShopsCreshopsUIContext.ids,
    };
  }, [ShopsCreshopsUIContext]);

  // ShopsCreshops Redux state
  const { ShopsCreshops } = useSelector(
    (state) => ({
      ShopsCreshops: selectedShopsCreshops(
        state.ShopsCreshops.entities,
        ShopsCreshopsUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if ShopsCreshops weren't selected we should close modal
  useEffect(() => {
    if (!ShopsCreshopsUIProps.ids || ShopsCreshopsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ShopsCreshopsUIProps.ids]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Fetch selected elements
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table className="table table table-head-custom table-vertical-center overflow-hidden">
          <thead>
            <tr>
              <th>ID</th>
              <th>STATUS</th>
              <th>ShopsCreshop</th>
            </tr>
          </thead>
          <tbody>
            {ShopsCreshops.map((ShopsCreshop) => (
              <tr key={`id${ShopsCreshop.id}`}>
                <td>{ShopsCreshop.id}</td>
                <td>
                  <span
                    className={`label label-lg label-light-${
                      ShopsCreshopStatusCssClasses[ShopsCreshop.status]
                    } label-inline`}
                  >
                    {" "}
                    {ShopsCreshopStatusTitles[ShopsCreshop.status]}
                  </span>
                </td>
                <td>
                  <span className="ml-3">
                    {ShopsCreshop.lastName}, {ShopsCreshop.firstName}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-primary btn-elevate"
          >
            Ok
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
