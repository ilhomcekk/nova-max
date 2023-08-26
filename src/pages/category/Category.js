import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { MContainer } from "../../element/Elemens";
import { getSubCategoriesAll } from "../../redux/actions/categoryActions";
import "../../assets/scss/_category.scss";
import Title from "../../component/Title/Title";
import { Box, Skeleton } from "@mui/material";
const API_URL = `https://admin-nova.ru/`;

const Category = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [currentCategory, setCurrentCategory] = useState();

  useEffect(() => {
    dispatch(getSubCategoriesAll(id));
  }, [id]);

  const subCategory = useSelector((state) => state.category.subCategory);
  const { loading } = useSelector((state) => state.category);
  const categoryList = useSelector((state) => state.category.list);
  const handleCategory = async () => {
    const category = await categoryList?.find((item) => item.id == id);
    return setCurrentCategory(category);
  };
  handleCategory();

  return (
    <div style={{ minHeight: "70vh" }}>
      <MContainer className="!my-4 c8">
        {loading ? (
          <Skeleton width={"25%"} />
        ) : (
          <>
            <Link to="/">Главная страница / </Link>
            <Link to="">{currentCategory?.name}</Link>
          </>
        )}
      </MContainer>
      <MContainer>
        <Title
          name={`${
            subCategory?.length > 0 ? "Подкатегории" : "Нет подкатегории"
          }`}
          m="mt-8"
        />
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 my-12">
          {loading
            ? [...Array(10)].map(() => (
                <Box>
                  <Skeleton height={"180px"} width="100%" />
                  <Skeleton width={"100%"} height="30px" />
                </Box>
              ))
            : subCategory?.map((item) => (
                <Link
                  className="sub__category-link"
                  key={item.id}
                  to={`/filter/${item.id}/page=1`}
                >
                  <img src={API_URL + item.photo} alt="" />
                  <div className="text">{item.name}</div>
                </Link>
              ))}
        </div>
      </MContainer>
    </div>
  );
};

export default Category;
