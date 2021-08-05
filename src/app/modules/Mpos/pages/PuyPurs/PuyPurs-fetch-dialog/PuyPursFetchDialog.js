import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import {
  PuyPurStatusCssClasses,
  PuyPurStatusTitles,
} from "../PuyPursUIHelpers";
import { usePuyPursUIContext } from "../PuyPursUIContext";

const selectedPuyPurs = (entities, ids) => {
  const _PuyPurs = [];
  ids.forEach((id) => {
    const PuyPur = entities.find((el) => el.id === id);
    if (PuyPur) {
      _PuyPurs.push(PuyPur);
    }
  });
  return _PuyPurs;
};

export function PuyPursFetchDialog({ show, onHide }) {
  // PuyPurs UI Context
  const PuyPursUIContext = usePuyPursUIContext();
  const PuyPursUIProps = useMemo(() => {
    return {
      ids: PuyPursUIContext.ids,
    };
  }, [PuyPursUIContext]);

  // PuyPurs Redux state
  const { PuyPurs } = useSelector(
    (state) => ({
      PuyPurs: selectedPuyPurs(
        state.PuyPurs.entities,
        PuyPursUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if PuyPurs weren't selected we should close modal
  useEffect(() => {
    if (!PuyPursUIProps.ids || PuyPursUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PuyPursUIProps.ids]);

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
              <th>PuyPur</th>
            </tr>
          </thead>
          <tbody>
            {PuyPurs.map((PuyPur) => (
              <tr key={`id${PuyPur.id}`}>
                <td>{PuyPur.id}</td>
                <td>
                  <span
                    className={`label label-lg label-light-${
                      PuyPurStatusCssClasses[PuyPur.status]
                    } label-inline`}
                  >
                    {" "}
                    {PuyPurStatusTitles[PuyPur.status]}
                  </span>
                </td>
                <td>
                  <span className="ml-3">
                    {PuyPur.lastName}, {PuyPur.firstName}
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
