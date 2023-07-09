import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faCircleArrowDown } from "@fortawesome/free-solid-svg-icons";
import ModalForUpdate from "../ModalForUpdate";
import ModalForDelete from "../ModalForDelete";
import { format } from "date-fns";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "./index.css";

const EachTransaction = (props) => {
  const { each, dataFromModal, deleteTransaction } = props;
  const { amount, type, date, category, id, transaction_name, user_id } = each;
  console.log("d", date);
  const dt = new Date(date);
  const formatDate = format(dt, "dd MMM, hh.mm a");
  console.log(dt);
  const iconClassName =
    type === "debit" ? "debit-icon-color" : "credit-icon-color";
  const icon = type === "debit" ? "faCircleArrowDown" : "faCircleArrowUp";

  return (
    <>
      <li className="transaction-list">
        {type === "debit" ? (
          <FontAwesomeIcon icon={faCircleArrowDown} className="icon-image1" />
        ) : (
          <FontAwesomeIcon icon={faCircleArrowUp} className="icon-image1" />
        )}

        <p className="transaction-name name-cont1">{transaction_name}</p>
        <p className="transaction-name">{category}</p>
        <p className="transaction-name">{formatDate}</p>
        {type === "debit" ? (
          <p className="debit-icon-color weight"> -${amount}</p>
        ) : (
          <p className="credit-icon-color weight">+${amount}</p>
        )}

        <ModalForUpdate
          each={each}
          date={each.date}
          key={each.id}
          dataFromModal={dataFromModal}
        />
        <ModalForDelete each={each} deleteTransaction={deleteTransaction} />
      </li>
      <hr className="horizontal-line" />
    </>
  );
};

export default EachTransaction;
