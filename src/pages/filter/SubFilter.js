import React, { useRef } from "react";
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
  IconButton,
  Skeleton,
} from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
// import Slider from '@mui/material/Slider';
// import Slider from 'react-rangeslider';
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { BsArrowDown, BsArrowUp, BsChevronDown } from "react-icons/bs";
import Title from "../../component/Title/Title";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import {
  getBrands,
  getProductGalleryAll,
  getProductPriceDown,
  getProductPriceUp,
  getProductsByBrand,
  getProductSortNew,
} from "../../redux/actions/filterActions";
import {
  getProductsByCategory,
  subCategoryFilter,
} from "../../redux/actions/categoryActions";
import PreLoader from "../../component/PreLoader/PreLoader";
import FilterSwitch from "./FilterSwitch";
import e from "cors";
import { IoIosArrowDown } from "react-icons/io";
import ProductSkelet from "../../component/loading/ProductSkelet";

export default function Filter() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { slug } = useParams();
  const pageNumber = slug?.replace(/\D/g, "");
  const location = useLocation();
  const { pathname } = location;
  const [categoryId, setCategoryId] = useState();
  const [currentCategory, setCurrentCategory] = useState();
  const [currentSubCategory, setCurrentSubCategory] = useState();
  const [currentSubSubCategory, setCurrentSubSubCategory] = useState();
  const categoryList = useSelector((state) => state.category.list);
  const handleCategoryId = async () => {
    let splitLocation = await pathname?.split("/")?.[2];
    setCategoryId(splitLocation);
  };
  handleCategoryId();
  const handleCategory = async () => {
    const category = await categoryList?.find((item) =>
      item?.childs?.find((item) => item.id == categoryId)
    );
    const subCategory = await category?.childs?.find(
      (item) => item.id == categoryId
    );
    setCurrentCategory(category);
    return setCurrentSubCategory(subCategory);
  };
  handleCategory();
  const handleSubCategory = async () => {
    const subSubCategory = await currentSubCategory?.childs?.find(
      (item) => item.id == id
    );
    setCurrentSubSubCategory(subSubCategory);
  };
  handleSubCategory();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState({ page: pageNumber, "per-page": 24 });
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(priceMin);

  useEffect(() => {
    let newFilter = {
      ...filter,
      page: pageNumber,
    };
    setFilter(newFilter);
    dispatch(getProductGalleryAll(id, newFilter));
  }, [slug, pageNumber]);

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
  }, [id]);

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
    navigate(
      `/filter/${currentSubCategory?.id}/sub-category/${currentSubSubCategory?.id}/page=${value}`
    );
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
              <Link to={`/category/${currentCategory?.id}`}>
                {currentCategory?.name} /{" "}
              </Link>
              <Link to={`/filter/${currentSubCategory?.id}/page=1`}>
                {currentSubCategory?.name} /{" "}
              </Link>
              <Link to="">{currentSubSubCategory?.name}</Link>
            </>
          )}
        </div>
      </MContainer>
      <MContainer key={id}>
        <Title name="Фильтры" />
        <div>
          <div className="filter">
            <div className="sidebar__filter">
              <div className="filter-ani">
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
                        to={`/filter/${categoryId}/sub-category/${item.id}/page=1`}
                        className={`block px-2 py-1 text-gray-400 rounded leading-tight hover:!text-black duration-200 ${
                          item.id == id && "!text-black"
                        }`}
                        key={idx}
                      >
                        {loading2 ? <Skeleton width={"100%"} /> : item?.name}
                      </Link>
                    ))}
                  </AccordionDetails>
                </Accordion>
                <div
                  className="flex gap-4 items-center justify-between pb-4"
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
                      navigate(
                        `/filter/${currentSubCategory?.id}/sub-category/${currentSubSubCategory?.id}/page=1`
                      );
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
            </div>
            <div className="all__products">
              {/* <div className="products__menu">
                <ul className="flex flex-wrap">
                  <div className="flex items-center mr-auto">
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
                </ul>
              </div> */}
              <div className="products">
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
