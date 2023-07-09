import { Component } from "react";
import NavBar from "../NavBar/index";
import Credit from "../Credit/index";
import Debit from "../Debit/index";
import ModalForAdd from "../ModalForAdd/index";
import LatestTransaction from "../LatestTransaction/index";
import Cookies from "js-cookie";
import Loader from "react-loader-spinner";
//import Popup from "reactjs-popup";
//import { ToastContainer, toast } from "react-toastify";
//import "react-toastify/dist/ReactToastify.css";
import "reactjs-popup/dist/index.css";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import "./index.css";

class DashBoard extends Component {
  state = {
    isLoading: true,
    name: "",
    email: "",
    credit: 0,
    debit: 0,
    transactions: [],
    addTransaction: false,
    // transName: "",
    // transType: "debit",
    // category: "Shopping",
    //  amount: 0,
    //  date: "",
    //  result: "",
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

  getCreditDebitTotal = async (user_id) => {
    const url =
      "https://bursting-gelding-24.hasura.app/api/rest/credit-debit-totals";
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
    const data = await response.json();
    const { totals_credit_debit_transactions } = data;
    // console.log(totals_credit_debit_transactions);
    let credit = 0;
    let debit = 0;
    totals_credit_debit_transactions.forEach((element) => {
      if (element.type === "credit") {
        credit = credit + element.sum;
      } else {
        debit = debit + element.sum;
      }
    });
    // console.log(credit);
    // console.log(debit);
    this.setState({ credit: credit, debit: debit });
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
    // console.log("sorted", sortedTransactions);
    // const slicedData = sortedTransactions.slice(0, 3);
    // console.log(slicedData);
    this.setState({ transactions: sortedTransactions });
  };

  componentDidMount = () => {
    const user_id = Cookies.get("user_id");
    // console.log(user_id);
    this.getProfileDetails(user_id);
    this.getCreditDebitTotal(user_id);
    this.getLatestTransactions(user_id);
  };

  /*componentDidUpdate = () => {
    const { result } = this.state;
    {
      result && this.updateTransactions();
    }
  };*/

  /* updateTransactions = async () => {
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
  };*/

  /* addTransactionForm = () => {
    // console.log("helllo!!");
    this.setState({ addTransaction: true });
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

  validateForm = () => {
    const { transName, transType, category, amount, date } = this.state;
    //console.log(transName);
    // console.log(transType);
    // console.log(category);
    //  console.log(amount);
    //  console.log(date);

    if (
      transName !== "" &&
      transType !== "" &&
      category !== "" &&
      amount !== 0 &&
      date !== ""
    ) {
      this.setState({ result: true });
      return true;
    } else {
      this.setState({ result: false });
      return false;
    }
  };

  updateInfo = () => {
    alert("updated");
    this.setState({
      transName: "",
      transType: "debit",
      category: "Shopping",
      amount: 0,
      date: "",
    });
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
  };*/

  dataFromModal = (addedTrans) => {
    console.log("from Modal");
    console.log("from", addedTrans);
    this.setState({ transactions: addedTrans });
  };

  render() {
    const {
      isLoading,
      email,
      name,
      credit,
      debit,
      transactions,
      addTransaction,
      // transName,
      // transType,
      // category,
      // amount,
      // date,
      //  result,
    } = this.state;
    //let res;

    // const user_id = Cookies.get("user_id");
    // console.log(addTransaction);
    //console.log(user_id);

    console.log("transactions", transactions);
    const slicedData = transactions.slice(0, 3);
    return (
      <div className="dashboard-bg-container">
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
            <NavBar name={name} email={email} />
            <div className="dashboard-right-container">
              <div className="dashboard-upper-section">
                <h1 className="dashboard-heading">Accounts</h1>
                <ModalForAdd dataFromModal={this.dataFromModal} />
              </div>

              <div className="dashboard-lower-section">
                <div className="dashboard-debit-credit-container">
                  <Credit credit={credit} />
                  <Debit debit={debit} />
                </div>
                <p className="para">Last Transactions</p>
                <ul className="latest-transactions-card">
                  {slicedData.map((each) => (
                    <LatestTransaction
                      each={each}
                      key={each.id}
                      dataFromModal={this.dataFromModal}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default DashBoard;
