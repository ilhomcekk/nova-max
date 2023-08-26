import React from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { MLink } from "../../element/Elemens";
import "../../assets/scss/_newsBox.scss";
const API_URL = "https://admin-nova.ru";
const language = window.localStorage.getItem("novamarkt-Content-language");

const NewsCart = ({ item }) => {
  return (
    <Link to={`/mnews/${item?.id}`} className="news-box__box" key={item?.id}>
      <div className="date">{item?.date}</div>
      <div to={`/mnews/${item.id}`}>
        <img
          src={API_URL + item.photo}
          alt="not found"
          style={{ flexShrink: "0" }}
        />
      </div>
      <div className="box__text">
        <div className="box__title">{item.name}</div>
        <div style={{ color: "#757575" }}>{parse(item.description_mini)}</div>
      </div>
    </Link>
  );
};

export default NewsCart;
