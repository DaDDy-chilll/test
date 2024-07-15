import { GlobalProps } from "@/App";
import { ProductPhoto } from "@/components/PreviewImageComponent";
import SizeBox from "@/components/SizeBox";
import CommonNavbar from "@/components/admin/navbar/CommonNavbar";
import ProductDescriptionEditComponent from "@/components/admin/product/create_product/ProductDescriptionEditComponent"; // အမှန်
import ProductInfoDetailComponent from "@/components/admin/product/product_detail/ProductInfoDetailComponent";
import ProductInfoDetailEditComponent from "@/components/admin/product/product_detail/ProductInfoDetailEditComponent";
import ProductInsertPhotoDetailComponent from "@/components/admin/product/product_detail/ProductInsertPhotoDetailComponent";
import ProductInsertPhotoDetailEditComponent from "@/components/admin/product/product_detail/ProductInsertPhotoDetailEditComponent";
import ProductSellDetailEditComponentCopy from "@/components/admin/product/product_detail/ProductSellDetailEditComponent";
import ProductSellInfoDetailComponent from "@/components/admin/product/product_detail/ProductSellInfoDetailComponent";
import ProductTagDetailComponent from "@/components/admin/product/product_detail/ProductTagDetailComponent";
import ProductTagDetailEditComponent from "@/components/admin/product/product_detail/ProductTagDetailEditComponent";
import Routes from "@/navigations/routes";
import { Product } from "@/types/product/product";
import { ProductDescription } from "@/types/product/product_explain";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ProductDetailsScreen = ({
  setIsAdmin,
  mutations,
  categories,
}: GlobalProps) => {

  const navigate = useNavigate();
  const location = useLocation();
  const { productId } = location.state;

  const [product, setProduct] = useState<Product>();

  /* Description State */
  const [description,setDescription] = useState<Array<ProductDescription>>([]);

  // AMM
  const [productPhotos, setProductPhotos] = useState<Array<ProductPhoto>>([]);

  const [openInfoDetailDialog, setOpenInfoDetailDialog] =
    useState<boolean>(false);
  const [openSellDetailDialog, setOpenSellDetailDialog] =
    useState<boolean>(false);
  const [openTagDetailDialog, setOpenTagDetailDialog] =
    useState<boolean>(false);
  const [openDescriptionDetailDialog, setOpenDescriptionDetailDialog] =
    useState<boolean>(false);
  const [openInsertPhotoDetailDialog, setOpenInsertPhotoDetailDialog] =
    useState<boolean>(false);

  const handleProductReceived = (product: Product) => {
    setProduct(product);
  };


  const breadcrubItems = [
    {
      title: "メニュー",
      action: () => navigate(Routes.ADMIN.HOME),
    },
    {
      title: "商品一覧",
      action: () => navigate(Routes.ADMIN.PRODUCT),
    },
    {
      title: "商品詳細",
      action: () => { },
    },
  ];
  // mutations.admin.product.updateProductMode1
  useEffect(() => {
    if (productId && !product) {
      mutations.admin.product
        .getProductById({ productId })
        .then((response) => {
          setProduct(response.data);
          const prepareProductPhotos: Array<ProductPhoto> = response.data.product_photos.map(({ product_photo_id, main_photo, img_url }) => {
            return {
              id: product_photo_id,
              file: undefined,
              mainPhoto: main_photo === 1,
              tempUrl: img_url
            }
          });
          setProductPhotos(prepareProductPhotos);
          /* Description */
          if(response.data.description){
            try{
              const descriptionObject: Array<ProductDescription> = JSON.parse(response.data.description);
              if(descriptionObject.length>0){
                setDescription(descriptionObject);
              }
            }catch{
              console.log("Error From product description")
            }
          }
        })
        .catch();
    }
  });
  // React Life Cycle
  // 1. top layer( before return except *useEffect )
  // 2. render => return
  // 3. call function useEffect
  // return <div className="text-[50px] text-center">{count}</div>
  return (
    <div className="">

      <CommonNavbar setIsAdmin={setIsAdmin} breadcrubItems={breadcrubItems} />

      {/* <SizeBox h={95}/> */}
      <div className="pt-[95px] px-[25px]">
        <ProductInfoDetailComponent
          setOpenInfoDetailDialog={setOpenInfoDetailDialog}
          product={product}
          categories={categories}
        />
        <SizeBox h={20} />
        {product && (
          <ProductSellInfoDetailComponent
            setOpenSellDetailDialog={setOpenSellDetailDialog}
            product={product}
          />
        )}
        <SizeBox h={20} />
        {product && (
          <ProductTagDetailComponent
            setOpenTagDetailDialog={setOpenTagDetailDialog}
            product={product}
          />
        )}
        <SizeBox h={20} />
        
        {/* Product Description */}
        {
          product && (
            <ProductDescriptionEditComponent 
              description={description}
              setDescription={setDescription}
              product={product}
              setProduct={setProduct}
              updateProductAction={mutations.admin.product.updateProductMode4}

            /> 
          )
        }

        <SizeBox h={20} />
        <ProductInsertPhotoDetailComponent
          setOpenInsertPhotoDetailDialog={setOpenInsertPhotoDetailDialog}
          productPhotos={productPhotos}
        />
        <SizeBox h={20} />
        <div className="fixed bottom-[50px] right-[50px]">

        </div>
        <SizeBox h={65} />
      </div>

      {/* Alert Box */}
      {product && (
        <ProductInfoDetailEditComponent
          openInfoDetailDialog={openInfoDetailDialog}
          setOpenInfoDetailDialog={setOpenInfoDetailDialog}
          product={product}
          setProduct={setProduct}
          categories={categories}
          updateProductAction={mutations.admin.product.updateProductMode1}
        />
      )}


      {product && (
        <ProductSellDetailEditComponentCopy
          openSellDetailDialog={openSellDetailDialog}
          setOpenSellDetailDialog={setOpenSellDetailDialog}
          product={product}
          setProduct={setProduct}
          updateProductAction={mutations.admin.product.updateProductMode2}
        />
      )}

      {product && (
        <ProductTagDetailEditComponent
          openTagDetailDialog={openTagDetailDialog}
          setOpenTagDetailDialog={setOpenTagDetailDialog}
          product={product}
          setProduct={setProduct}
          updateProductAction={mutations.admin.product.updateProductMode3}
        />
      )}

      {product && (
        <ProductInsertPhotoDetailEditComponent
          openInsertPhotoDetailDialog={openInsertPhotoDetailDialog}
          setOpenInsertPhotoDetailDialog={setOpenInsertPhotoDetailDialog}
          productPhotos={productPhotos}
          product={product}
          setProductPhotos={setProductPhotos}
          onProductRecevied={handleProductReceived}
          updateProductAction={mutations.admin.product.updateProductMode5}
        />
      )}
      <SizeBox h={100} />
    </div>
  );
};

export default ProductDetailsScreen;
