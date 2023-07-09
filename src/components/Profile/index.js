import { Component } from "react";
import NavBar from "../NavBar/index";
import Cookies from "js-cookie";
import ModalForAdd from "../ModalForAdd/index";
import Loader from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import "./index.css";

class Profile extends Component {
  state = {
    transactions: [],
    isLoading: true,
    name: "",
    email: "",
    id: 0,
    country: "",
    date_of_birth: "",
    city: "",
    permanent_address: "",
    postal_address: "",
    present_address: "",
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
    const {
      email,
      name,
      id,
      country,
      date_of_birth,
      city,
      permanent_address,
      postal_address,
      present_address,
    } = users[0];
    this.setState({
      email: email,
      name: name,
      isLoading: false,
      id,
      country,
      date_of_birth,
      city,
      permanent_address,
      postal_address,
      present_address,
    });
  };

  componentDidMount = () => {
    const user_id = Cookies.get("user_id");
    // console.log(user_id);
    this.getProfileDetails(user_id);
  };
  dataFromModal = (addedTrans) => {
    console.log("from Modal");
    console.log("from", addedTrans);
    this.setState({ transactions: addedTrans });
  };

  render() {
    const password = Cookies.get("password");
    const {
      isLoading,
      email,
      name,
      id,
      country,
      date_of_birth,
      city,
      permanent_address,
      postal_address,
      present_address,
    } = this.state;
    return (
      <div className="profile-bg-container">
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
              isTransactActive={false}
              isProfileActive={true}
            />
            <div className="profile-right-container">
              <div className="profile-upper-section">
                <h1 className="profile-heading">Profile</h1>
                <ModalForAdd dataFromModal={this.dataFromModal} />
              </div>
              <div className="profile-lower-section">
                <div className="profile-container">
                  <div className="profile-icon">
                    <FontAwesomeIcon icon={faUser} className="icon" />
                  </div>
                  <div className="details-cont">
                    <div className="profile-each-field-container">
                      <label className="label">Your Name</label>
                      <input type="text" value={name} className="input-box" />
                    </div>
                    <div className="profile-each-field-container">
                      <label className="label">User Name</label>
                      <input type="text" value={name} className="input-box" />
                    </div>
                    <div className="profile-each-field-container">
                      <label className="label">Email</label>
                      <input type="text" value={email} className="input-box" />
                    </div>
                    <div className="profile-each-field-container">
                      <label className="label">Password</label>
                      <input
                        type="password"
                        value={password}
                        className="input-box"
                      />
                    </div>
                    <div className="profile-each-field-container">
                      <label className="label">Date of Birth</label>
                      <input
                        type="text"
                        value={date_of_birth}
                        className="input-box"
                      />
                    </div>

                    <div className="profile-each-field-container">
                      <label className="label">Current Address</label>
                      <input
                        type="text"
                        value={present_address}
                        className="input-box"
                      />
                    </div>
                    <div className="profile-each-field-container">
                      <label className="label">Permanent Address</label>
                      <input
                        type="text"
                        value={permanent_address}
                        className="input-box"
                      />
                    </div>
                    <div className="profile-each-field-container">
                      <label className="label">City</label>
                      <input type="text" value={city} className="input-box" />
                    </div>
                    <div className="profile-each-field-container">
                      <label className="label">Postal Code</label>
                      <input
                        type="text"
                        value={postal_address}
                        className="input-box"
                      />
                    </div>
                    <div className="profile-each-field-container">
                      <label className="label">Country</label>
                      <input
                        type="text"
                        value={country}
                        className="input-box"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default Profile;
