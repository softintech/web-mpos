import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import {
  PuySupStatusCssClasses,
  PuySupStatusTitles,
} from "../PuySupsUIHelpers";
import { usePuySupsUIContext } from "../PuySupsUIContext";

const selectedPuySups = (entities, ids) => {
  const _PuySups = [];
  ids.forEach((id) => {
    const PuySup = entities.find((el) => el.id === id);
    if (PuySup) {
      _PuySups.push(PuySup);
    }
  });
  return _PuySups;
};

export function PuySupsFetchDialog({ show, onHide }) {
  // PuySups UI Context
  const PuySupsUIContext = usePuySupsUIContext();
  const PuySupsUIProps = useMemo(() => {
    return {
      ids: PuySupsUIContext.ids,
    };
  }, [PuySupsUIContext]);

  // PuySups Redux state
  const { PuySups } = useSelector(
    (state) => ({
      PuySups: selectedPuySups(
        state.PuySups.entities,
        PuySupsUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if PuySups weren't selected we should close modal
  useEffect(() => {
    if (!PuySupsUIProps.ids || PuySupsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PuySupsUIProps.ids]);

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
              <th>PuySup</th>
            </tr>
          </thead>
          <tbody>
            {PuySups.map((PuySup) => (
              <tr key={`id${PuySup.id}`}>
                <td>{PuySup.id}</td>
                <td>
                  <span
                    className={`label label-lg label-light-${
                      PuySupStatusCssClasses[PuySup.status]
                    } label-inline`}
                  >
                    {" "}
                    {PuySupStatusTitles[PuySup.status]}
                  </span>
                </td>
                <td>
                  <span className="ml-3">
                    {PuySup.lastName}, {PuySup.firstName}
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
