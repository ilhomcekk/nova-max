import React from "react";
import { MLink } from "../../element/Elemens";
import "../../assets/scss/_newsBox.scss";
import { Link } from "react-router-dom";
import { MdOutlineDateRange } from "react-icons/md";
import parse from "html-react-parser";
const language = window.localStorage.getItem("novamarkt-Content-language");

const API_URL = "https://admin-nova.ru/";

export default function NewsBox({ news }) {
  return (
    <div className="news-box__box">
      <Link to={`/mnews/${news.id}`}>
        <img
          src={`${API_URL}${news.photo}`}
          alt="not found"
          style={{ flexShrink: "0" }}
        />
      </Link>
      <div className="box__text">
        <div className="box__title">{news.name}</div>
        {parse(news.description_mini)}
        <div className="n__date">
          <MLink
            className="duration-200 hover:bg-slate-50"
            to={`/mnews/${news.id}`}
          >
            {language === "ru" && "Подробно"}
            {language === "uz" && "Batafsil"}
            {language === "en" && "Detail"}
          </MLink>
          <span className="flex items-center">
            <MdOutlineDateRange className="!mr-2" fill="#999" size={19} />{" "}
            {news.date}
          </span>
        </div>
      </div>
    </div>
  );
}
