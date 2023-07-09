import { Component } from "react";
import Cookies from "js-cookie";
import Popup from "reactjs-popup";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import "reactjs-popup/dist/index.css";
import "./index.css";

class ModalForUpdate extends Component {
  state = {
    transaction_name: this.props.each.transaction_name,
    type: this.props.each.type,
    category: this.props.each.category,
    amount: this.props.each.amount,
    date: this.props.date,
    result: "",
    transactions: [],
  };

  onChangeTransactionNames = (event) => {
    console.log(event.target.value);
    this.setState({ transaction_name: event.target.value });
  };
  onChangeTransactionTypes = (event) => {
    this.setState({ type: event.target.value });
  };

  onChangeCategorys = (event) => {
    this.setState({ category: event.target.value });
  };
  onChangeAmounts = (event) => {
    this.setState({ amount: event.target.value });
  };
  onChangeDates = (event) => {
    const dt = new Date(event.target.value);
    console.log("change", dt);
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

  updateTransaction = async () => {
    const { transaction_name, type, category, amount, date } = this.state;

    console.log("up", new Date(date));
    const d = format(new Date(date), "yyyy-MM-dd");
    console.log(d);
    const user_id = Cookies.get("user_id");
    const data = {
      id: this.props.each.id,
      name: transaction_name,
      type: type,
      category: category,
      amount: amount,
      date: d,
    };

    const url =
      "https://bursting-gelding-24.hasura.app/api/rest/update-transaction";
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
    const { transaction_name, type, category, amount, date } = this.state;

    const isValidated =
      transaction_name !== "" &&
      type !== "" &&
      category !== "" &&
      amount !== 0 &&
      date !== "";
    console.log(isValidated);
    if (isValidated) {
      resp = await this.updateTransaction();
      console.log("res", resp);
      if (resp.ok === true) {
        console.log("okkk");
        this.setState({
          result: true,
          transaction_name: "",
          type: "",
          category: "",
          amount: 0,
          date: "",
        });
        await this.getLatestTransactions(user_id);

        return true;
      } else {
        this.setState({
          transaction_name: this.props.each.transaction_name,
          type: this.props.each.type,
          category: this.props.each.category,
          amount: this.props.each.amount,
          date: this.props.each.date,
          result: false,
        });
        return false;
      }
    } else {
      this.setState({ result: false });
      return false;
    }
  };

  render() {
    const { each } = this.props;
    const {
      amount,
      type,
      date,
      category,
      id,
      transaction_name,
      user_id,
      result,
    } = this.state;
    // const { transName, transType, category, amount, date, result } = each;
    // console.log("props", this.props);
    //const formatDt = format(new Date(date), "dd-mm-yyyy");
    // console.log(formatDt);
    // console.log("new", new Date(date));
    let res;
    return (
      <Popup
        trigger={
          <button className="icon-btn">
            <FontAwesomeIcon icon={faPencil} className="icon-image" />
          </button>
        }
        modal
      >
        {(close) => (
          <div className="modal">
            <div className="header">
              <h1 className="head">Update Transaction</h1>
              <p className="para">Update your Transaction..</p>
            </div>
            <div className="content">
              <div className="area">
                <div className="profile-each-field-container1">
                  <label className="label">Transaction Name</label>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    className="input-box"
                    value={transaction_name}
                    onChange={this.onChangeTransactionNames}
                  />
                </div>
                <div className="profile-each-field-container1">
                  <label className="label">Transaction Type</label>
                  <select
                    placeholder="Enter Transaction Type"
                    className="input-box"
                    onChange={this.onChangeTransactionTypes}
                    value={type}
                  >
                    <option
                      value="debit"
                      onChange={this.onChangeTransactionTypes}
                    >
                      Debit
                    </option>
                    <option
                      value="credit"
                      onChange={this.onChangeTransactionTypes}
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
                    onChange={this.onChangeCategorys}
                    value={category}
                  >
                    <option
                      value="Entertainment"
                      onChange={this.onChangeCategorys}
                    >
                      Entertainment
                    </option>
                    <option value="Shopping" onChange={this.onChangeCategorys}>
                      Shopping
                    </option>
                    <option value="Food" onChange={this.onChangeCategorys}>
                      Food
                    </option>
                    <option value="Others" onChange={this.onChangeCategorys}>
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
                    onChange={this.onChangeAmounts}
                    value={amount}
                  />
                </div>
                <div className="profile-each-field-container1">
                  <label className="label">Date</label>
                  <input
                    type="Date"
                    placeholder="Enter Date"
                    className="input-box"
                    onChange={this.onChangeDates}
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

export default ModalForUpdate;
