import { GlobalProps } from "@/App";
import ProductDetailComponent from "@/components/user/product/product_detail/ProductDetailComponent";
import { useLocation } from "react-router-dom";
import SizeBox from "@/components/SizeBox";
import UserLayout from "../UserLayout";
import OtherProductsComponent from "@/components/user/product/OtherProductsComponent";
import { useState } from "react";

const ProductDetailScreen = ({
  addToCartAction,
  carts,
  mutations,
  loginUser,
  changeLoginUserAction
}: GlobalProps) => {
  const location = useLocation();
  const [photoIndex, setPhotoIndex] = useState<number>(0);

  return (
    <UserLayout activeNumber={1} loginUser={loginUser} changeLoginUserAction={changeLoginUserAction}>
      <div className="container mx-detail py-20">
        <ProductDetailComponent
          addToCartAction={addToCartAction}
          product={location.state}
          mutations={mutations}
          carts={carts}
          photoIndex={photoIndex}
          setPhotoIndex={setPhotoIndex}
        />

        <OtherProductsComponent
          products={location.state.products}
          nowProduct={location.state.product}
          setPhotoIndex={setPhotoIndex}
        />

        {/* {productId === 1 ? (
          <ProdcutA />
        ) : productId === 2 ? (
          <ProdcutB />
        ) : productId === 3 ? (
          <ProdcutC />
        ) : (
          <ProductSet />
        )} */}
        <SizeBox h={100} />
      </div>
      <SizeBox h={75} />
    </UserLayout>
  );
};
export default ProductDetailScreen;
