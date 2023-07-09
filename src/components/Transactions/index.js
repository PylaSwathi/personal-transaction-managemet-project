import { Component } from "react";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/index";
import ModalForAdd from "../ModalForAdd/index";
import Cookies from "js-cookie";
import AllTransactions from "../AllTransactions/index";
import DebitTransactions from "../DebitTransactions/index";
import CreditTransactions from "../CreditTransactions/index";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import "./index.css";

class Transactions extends Component {
  state = {
    isLoading: true,
    name: "",
    email: "",
    transactions: [],
    isAllTransactionsActive: true,
    isDebitActive: false,
    isCreditActive: false,
  };

  onClickAllTransactions = () => {
    this.setState({
      isDebitActive: false,
      isAllTransactionsActive: true,
      isCreditActive: false,
    });
  };

  onClickDebit = () => {
    this.setState({
      isCreditActive: false,
      isAllTransactionsActive: false,
      isDebitActive: true,
    });
  };

  onClickCredit = () => {
    this.setState({
      isCreditActive: true,
      isAllTransactionsActive: false,
      isDebitActive: false,
    });
  };

  getProfileDetails = async (user_id) => {
    const url = "https://bursting-gelding-24.hasura.app/api/rest/profile";
    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "x-hasura-admin-secret":
          "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
        "x-hasura-role": "user",
        "x-hasura-user-id": user_id,
      },
    };
    const response = await fetch(url, options);
    const body = await response.json();
    // console.log(body);
    const { users } = body;
    const { email, name } = users[0];
    this.setState({ email: email, name: name, isLoading: false });
  };

  deleteTransaction = async (user_id, id) => {
    const url = `https://bursting-gelding-24.hasura.app/api/rest/delete-transaction?id=${id}`;
    const options = {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "x-hasura-admin-secret":
          "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
        "x-hasura-role": "user",
        "x-hasura-user-id": user_id,
      },
    };
    const response = await fetch(url, options);
    console.log(response);
    if (response.ok === true) {
      alert("deleted Successfully!!");
    } else {
      alert("something went wrong!!");
    }
    this.getTransactions(user_id);
  };

  getTransactions = async (user_id) => {
    const url =
      "https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=100&offset=0";
    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "x-hasura-admin-secret":
          "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
        "x-hasura-role": "user",
        "x-hasura-user-id": user_id,
      },
    };
    const response = await fetch(url, options);
    console.log(response);
    const data = await response.json();
    console.log("data", data);
    const { transactions } = data;
    this.setState({ transactions: transactions });
  };
  onClickDeleteTrans = (user_id, id) => {
    this.deleteTransaction(user_id, id);
    this.getTransactions(user_id);
  };

  dataFromModal = (addedTrans) => {
    console.log("from Modal");
    console.log("from", addedTrans);
    this.setState({ transactions: addedTrans });
  };
  componentDidMount = () => {
    const user_id = Cookies.get("user_id");
    // console.log(user_id);
    this.getProfileDetails(user_id);
    this.getTransactions(user_id);
  };

  render() {
    const {
      isLoading,
      email,
      name,
      transactions,
      isAllTransactionsActive,
      isDebitActive,
      isCreditActive,
    } = this.state;

    const transactionsClassName = isAllTransactionsActive
      ? "active"
      : "non-active";
    const debitClassName = isDebitActive ? "active" : "non-active";
    const creditClassName = isCreditActive ? "active" : "non-active";

    return (
      <div className="transactions-bg-container">
        {isLoading ? (
          <Loader
            type="TailSpin"
            color="#00BFFF"
            height={50}
            width={50}
            className="loader"
          />
        ) : (
          <>
            <NavBar
              name={name}
              email={email}
              isDashboardActive={false}
              isTransactActive={true}
              isProfileActive={false}
            />
            <div className="transactions-right-container">
              <div className="transactions-upper-section">
                <div className="transactions-row-container">
                  <h1 className="transactions-heading">Transactions</h1>
                  <ModalForAdd dataFromModal={this.dataFromModal} />
                </div>
                <ul className="transactions-list-container">
                  <li
                    className="navbar-link-container"
                    onClick={this.onClickAllTransactions}
                  >
                    <p className={transactionsClassName}> All Transactions</p>
                  </li>

                  <li
                    className="navbar-link-container"
                    onClick={this.onClickDebit}
                  >
                    <p className={debitClassName}> Debit</p>
                  </li>

                  <li
                    className="navbar-link-container"
                    onClick={this.onClickCredit}
                  >
                    <p className={creditClassName}> Credit</p>
                  </li>
                </ul>
              </div>
              <div className="transactions-lower-section">
                {isAllTransactionsActive && (
                  <AllTransactions
                    transactions={transactions}
                    dataFromModal={this.dataFromModal}
                    deleteTransaction={this.deleteTransaction}
                  />
                )}
                {isDebitActive && (
                  <DebitTransactions
                    transactions={transactions}
                    dataFromModal={this.dataFromModal}
                    deleteTransaction={this.deleteTransaction}
                  />
                )}
                {isCreditActive && (
                  <CreditTransactions
                    transactions={transactions}
                    dataFromModal={this.dataFromModal}
                    deleteTransaction={this.deleteTransaction}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default Transactions;
