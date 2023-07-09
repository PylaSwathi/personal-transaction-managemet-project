import { Component } from "react";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import "./index.css";

const ModalForDelete = (props) => {
  const { each, deleteTransaction } = props;
  const { id, user_id } = each;

  const deleteTrans = () => {
    console.log("enter");
    deleteTransaction(user_id, id);
  };

  return (
    <Popup
      trigger={
        <button className="icon-btn">
          <FontAwesomeIcon icon={faTrashCan} className="debit-icon-color" />
        </button>
      }
      modal
    >
      {(close) => (
        <div className="modal">
          <div className="header">
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              className="delete-icon-popup"
            />
            <p className="head4"> Are you sure you want to delete?</p>
          </div>
          <div className="content">
            <p className="para6">
              This Transaction will be deleted immediately.You can't undo this
              action.
            </p>
          </div>
          <div className="actions">
            <button
              className="button1"
              onClick={() => {
                deleteTrans();
                close();
                console.log("modal closed ");
              }}
            >
              Yes! Delete
            </button>
            <button
              className="button2"
              onClick={() => {
                console.log("modal closed ");
                close();
              }}
            >
              No,Leave it!
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default ModalForDelete;
