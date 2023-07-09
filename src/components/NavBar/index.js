import { Component } from "react";
import { Link } from "react-router-dom";
import { LogoutRouter } from "../ModalForLogout/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faMoneyCheck } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

import Cookies from "js-cookie";

import "./index.css";

class NavBar extends Component {
  state = {
    isDashboardActive: true,
    isTransactActive: false,
    isProfileActive: false,
  };

  onClickTransactionNav = () => {
    this.setState({
      isDashboardActive: false,
      isTransactActive: true,
      isProfileActive: false,
    });
  };

  onClickProfile = () => {
    this.setState({
      isDashboardActive: false,
      isTransactActive: false,
      isProfileActive: true,
    });
  };

  onClickDashBoard = () => {
    this.setState({
      isDashboardActive: true,
      isTransactActive: false,
      isProfileActive: false,
    });
  };

  render() {
    //  const { isDashboardActive, isTransactActive, isProfileActive } = this.state;

    const {
      email,
      name,
      isDashboardActive,
      isTransactActive,
      isProfileActive,
    } = this.props;
    //console.log(email, name);
    console.log(isDashboardActive);
    console.log(isTransactActive);
    console.log(isProfileActive);
    let isDashboardActive1;
    let isTransactActive1;
    let isProfileActive1;
    isDashboardActive === undefined
      ? (isDashboardActive1 = true)
      : (isDashboardActive1 = isDashboardActive);
    isTransactActive === undefined
      ? (isTransactActive1 = false)
      : (isTransactActive1 = isTransactActive);
    isProfileActive === undefined
      ? (isProfileActive1 = false)
      : (isProfileActive1 = isProfileActive);
    const dashboardNavItemPara = isDashboardActive1
      ? "nav-item active-nav"
      : "nav-item";
    const dashboardNavItemIcon = isDashboardActive1
      ? "nav-item-icon active-nav"
      : "nav-item-icon";
    const transactionNavItemPara = isTransactActive1
      ? "nav-item active-nav"
      : "nav-item";
    const transactionNavItemIcon = isTransactActive1
      ? "nav-item-icon active-nav"
      : "nav-item-icon";
    const profileNavItemPara = isProfileActive1
      ? "nav-item active-nav"
      : "nav-item";
    const profiledNavItemIcon = isProfileActive1
      ? "nav-item-icon active-nav"
      : "nav-item-icon";
    return (
      // {isLoading ? <Loader type="TailSpin" color="#00BFFF" height={50} width={50}/>: }
      <div className="navbar">
        <div className="navbar-upper-part">
          <img
            src="https://res.cloudinary.com/digbzwlfx/image/upload/v1688575669/Frame_507_rrfgtu.png"
            alt="logo"
            className="website-logo"
          />

          <nav>
            <ul className="navbar-list-container">
              <Link
                to="/"
                onClick={this.onClickDashBoard}
                className="navbar-link-container"
              >
                <li className="nav-item-container">
                  <FontAwesomeIcon
                    icon={faHouse}
                    className={dashboardNavItemIcon}
                  />
                  <p className={dashboardNavItemPara}>Dashboard</p>
                </li>
              </Link>
              <Link
                to="/transactions"
                onClick={this.onClickTransactionNav}
                className="navbar-link-container"
              >
                <li className="nav-item-container">
                  <FontAwesomeIcon
                    icon={faMoneyCheck}
                    className={transactionNavItemIcon}
                  />
                  <p className={transactionNavItemPara}>Transactions</p>
                </li>
              </Link>
              <Link
                to="/profile"
                onClick={this.onClickProfile}
                className="navbar-link-container"
              >
                <li className="nav-item-container">
                  <FontAwesomeIcon
                    icon={faUser}
                    className={profiledNavItemIcon}
                  />
                  <p className={profileNavItemPara}>Profile</p>
                </li>
              </Link>
            </ul>
          </nav>
        </div>
        <div className="navbar-profile-container">
          <div className="profile-card">
            <div className="card">
              <FontAwesomeIcon
                icon={faUser}
                className="navbar-profile-avatar"
              />
              <div className="navbar-profile-details-container">
                <p className="nav-item-name">{name}</p>
                <p className="nav-item-email">{email}</p>
              </div>

              <LogoutRouter />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;
