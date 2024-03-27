import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom"

import "./Topbar.css";

export default function Topbar() {
  const [allTopBarData,setAllTopBarData] = useState([])


  useEffect(() => {
    fetch(`http://localhost:4000/v1/menus/topbar`)
    .then(res => res.json())
    .then(data => setAllTopBarData(data))
  },[])

  const getRandomItems = (allTopBarData,randomCount) => {

    const shufleData = allTopBarData.sort(() => 0.5 -  Math.random())
    return shufleData.slice(0,randomCount)
  }


  return (
    <div className="top-bar">
      <div className="container-fluid">
        <div className="top-bar__content">
          <div className="top-bar__right">
            <ul className="top-bar__menu">
            {
              getRandomItems(allTopBarData,5).map((link) => (
                <li className="top-bar__item">
                <Link to={`/course-info${link.href}`} className="top-bar__link">
                  {link.title}
                </Link>
              </li>
              ))
            }
            </ul>
          </div>
          <div className="top-bar__left">
            <div className="top-bar__email">
              <a href="#" className="top-bar__email-text top-bar__link">
                sabzlearn@gmail.com
              </a>
              <i className="fas fa-envelope top-bar__email-icon"></i>
            </div>
            <div className="top-bar__phone">
              <a href="#" className="top-bar__phone-text top-bar__link">
                09921558293
              </a>
              <i className="fas fa-phone top-bar__phone-icon"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
