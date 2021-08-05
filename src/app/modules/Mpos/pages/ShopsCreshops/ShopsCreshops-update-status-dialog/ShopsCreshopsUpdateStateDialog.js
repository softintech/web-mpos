import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  ShopsCreshopStatusCssClasses,
  ShopsCreshopStatusTitles,
} from "../ShopsCreshopsUIHelpers";
import * as actions from "../../../_redux/ShopsCreshops/ShopsCreshopsActions";
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

export function ShopsCreshopsUpdateStateDialog({ show, onHide }) {
  // ShopsCreshops UI Context
  const ShopsCreshopsUIContext = useShopsCreshopsUIContext();
  const ShopsCreshopsUIProps = useMemo(() => {
    return {
      ids: ShopsCreshopsUIContext.ids,
      setIds: ShopsCreshopsUIContext.setIds,
      queryParams: ShopsCreshopsUIContext.queryParams,
    };
  }, [ShopsCreshopsUIContext]);

  // ShopsCreshops Redux state
  const { ShopsCreshops, isLoading } = useSelector(
    (state) => ({
      ShopsCreshops: selectedShopsCreshops(
        state.ShopsCreshops.entities,
        ShopsCreshopsUIProps.ids
      ),
      isLoading: state.ShopsCreshops.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!ShopsCreshopsUIProps.ids || ShopsCreshopsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ShopsCreshopsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update ShopsCreshops status by selected ids
    dispatch(actions.updateShopsCreshopsStatus(ShopsCreshopsUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchShopsCreshops(ShopsCreshopsUIProps.queryParams)).then(
          () => {
            // clear selections list
            ShopsCreshopsUIProps.setIds([]);
            // closing delete modal
            onHide();
          }
        );
      }
    );
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Status has been updated for selected ShopsCreshops
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block cursor-default">
        {/*begin::Loading*/}
        {isLoading && (
          <div className="overlay-layer">
            <div className="spinner spinner-lg spinner-primary" />
          </div>
        )}
        {/*end::Loading*/}
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
      <Modal.Footer className="form">
        <div className="form-group">
          <select
            className="form-control"
            value={status}
            onChange={(e) => setStatus(+e.target.value)}
          >
            <option value="0">Suspended</option>
            <option value="1">Active</option>
            <option value="2">Pending</option>
          </select>
        </div>
        <div className="form-group">
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate mr-3"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={updateStatus}
            className="btn btn-primary btn-elevate"
          >
            Update Status
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
