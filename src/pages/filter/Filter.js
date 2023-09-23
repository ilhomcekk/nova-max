import React from "react";
import { useForm } from "react-hook-form";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import "../../assets/scss/_filter.scss";
import "react-hook-form";
import NavbarMenu from "../../container/NavbarMenu";
import { Cart } from "../../component/Cart/Cart";
import { MContainer } from "../../element/Elemens";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Pagination,
  Skeleton,
} from "@mui/material";
import "react-rangeslider/lib/index.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { getProductGalleryAll } from "../../redux/actions/filterActions";
import { subCategoryFilter } from "../../redux/actions/categoryActions";
import { IoIosArrowDown } from "react-icons/io";
import ProductSkelet from "../../component/loading/ProductSkelet";
import FilterSwitch from "./FilterSwitch";
import Title from "../../component/Title/Title";

export default function Filter() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const { id } = useParams();
  const { slug } = useParams();
  const pageNumber = slug?.replace(/\D/g, "");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    page: pageNumber,
    "per-page": 24,
  });
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(priceMin);

  useEffect(() => {
    let newFilter = {
      ...filter,
      page: pageNumber,
    };
    setFilter(newFilter);
    dispatch(getProductGalleryAll(id, newFilter));
  }, [pageNumber]);

  // const filterNam = f
  const handleFilter = (id, value, type) => {
    setFilter((prevState) => {
      return {
        ...prevState,
        [`filter[${id}]`]: id,
      };
    });
  };
  const [sortProduct, setSortProduct] = useState(0);

  useEffect(() => {
    dispatch(getProductGalleryAll(id, filter));
    // dispatch(getProductsByBrand());
    // dispatch(getBrands());
    // dispatch(getProductsByCategory(id, params));
    dispatch(subCategoryFilter(id));
  }, [id, slug]);

  const galleryProductList = useSelector((state) => state.filter.list);
  // let galleryProductsByCategory = galleryProductList?.filter(
  //   (item) => item.category?.id == id
  // );
  const { productsByCategory } = useSelector((state) => state.category);
  const { productsByCategoryPagination } = useSelector(
    (state) => state.category
  );
  const filters = useSelector((state) => state.category.subCategory);
  const { loading2 } = useSelector((state) => state.filter);
  const { galleryPagination } = useSelector((state) => state.filter);
  const productFelter = useSelector((state) => state.filter.list);
  const shopFilter = useSelector((state) => state.filter.shopList);
  const categoryList = useSelector((state) => state.category.list);
  const [currentCategory, setCurrentCategory] = useState();
  const [currentSubCategory, setCurrentSubCategory] = useState();
  const handleCategory = async () => {
    const category = await categoryList?.find((item) =>
      item?.childs?.find((item) => item.id == id)
    );
    const subCategory = await category?.childs?.find((item) => item.id == id);
    setCurrentCategory(category);
    return setCurrentSubCategory(subCategory);
  };
  handleCategory();

  const { handleSubmit } = useForm({});

  const onSubmit = (data) => {
    setSearchParams({
      ...data,
      filter,
    });
    dispatch(
      getProductGalleryAll({
        ...data,
        filter,
      })
    );
  };

  const onPageChange = (event, value) => {
    navigate(`/filter/${id}/page=${value}`);
    let newFilter = {
      ...filter,
      page: value,
    };
    setFilter(newFilter);
    dispatch(getProductGalleryAll(id, newFilter));
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <NavbarMenu />
      <MContainer>
        <div className="pages-link my-4 c8">
          {loading2 ? (
            <Skeleton width={"50%"} />
          ) : (
            <>
              <Link to="/">Главная страница / </Link>
              {currentCategory?.id && (
                <Link to={`/category/${currentCategory?.id}`}>
                  {currentCategory?.name} /{" "}
                </Link>
              )}
              {currentSubCategory?.name && (
                <Link to="">{currentSubCategory?.name}</Link>
              )}
            </>
          )}
        </div>
      </MContainer>
      <MContainer key={id} className="!mt-8" style={{ minHeight: "60vh" }}>
        <div>
          <div className="filter">
            <div className="sidebar__filter">
              {currentSubCategory?.name && (
                <>
                  <div className="font-bold">Категории</div>
                  <Accordion expanded={true} className="my-2 pb-8">
                    <AccordionSummary
                      expandIcon={<IoIosArrowDown className="!fill-gray-400" />}
                    >
                      <Typography className="!text-gray-400 !leading-none">
                        {loading2 ? (
                          <Skeleton width={"100%"} />
                        ) : (
                          currentSubCategory?.name
                        )}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {currentSubCategory?.childs?.map((item, idx) => (
                        <Link
                          to={`/filter/${id}/sub-category/${item.id}/page=1`}
                          className={`block text-gray-400 ${
                            item.id == id && "bg-gray-200"
                          }`}
                          style={{ fontSize: "15px" }}
                          key={idx}
                        >
                          {loading2 ? <Skeleton width={"100%"} /> : item?.name}
                        </Link>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                </>
              )}
              <Title name="Фильтры" />
              <div
                className="flex gap-4 flex-col items-center justify-between mb-2"
                style={{ width: "-webkit-fill-available" }}
              >
                <label>
                  От
                  <input
                    onChange={(e) => {
                      let newFilter = {
                        ...filter,
                        price_min: e.target.value,
                      };
                      setPriceMin(e.target.value);
                      setFilter(newFilter);
                    }}
                    className="mt-2 border w-full rounded-full text-black px-4 py-2"
                    type="number"
                  />
                </label>
                <label>
                  До
                  <input
                    onChange={(e) => {
                      let newFilter = {
                        ...filter,
                        price_max: e.target.value,
                      };
                      setPriceMax(e.target.value);
                      setFilter(newFilter);
                    }}
                    className="mt-2 border w-full rounded-full text-black px-4 py-2"
                    type="number"
                  />
                </label>
              </div>
              {filters.map((item, idx) => (
                <FilterSwitch
                  key={idx}
                  input={item}
                  handleFilter={handleFilter}
                />
              ))}
              <div className="filter__buttons flex">
                <button
                  onClick={() => {
                    let newFilter = {
                      ...filter,
                      page: 1,
                    };
                    navigate(`/filter/${id}/page=1`);
                    setFilter(newFilter);
                    dispatch(getProductGalleryAll(id, newFilter));
                  }}
                  type="submit"
                  className="filter"
                >
                  Искать
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="reset"
                  type="submit"
                >
                  Сбросить
                </button>
              </div>
            </div>
            <div className="all__products">
              {/* <div className="products__menu">
                <ul className="flex flex-wrap">
                  <span className="c8">Сортировать по:</span>
                  <Button
                    onClick={() => {
                      dispatch(getProductSortNew());
                      setSortProduct(3);
                    }}
                    style={{
                      color: "#131e3d",
                      background:
                        sortProduct === 3 && "rgba(25, 118, 210, 0.04)",
                    }}
                    className="ml-4 c8"
                  >
                    Новинки
                  </Button>
                  <div className="flex items-center ml-auto">
                    <div className="c8 mr-2">По цене:</div>
                    <IconButton
                      size="small"
                      onClick={() => {
                        dispatch(getProductPriceUp());
                        setSortProduct(2);
                      }}
                      style={{
                        color: "#131e3d",
                        background:
                          sortProduct === 2 && "rgba(25, 118, 210, 0.04)",
                      }}
                    >
                      <BsArrowUp fill="#c8c8c8" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => {
                        dispatch(getProductPriceDown());
                        setSortProduct(1);
                      }}
                      style={{
                        color: "#131e3d",
                        background:
                          sortProduct === 1 && "rgba(25, 118, 210, 0.04)",
                      }}
                    >
                      <BsArrowDown fill="#c8c8c8" />
                    </IconButton>
                  </div>
                </ul>
              </div> */}
              <div className="products">
                <>
                  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-3 mb-8">
                    {loading2 ? (
                      <ProductSkelet length={20} />
                    ) : galleryProductList?.length > 0 ? (
                      galleryProductList?.map((product, idx) => (
                        <Cart key={idx} product={product} />
                      ))
                    ) : (
                      "Нет результатов"
                    )}
                  </div>
                  {galleryProductList?.length > 0 && (
                    <div className="flex items-center justify-center my-12">
                      <Pagination
                        onChange={onPageChange}
                        count={galleryPagination?.pageCount}
                        defaultPage={galleryPagination?.currentPage}
                        color="error"
                      />
                    </div>
                  )}
                </>
              </div>
              {/* <div className="products">
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-3">
                {productsList.map((product, index) => (
                  <Cart key={index} product={product} />
                ))}
              </div>
            </div> */}
              {/* <div className="products">
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-3">
                {productsList.map((product, index) => (
                  <Cart key={index} product={product} />
                ))}
              </div>
            </div> */}
            </div>
          </div>
        </div>
      </MContainer>
    </>
  );
}
