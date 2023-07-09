import { Component } from "react";
import Cookies from "js-cookie";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./index.css";

class ModalForAdd extends Component {
  state = {
    transName: "",
    transType: "debit",
    category: "Shopping",
    amount: 0,
    date: "",
    result: "",
    transactions: [],
  };

  onChangeTransactionName = (event) => {
    this.setState({ transName: event.target.value });
  };
  onChangeTransactionType = (event) => {
    this.setState({ transType: event.target.value });
  };

  onChangeCategory = (event) => {
    this.setState({ category: event.target.value });
  };
  onChangeAmount = (event) => {
    this.setState({ amount: event.target.value });
  };
  onChangeDate = (event) => {
    this.setState({ date: event.target.value });
  };
  sendUpdatedData = () => {
    const { dataFromModal } = this.props;
    const { transactions } = this.state;
    console.log("function", transactions);
    dataFromModal(transactions);
  };

  getLatestTransactions = async (user_id) => {
    const url =
      "https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=1000&offset=0";
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
    // console.log(response);
    const data = await response.json();
    // console.log("data", data);
    const { transactions } = data;
    //console.log(transactions);
    const sortedTransactions = transactions.sort((a, b) => {
      let da = new Date(a.date);
      let db = new Date(b.date);
      return db - da;
    });
    console.log("sorted", sortedTransactions);
    // const slicedData = sortedTransactions.slice(0, 3);
    // console.log(slicedData);
    this.setState({ transactions: sortedTransactions }, this.sendUpdatedData);
  };

  updateTransactions = async () => {
    const { transName, transType, category, amount, date } = this.state;
    const user_id = Cookies.get("user_id");
    const data = {
      name: transName,
      type: transType,
      category: category,
      amount: amount,
      date: new Date(date),
      user_id: user_id,
    };

    const url =
      "https://bursting-gelding-24.hasura.app/api/rest/add-transaction";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-hasura-admin-secret":
          "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
        "x-hasura-role": "user",
        "x-hasura-user-id": user_id,
      },

      body: JSON.stringify(data),
    };

    const response = await fetch(url, options);
    // console.log("updated!");
    //console.log(response);
    //this.getLatestTransactions(user_id);
    return response;
  };

  updateTrans = async () => {
    // console.log("called");
    const user_id = Cookies.get("user_id");
    let resp;
    const { transName, transType, category, amount, date } = this.state;

    const isValidated =
      transName !== "" &&
      transType !== "" &&
      category !== "" &&
      amount !== 0 &&
      date !== "";
    console.log(isValidated);
    if (isValidated) {
      resp = await this.updateTransactions();
      console.log("res", resp);
      if (resp.ok === true) {
        console.log("okkk");
        alert("Added Successfully");
        this.setState({
          result: true,
          transName: "",
          transType: "debit",
          category: "Shopping",
          amount: 0,
          date: "",
        });
        await this.getLatestTransactions(user_id);

        return true;
      } else {
        this.setState({ result: false });
        return false;
      }
    } else {
      this.setState({ result: false });
      return false;
    }
  };

  render() {
    const { transName, transType, category, amount, date, result } = this.state;
    let res;
    return (
      <Popup
        trigger={
          <button className="add-transaction-btn">+Add Transaction</button>
        }
        modal
      >
        {(close) => (
          <div className="modal">
            <div className="header">
              <h1 className="head">Add Transaction</h1>
              <p className="para">Add your Transaction..</p>
            </div>
            <div className="content">
              <div className="area">
                <div className="profile-each-field-container1">
                  <label className="label">Transaction Name</label>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    className="input-box"
                    value={transName}
                    onChange={this.onChangeTransactionName}
                  />
                </div>
                <div className="profile-each-field-container1">
                  <label className="label">Transaction Type</label>
                  <select
                    placeholder="Enter Transaction Type"
                    className="input-box"
                    onChange={this.onChangeTransactionType}
                    value={transType}
                  >
                    <option
                      value="debit"
                      onChange={this.onChangeTransactionType}
                    >
                      Debit
                    </option>
                    <option
                      value="credit"
                      onChange={this.onChangeTransactionType}
                    >
                      Credit
                    </option>
                  </select>
                </div>
                <div className="profile-each-field-container1">
                  <label className="label">Category</label>
                  <select
                    placeholder="Enter Category"
                    className="input-box pad"
                    onChange={this.onChangeCategory}
                    value={category}
                  >
                    <option
                      value="Entertainment"
                      onChange={this.onChangeCategory}
                    >
                      Entertainment
                    </option>
                    <option value="Shopping" onChange={this.onChangeCategory}>
                      Shopping
                    </option>
                    <option value="Food" onChange={this.onChangeCategory}>
                      Food
                    </option>
                    <option value="Others" onChange={this.onChangeCategory}>
                      Others
                    </option>
                  </select>
                </div>
                <div className="profile-each-field-container1">
                  <label className="label">Amount</label>
                  <input
                    type="number"
                    placeholder="Enter Amount"
                    className="input-box"
                    onChange={this.onChangeAmount}
                    value={amount}
                  />
                </div>
                <div className="profile-each-field-container1">
                  <label className="label">Date</label>
                  <input
                    type="Date"
                    placeholder="Enter Date"
                    className="input-box"
                    onChange={this.onChangeDate}
                    value={date}
                  />
                </div>
              </div>
            </div>
            <div className="actions">
              <button
                className="button"
                onClick={async () => {
                  console.log("modal closed ");

                  res = await this.updateTrans();
                  console.log("inside", res);
                  {
                    res && close();
                  }
                }}
              >
                Submit
              </button>
              {result === false && (
                <p className="error">Fields cannot be empty!!!</p>
              )}
            </div>
          </div>
        )}
      </Popup>
    );
  }
}

export default ModalForAdd;
