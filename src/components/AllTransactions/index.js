import { Component } from "react";
import "./index.css";
import EachTransaction from "../EachTransaction";

class AllTransactions extends Component {
  render() {
    const { transactions } = this.props;
    const { dataFromModal, deleteTransaction } = this.props;
    const sortedTransactions = transactions.sort((a, b) => {
      let da = new Date(a.date);
      let db = new Date(b.date);
      return db - da;
    });

    return (
      <ul className="all-transactions-container">
        <li className="heading-container">
          <p className="transaction-names">Transaction Name</p>
          <p className="category-name">Category</p>
          <p className="date">Date</p>
          <p className="amount">Amount</p>
        </li>
        {sortedTransactions.map((each) => (
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

export default AllTransactions;
