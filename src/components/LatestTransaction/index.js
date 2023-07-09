import { Component } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import "./index.css";

class LoginPage extends Component {
  state = {
    username: "",
    password: "",
    setError: false,
  };

  onSubmitSuccess = (userId) => {
    console.log("props", this.props);
    const { navigate } = this.props;
    console.log(navigate);
    Cookies.set("user_id", userId, { expires: 30 });
    navigate("/", { replace: true });
  };
  onSubmitFailure = () => {
    this.setState({ setError: true });
  };

  submitForm = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    Cookies.set("password", password);
    const url = `https://bursting-gelding-24.hasura.app/api/rest/get-user-id?email=${username}&password=${password}`;
    //console.log(url);
    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "x-hasura-admin-secret":
          "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
      },
    };
    const response = await fetch(url, options);
    // console.log(response);
    const data = await response.json();
    // console.log(data);
    // console.log(data.get_user_id);
    const { get_user_id } = data;
    // console.log(get_user_id);

    if (response.ok === true) {
      if (get_user_id.length === 0) {
        this.onSubmitFailure();
      }
      const { id } = get_user_id[0];
      //console.log("id", id);
      this.onSubmitSuccess(id);
    }
  };

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value, setError: false });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value, setError: false });
  };

  renderPasswordField = () => {
    const { password } = this.state;
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-filed"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    );
  };

  renderUsernameField = () => {
    const { username } = this.state;
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-filed"
          value={username}
          onChange={this.onChangeUsername}
        />
      </>
    );
  };

  render() {
    const { setError } = this.state;
    const user_id = Cookies.get("user_d");
    if (user_id !== undefined) {
      const { navigate } = this.props;
      return navigate("/");
    }

    return (
      <div className="login-form-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="login-website-logo-mobile-image"
          alt="website logo"
        />
        <img
          src="https://res.cloudinary.com/digbzwlfx/image/upload/v1688575248/transaction_hatxct.avif"
          className="login-image"
          alt="website login"
        />
        <form className="form2-container" onSubmit={this.submitForm}>
          <img
            src="https://res.cloudinary.com/digbzwlfx/image/upload/v1688575669/Frame_507_rrfgtu.png"
            className="login-website-logo-desktop-image"
            alt="website logo"
          />
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
          {setError && <p className="error-message">Invalid Credentials!!!</p>}
        </form>
      </div>
    );
  }
}

export function LoginRouter(props) {
  console.log(props);
  const navigate = useNavigate();
  return <LoginPage navigate={navigate} />;
}

export default LoginPage;
