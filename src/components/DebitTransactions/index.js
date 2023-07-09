import { Component } from "react";
import "./index.css";
import EachTransaction from "../EachTransaction";

class DebitTransactions extends Component {
  render() {
    const { transactions } = this.props;

    const { dataFromModal, deleteTransaction } = this.props;

    const newTransactions = transactions.filter(
      (each) => each.type === "debit"
    );
    return (
      <ul className="all-transactions-container">
        <li className="heading-container">
          <p className="transaction-names">Transaction Name</p>
          <p className="category-name">Category</p>
          <p className="date">Date</p>
          <p className="amount">Amount</p>
        </li>
        {newTransactions.map((each) => (
          <EachTransaction
            each={each}
            dataFromModal={dataFromModal}
            deleteTransaction={deleteTransaction}
          />
        ))}
      </ul>
    );
  }
}

export default DebitTransactions;
