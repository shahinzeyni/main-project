import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../Context/authContext";
import "./Navbar.css";

export default function Navbar() {
  const authContext = useContext(AuthContext);

  const [allNavBarData, setAllNavBarData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/menus`)
      .then(res => res.json())
      .then(data =>{

         setAllNavBarData(data)
        });
  }, []);

  return (
    <div className="main-header">
      <div className="container-fluid">
        <div className="main-header__content">
          <div className="main-header__right">
            <img
              src="/images/logo/Logo.png"
              className="main-header__logo"
              alt="لوگوی سبزلرن"
            />

            <ul className="main-header__menu">
              <li className="main-header__item">
                <Link to="/" className="main-header__link">
                  صفحه اصلی
                </Link>
              </li>
              {allNavBarData.map((menu) => (
                <li className="main-header__item">
                  <Link to={`/category-info${menu.href}/1`} className="main-header__link">
                    {menu.title}
                    {menu.submenus.length !== 0  && (
                      <>
                        <i className="fas fa-angle-down main-header__link-icon" />
                        <ul className="main-header__dropdown">
                          {menu.submenus.map((sub) => (
                            <>
                              <li className="main-header__dropdown-item">
                                <Link
                                  to={`/course-info${sub.href}`}
                                  className="main-header__dropdown-link"
                                >
                                   {sub.title}
                                </Link>
                              </li>
                            </>
                          ))}
                        </ul>
                      </>
                    )}
                  </Link>
                </li>
              ))}

              <li className="main-header__item">
                <a href="#" className="main-header__link">
                  مقالات
                </a>
              </li>
            </ul>
          </div>

          <div className="main-header__left">
            <a href="#" className="main-header__search-btn">
              <i className="fas fa-search main-header__search-icon" />
            </a>
            <a href="#" className="main-header__cart-btn">
              <i className="fas fa-shopping-cart main-header__cart-icon" />
            </a>
            {authContext.isLoggedIn ? (
              <Link to="/" className="main-header__profile">
                <span className="main-header__profile-text">
                  {authContext.userInfos.name}
                </span>
              </Link>
            ) : (
              <Link to="/login" className="main-header__profile">
                <span className="main-header__profile-text">
                  ورود / ثبت نام
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
