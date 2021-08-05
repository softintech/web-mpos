import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import {
  PuyMatStatusCssClasses,
  PuyMatStatusTitles,
} from "../PuyMatsUIHelpers";
import { usePuyMatsUIContext } from "../PuyMatsUIContext";

const selectedPuyMats = (entities, ids) => {
  const _PuyMats = [];
  ids.forEach((id) => {
    const PuyMat = entities.find((el) => el.id === id);
    if (PuyMat) {
      _PuyMats.push(PuyMat);
    }
  });
  return _PuyMats;
};

export function PuyMatsFetchDialog({ show, onHide }) {
  // PuyMats UI Context
  const PuyMatsUIContext = usePuyMatsUIContext();
  const PuyMatsUIProps = useMemo(() => {
    return {
      ids: PuyMatsUIContext.ids,
    };
  }, [PuyMatsUIContext]);

  // PuyMats Redux state
  const { PuyMats } = useSelector(
    (state) => ({
      PuyMats: selectedPuyMats(
        state.PuyMats.entities,
        PuyMatsUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if PuyMats weren't selected we should close modal
  useEffect(() => {
    if (!PuyMatsUIProps.ids || PuyMatsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PuyMatsUIProps.ids]);

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
              <th>PuyMat</th>
            </tr>
          </thead>
          <tbody>
            {PuyMats.map((PuyMat) => (
              <tr key={`id${PuyMat.id}`}>
                <td>{PuyMat.id}</td>
                <td>
                  <span
                    className={`label label-lg label-light-${
                      PuyMatStatusCssClasses[PuyMat.status]
                    } label-inline`}
                  >
                    {" "}
                    {PuyMatStatusTitles[PuyMat.status]}
                  </span>
                </td>
                <td>
                  <span className="ml-3">
                    {PuyMat.lastName}, {PuyMat.firstName}
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
