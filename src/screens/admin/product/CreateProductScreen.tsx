//import SizeBox from "@/components/common/SizeBox";
import { GlobalProps } from "@/App";
import { ProductPhoto } from "@/components/PreviewImageComponent";
import SizeBox from "@/components/SizeBox";
import CommonNavbar from "@/components/admin/navbar/CommonNavbar";
import InsertPhotoComponent from "@/components/admin/product/create_product/InsertPhotoComponent";
import ProductDescriptionComponent from "@/components/admin/product/create_product/ProductDescriptionComponent";
import ProductInfoComponent from "@/components/admin/product/create_product/ProductInfoComponent";
import ProductTagComponent from "@/components/admin/product/create_product/ProductTagComponent";
import SellInfoComponent from "@/components/admin/product/create_product/SellInfoComponent";
import Routes from "@/navigations/routes";
import { ProductPhotoTempProps } from "@/networks/mutations/admin/product/create";
import { ProductDescription } from "@/types/product/product_explain";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export type ProductInfoDataTypes = {
  productCode: string;
  productCodeError?: string;

  productName: string;
  productNameError?: string;

  productNameKana: string;
  productNameKanaError?: string;

  productTitle: string;
  productTitleError?: string;

  remarks: string;
  remarksError?: string;

  category: number;
  categroyError?: string;

  subCategory: number;
  subCategoryError?: string;

  pub: boolean;
  pubError?: string;
};

export type SellInfoDataTypes = {
  purchasePrice: number;
  purchasePriceError?: string;

  sellPrice: number;
  sellPriceError?: string;

  purchaseTaxRate: number;
  purchaseTaxRateError?: string;

  sellTaxRate: number;
  sellTaxRateError?: string;

  purchasePriceWithTax: number;
  purchasePriceWithTaxError?: string;

  sellPriceWithTax: number;
  sellPriceWithTaxError?: string;

  minimumOrderQuantity: number;
  minimumOrderQuantityError?: string;

  maximumOrderQuantity: number;
  maximumOrderQuantityError?: string;

  regularPurchase: boolean;
  regularPurchaseError?: string;

  discountRate: number;
  discountRateError?: string;

  subscribeFactor: number;
  subscribeFactorError?: string;
};

export type TagsDataTypes = {
  customerSearchTag: string;
  customerSearchTagError?: string;
  productSearchTag: string;
  productSearchTagError?: string;
};

export type DescriptionDataTypes = {
  productDescription: string;
  productDescriptionError?: string;
};

