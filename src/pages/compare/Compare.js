import React, { useEffect } from "react";
import ratingImg1 from "../../assets/images/unsplash_XZ3EmAIWuz0.png";
import { MContainer, MLink } from "../../element/Elemens";
import "../../assets/scss/_compare.scss";
import { CgSoftwareUpload } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { compareList } from "../../redux/actions/compareActions";
import PreLoader from "../../component/PreLoader/PreLoader";
import { Link } from "react-router-dom";
const API_URL = "https://admin-nova.ru";

const Compare = () => {
  const dispatch = useDispatch();

  const compare_list = useSelector((state) => state.compare.list);
  const { loading } = useSelector((state) => state.compare);
  const { step } = useSelector((state) => state.compare);

  useEffect(() => {
    dispatch(compareList());
  }, [step]);

  return (
    <>
      <MContainer className="!mt-4 c8">
        <Link to="/">Главная страница / </Link>
        <span className="c8">Сравнение товара</span>
      </MContainer>
      <MContainer className="md:pb-16 py-8">
        {loading && <PreLoader />}
        {!loading && (
          <div className="box compare__box py-2 px-2">
            {compare_list.length > 0 ? (
              compare_list.map((compare, idx) => (
                <div key={idx} className="rating__box">
                  <div className="rating__about padding">
                    <img
                      className="rating__image mr-4"
                      src={`${API_URL}/${compare.photo}`}
                      alt="not found"
                    />
                    <div className="rating">
                      <div className="rating__title">{compare.name}</div>
                      <div>{compare.price?.toLocaleString("ru-RU")} сум</div>
                      <div className="rating__number">
                        <span>{compare.rating}</span>
                        <span>Общая оценка</span>
                      </div>
                      {compare.shop && (
                        <MLink
                          to={"/selleradres/" + compare.shop?.id}
                          className="rating__link"
                        >
                          {compare.shop?.name}
                          <CgSoftwareUpload
                            className="ml-2"
                            size={24}
                            fill={"#FF1B1B"}
                          />
                        </MLink>
                      )}
                    </div>
                  </div>
                  <div className="r__type padding border-top">
                    <div className="w-full">
                      <div className="character__title mb-4">
                        Характеристики
                      </div>
                      {compare.filters?.length > 0 ? (
                        compare.filters?.map((item, idx) => (
                          <>
                            {item.name !== null && (
                              <div
                                key={idx}
                                className={`compare-line lg:w-2/4 w-full flex items-center lg:flex-nowrap flex-wrap justify-between`}
                              >
                                <div>{item.name}</div>
                                <div>{item.value}</div>
                              </div>
                            )}
                          </>
                        ))
                      ) : (
                        <div className="text-sm md:text-base">
                          Нет характеристики
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4" style={{ height: "500px" }}>
                Сравнений пока нет
              </div>
            )}
          </div>
        )}
      </MContainer>
    </>
  );
};

export default Compare;
