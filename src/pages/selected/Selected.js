import React from "react";
import "../../assets/scss/_selected.scss";
import { Cart } from "../../component/Cart/Cart";
import Title from "../../component/Title/Title";
import { MContainer } from "../../element/Elemens";
import SecondNavbar from "../../component/layout/SecondNavbar";
import { useSelector } from "react-redux";
import { TabPanel, Tabs } from "react-tabs";
import ProductsViewed from "../../component/ProductsViewed/ProductsViewed";

export default function Selected() {
  const favoriteList = useSelector((state) => state.favorite.favoritiesList);

  return (
    <>
      <SecondNavbar />
      <MContainer className="md:py-12 py-8">
        <Title name="Избранное" />
        <Tabs className="mini__page">
          <TabPanel>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
              {favoriteList?.length > 0 ? (
                favoriteList?.map((favorite, idx) => (
                  <Cart key={idx} product={favorite} />
                ))
              ) : (
                <div className="py-12">Избранных товаров нет</div>
              )}
            </div>
          </TabPanel>
        </Tabs>
        <br />
        <Title name="Вы недавно смотрели" />
        <ProductsViewed />
      </MContainer>
    </>
  );
}