const CreateProductScreen = ({
  setIsAdmin,
  mutations,
  categories,
}: GlobalProps) => {
  const navigate = useNavigate();
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
      title: "商品登録",
      action: () => {},
    },
  ];

  /* Main Description Data */
  const [ description, setDescription ] = useState<Array<ProductDescription>>([]);

  const [productInfo, setProductInfo] = useState<ProductInfoDataTypes>({
    productCode: "",
    productCodeError: "",

    productName: "",
    productNameError: "",

    productNameKana: "",
    productNameKanaError: "",

    productTitle: "",
    productTitleError: "",

    category: 0,
    categroyError: "",

    subCategory: 0,
    subCategoryError: "",

    remarks: "",
    remarksError: "",

    pub: false,
    pubError: "",
  });

  const [sellInfo, setSellInfo] = useState<SellInfoDataTypes>({
    purchasePrice: 0,
    purchasePriceError: "",
    sellPrice: 0,
    sellPriceError: "",
    purchaseTaxRate: 0,
    purchaseTaxRateError: "",
    sellTaxRate: 0,
    sellTaxRateError: "",
    purchasePriceWithTax: 0,
    purchasePriceWithTaxError: "",
    sellPriceWithTax: 0,
    sellPriceWithTaxError: "",
    minimumOrderQuantity: 0,
    minimumOrderQuantityError: "",
    maximumOrderQuantity: 0,
    maximumOrderQuantityError: "",
    regularPurchase: false,
    regularPurchaseError: "",
    discountRate: 0,
    discountRateError: "",
    subscribeFactor: 0,
    subscribeFactorError: "",
  });
  const [tags, setTags] = useState<TagsDataTypes>({
    customerSearchTag: "",
    customerSearchTagError: "",
    productSearchTag: "",
    productSearchTagError: "",
  });

  // const [description, setDescription] = useState<DescriptionDataTypes>({
  //   productDescription: "",
  //   productDescriptionError: "",
  // });

  const [productPhotos, setProductPhotos] = useState<Array<ProductPhoto>>([]);
  const [productPhotosError, setProductPhotosError] = useState<string>("");

  const sellInfoValidate = () => {
    /* sellInfo Validate */
    let sellInfoerrors = {};

    if (sellInfo.purchasePrice > 0) {
      sellInfoerrors = { ...sellInfoerrors, purchasePriceError: "" };
    } else {
      sellInfoerrors = {
        ...sellInfoerrors,
        purchasePriceError: "仕入れ単価（税抜）を入力してください。",
      };
    }

    if (sellInfo.sellPrice > 0) {
      sellInfoerrors = { ...sellInfoerrors, sellPriceError: "" };
    } else {
      sellInfoerrors = {
        ...sellInfoerrors,
        sellPriceError: "販売単価（税抜）を入力してください.",
      };
    }

    if (sellInfo.purchaseTaxRate > 0) {
      sellInfoerrors = { ...sellInfoerrors, purchaseTaxRateError: "" };
    } else {
      sellInfoerrors = {
        ...sellInfoerrors,
        purchaseTaxRateError: "仕入れ単価税率を入力してください。",
      };
    }

    if (sellInfo.sellTaxRate > 0) {
      sellInfoerrors = { ...sellInfoerrors, sellTaxRateError: "" };
    } else {
      sellInfoerrors = {
        ...sellInfoerrors,
        sellTaxRateError: "販売単価税率を入力してください。",
      };
    }

    if (sellInfo.minimumOrderQuantity > 0) {
      sellInfoerrors = { ...sellInfoerrors, minimumOrderQuantityError: "" };
    } else {
      sellInfoerrors = {
        ...sellInfoerrors,
        minimumOrderQuantityError: "最低発注数量を入力してください。",
      };
    }

    if (sellInfo.maximumOrderQuantity > 0) {
      sellInfoerrors = { ...sellInfoerrors, maximumOrderQuantityError: "" };
    } else {
      sellInfoerrors = {
        ...sellInfoerrors,
        maximumOrderQuantityError: "最大発注数量を入力してください。",
      };
    }

    if (sellInfo.discountRate >= 0) {
      sellInfoerrors = { ...sellInfoerrors, discountRateError: "" };
    } else {
      sellInfoerrors = {
        ...sellInfoerrors,
        discountRateError: "割引率を正しく入力してください。",
      };
    }

    if (sellInfo.subscribeFactor >= 0) {
      sellInfoerrors = { ...sellInfoerrors, subscribeFactorError: "" };
    } else {
      sellInfoerrors = {
        ...sellInfoerrors,
        subscribeFactorError: "定期購入割引率を正しく入力してください。",
      };
    }
    setSellInfo({
      ...sellInfo,
      ...sellInfoerrors,
    });
    /* sellInfo Validate End */

    /* productInfo Validate */
    let productInfoerrors = {};
    
    if(productInfo.productCode!==""){
      console.log("pro",productInfo)
      if(productInfo.productCode.length>5){
        productInfoerrors = {...productInfoerrors,productCodeError: ""}
      }
      else{
        productInfoerrors = {...productInfoerrors,productCodeError: "商品コードの長さを６個から入力してお願いします。"}
        console.log(productInfoerrors)
      }
    }else{
      productInfoerrors = {...productInfoerrors,productCodeError: "商品コードを入力してください。"}
    }
    if(productInfo.productName !=""){
      if(productInfo.productName.length>5){
        productInfoerrors = {...productInfoerrors,productNameError: ""}
      }else{
        productInfoerrors = {...productInfoerrors,productNameError: "商品名の長さを６個から入力してお願いします。"}
      }
    }else{
      productInfoerrors = {...productInfoerrors,productNameError: "商品名を入力してください。"}
    }
    if(productInfo.productNameKana != ""){
      productInfoerrors = {...productInfoerrors,productNameKanaError: ""}
    }else{
      productInfoerrors = {...productInfoerrors,productNameKanaError: "商品カナを入力してください。"}
    }
    if(productInfo.productTitle != ""){
      productInfoerrors = {...productInfoerrors,productTitleError: ""}
    }else{
      productInfoerrors = {...productInfoerrors,productTitleError: "商品タイトルを入力してください。"}
    }
    if(productInfo.category >0){
      productInfoerrors = {...productInfoerrors,categroyError: ""}
    }else{
      productInfoerrors = {...productInfoerrors,categroyError: "商品カテゴリーを入力してください。"}
    }
    if(productInfo.subCategory >0){
      productInfoerrors = {...productInfoerrors,subCategoryError: ""}
    }else{
      productInfoerrors = {...productInfoerrors,subCategoryError: "商品サブカテゴリーを入力してください。"}
    }
    if(productInfo.remarks != ""){
      productInfoerrors = {...productInfoerrors,remarksError: ""}
    }else{
      productInfoerrors = {...productInfoerrors,remarksError: "商品備考を入力してください。"}
    }
    setProductInfo({
      ...productInfo,
      ...productInfoerrors,
    });

    /* productInfo Validate End */

    /* Tag Validate */
    let tagErrors = {};
    if (tags.customerSearchTag != "") {
      tagErrors = { ...tagErrors, customerSearchTagError: "" };
    } else {
      tagErrors = {
        ...tagErrors,
        customerSearchTagError: "顧客検索用タグを入力してください。",
      };
    }
    if (tags.productSearchTag != "") {
      tagErrors = { ...tagErrors, productSearchTagError: "" };
    } else {
      tagErrors = {
        ...tagErrors,
        productSearchTagError: "商品検索タグを入力してください。",
      };
    }

    setTags({
      ...tags,
      ...tagErrors,
    });
    /* Tag Validate End */

    /* Product Photo Validate */
    let isSastisfinePhto = true;
    if (productPhotos.length) {
      // check for have least one is main photo
      const haveAnyMainphoto =
        productPhotos.filter((photo) => photo.mainPhoto).length > 0;
      if (haveAnyMainphoto) {
        setProductPhotosError("");
      } else {
        setProductPhotosError("商品のメイン写真を選択してください。");
        isSastisfinePhto = false;
      }
    } else {
      setProductPhotosError("商品の写真を選択してください。");
      isSastisfinePhto = false;
    }
    /* Product Photo Validate */

    const isSatisfine = (obj: Object) => {
      return Object.values(obj).filter((msg) => msg != "").length === 0;
    };

    return (
      isSatisfine(sellInfoerrors) &&
      isSatisfine(productInfoerrors) &&
      isSastisfinePhto
    );
  };

  const uploadNewProduct = () => {
    if (sellInfoValidate()) {
      if(productPhotos.length >8){
        setProductPhotosError("写真を最大8枚まで入力してください")
        return;
      }
      // create product
      mutations.admin.awsStroageS3.putObjects(productPhotos).then((ans) => {
        // select main photo by user
        const productPhotosPrepare: Array<ProductPhotoTempProps> = ans.map(
          ({ mainPhoto, tempUrl }) => {
            return {
              product_photo_id: 0,
              main_photo: mainPhoto ? 1 : -1,
              img_url: tempUrl,
            };
          }
        );

        const body = {
          product_code: productInfo.productCode,
          subscribe_factor: (1-sellInfo.subscribeFactor/100),
          product_subcategory_id: productInfo.subCategory,
          product_name: productInfo.productName,
          product_name_kana: productInfo.productNameKana,
          title: productInfo.productTitle,
          bikou: productInfo.remarks,
          description:description.length>0?JSON.stringify(description):"[]",
          user_search_tag: tags.customerSearchTag,
          product_search_tag: tags.productSearchTag,
          status: productInfo.pub ? 1 : 0,
          discount: sellInfo.discountRate,
          subscribe: 1,
          subscribe_discount: 12,
          safe_stock_amt: 11,
          price: sellInfo.sellPrice,
          tax: sellInfo.sellTaxRate,
          buy_price: sellInfo.purchasePrice,
          buy_tax: sellInfo.purchaseTaxRate,
          expense: 11,
          min_sell_amt: sellInfo.minimumOrderQuantity,
          max_sell_amt: sellInfo.maximumOrderQuantity,
          product_photos: productPhotosPrepare,
        };

        mutations.admin.product.create({ productPayload: body }).then((ans) => {
          if (ans.data) {
            setProductPhotos([]);
            console.log(ans.data);
            navigate(Routes.ADMIN.PRODUCT);
          }
        })
        .catch((error) => {
          console.log(error);
          setProductInfo({
            ...productInfo,
            productNameError: error.errors.product_name,
            productCodeError: error.errors.product_code,
            productNameKanaError: error.errors.product_name_kana,
          });
        })
      }); 
    }
  };

  return (
    <div className="">
      <CommonNavbar setIsAdmin={setIsAdmin} breadcrubItems={breadcrubItems} />
      <p>Create Product Screen</p>
      {/* <SizeBox h={95}/> */}
      <div className="pt-[95px] px-[25px]">
        <ProductInfoComponent
          productInfo={productInfo}
          setProductInfo={setProductInfo}
          categories={categories}
        />
        <SizeBox h={20} />
        <SellInfoComponent sellInfo={sellInfo} setSellInfo={setSellInfo} />
        <SizeBox h={20} />
        <ProductTagComponent tags={tags} setTags={setTags} />
        <SizeBox h={20} />
        
        {/* 2024-02-08 */}
        <ProductDescriptionComponent
          description={description}
          setDescription={setDescription}
        />

        <SizeBox h={20} />
        <InsertPhotoComponent
          files={productPhotos}
          setFiles={setProductPhotos}
        />
        {/* Product Photo Error */}
        {productPhotosError && (
          <div className="text-red-500 mt-[10px]">{productPhotosError}</div>
        )}

        <SizeBox h={20} />
        <div className="fixed bottom-[50px] right-[50px]">
          <Button
            onClick={uploadNewProduct}
            className=""
            variant="contained"
            size="large"
            style={{
              backgroundColor: "#285DBD",
              height: 75,
              width: 75,
              borderRadius: "50%",
            }}
          >
            保存
          </Button>
        </div>
        <SizeBox h={65} />
      </div>
    </div>
  );
};

export default CreateProductScreen;
