import React from "react";
import "../../assets/scss/_return_product.scss";
import Title from "../../component/Title/Title";
import { MContainer } from "../../element/Elemens";

export default function ReturnProduct() {
  return (
    <>
      <div>
        <MContainer className="r-product md:py-12 py-8">
          <Title name="Правила возврата товаров" />
          <div className="product__title">Уважаемый покупатель!</div>
          <p>
            Мы стремимся обеспечить вас качественными товарами и приятным опытом
            покупок в нашем интернет-магазине nova-max.ru. Однако, если у вас
            возникла необходимость вернуть товар, ознакомьтесь, пожалуйста, с
            нашими правилами возврата.
          </p>
          <h1>Возврат товара надлежащего качества:</h1>
          <p>
            1. Срок возврата товара надлежащего качества составляет 14 дней с
            момента получения товара, если иное не было оговорено при продаже
            товара.
          </p>
          <p>
            2. Товар принимается к возврату только в полной комплектации, со
            всеми упаковками и наклейками, в неношеном/неиспользованном виде.
          </p>
          <p>
            3. Причинами для возврата товара со стороны Покупателя могут быть
            следующие:
            <div className="pl-5">
              - Не подошел размер, фасон, цвет, длина и т.п.{" "}
            </div>
            <div className="pl-5">
              - Оттенок полученного товара отличается от оттенка модели с
              фотографии на сайте.
            </div>
          </p>
          <h1>Способы возврата товара надлежащего качества:</h1>
          <p>
            1. Самостоятельный возврат в фирменные пункты выдачи/возврата
            NovaMax.
          </p>
          <p>
            2. Возврат курьером: Услуга предоставляется жителям городов, где
            есть курьерская доставка. На один день возможно оформить на возврат
            с помощью курьера не более 10 позиций. Количество товаров для
            возврата в пунктах выдачи не ограничено.
          </p>
          <h1>Возврат товара ненадлежащего качества:</h1>
          <p>
            1. Возврат товара осуществляется посредством оформления заявки в
            Личном кабинете.
          </p>
          <p>2. Срок рассмотрения заявки не превышает 7 (семь) рабочих дней.</p>
          <p>
            3. В случае, если по результату рассмотрения заявки Продавцом
            принято положительное решение, покупатель может передать товар для
            возврата в Пункт выдачи заказов NovaMax.
          </p>
          <p>
            4. В случае отклонения заявки, покупатель вправе обратиться в
            независимую экспертизу. В случае, если независимой экспертизой будет
            подтверждено право покупателя на возврат товара, все расходы
            покупателя, связанные с проведением независимой экспертизы, подлежат
            возмещению Продавцом.
          </p>
          <p>
            Настоящие правила носят рекомендательный характер и не ограничивают
            покупателя в правах, связанных с предъявлением требований Продавцу,
            предусмотренных действующим законодательством.
          </p>
          <p>Благодарим за понимание и сотрудничество!</p>
          {/* <div className="warning">
            <span>!</span>
            <p>
              Товар принимается к возврату только в полной комплектации, со
              всеми упаковками и наклейками, в неношеном/неиспользованном виде
            </p>
          </div>
          <h1>
            Возврат товара надлежащего качества осуществляется двумя способами:
          </h1>
          <p>Возврат в фирменные пункты выдачи/возврата NameLogo</p>
          <p>
            Вызов курьера LogoName (услуга предоставляется жителям городов, где
            есть курьерская доставка).
          </p>
          <h1>1. Самостоятельный возврат</h1>
          <p>Возврат в фирменные пункты выдачи/возврата NameLogo</p>
          <h1>2. Возврат курьером</h1>
          <p>
            Услуга доступна для населенных пунктов, куда осуществляется доставка
            курьером.
          </p>
          <p>
            На один день возможно оформить на возврат с помощью курьера не более
            10 позиций. Количество товаров для возврата в пунктах выдачи не
            ограничено.
          </p>
          <div className="product__title">
            Возврат товара надлежащего качества
          </div>
          <h1>Срок возврата товара</h1>
          <p>
            Срок возврата товара надлежащего качества составляет 21 день с
            момента получения товара, если иное не было оговорено при продаже
            товара.
          </p>
          <h1>
            Возврат товара ненадлежащего качества осуществляется следующим
            способом:
          </h1>
          <p>
            --- Возврат товара осуществляется посредством оформления заявки в
            Личном кабинете.
          </p>
          <p>
            --- Срок рассмотрения заявки не превышает 7 (семь) рабочих дней.
          </p>
          <p>
            --- В случае, если по результату рассмотрения заявки Продавцом
            принято положительное решение, покупатель может передать товар для
            возврата в Пункт выдачи заказов Logoname.
          </p>
          <p>
            --- В случае отклонения заявки, покупатель вправе обратиться в
            независимую экспертизу. В случае, если независимой экспертизой будет
            подтверждено право покупателя на возврат товара, все расходы
            покупателя, связанные с проведением независимой экспертизы подлежат
            возмещению Продавцом.
          </p> */}
        </MContainer>
      </div>
      {/* <div className="container mx-auto px-4 xl:px-12 md:px-4 r-product__footer">
        <span>*</span>
        <p>
          Настоящие правила носят рекомендательный характер и не ограничивают
          покупателя в правах, связанных с предъявлением требований Продавцу,
          предусмотренных действующим законодательством.
        </p>
      </div> */}
    </>
  );
}
