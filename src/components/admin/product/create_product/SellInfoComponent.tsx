import SizeBox from "@/components/SizeBox";
import { Card } from "@mui/material";
import { Radio } from "@material-tailwind/react";
import { Dispatch, SetStateAction, useState } from "react";
import { SellInfoDataTypes } from "@/screens/admin/product/CreateProductScreen";
import InputBoxComponent from "@/components/InputBoxComponent";
import Helper from "@/helpers";
import InputBoxPercentComponent from "@/components/InputBoxPercentComponent";

type SellInfoComponentProps = {
  sellInfo: SellInfoDataTypes;
  setSellInfo: Dispatch<SetStateAction<SellInfoDataTypes>>;
};

const SellInfoComponent = ({
  sellInfo,
  setSellInfo,
}: SellInfoComponentProps) => {
  const [subscribe, setSubscribe] = useState<boolean>(false);

  const handleRegularPurchaseChange = (value: string) => {
    setSellInfo((prevSellInfo) => ({
      ...prevSellInfo,
      regularPurchase: value === "regularPurchase",
    }));
    value === "regularPurchase" ? setSubscribe(true) : setSubscribe(false);
  };

  const calculatePriceWithTax = (price: number, tax: number) => {
    if (isNaN(price) || isNaN(tax)) {
      return 0; //"Invalid input. Please provide valid numbers.";
    }

    return Math.round(price + price * (tax / 100));
  };

  return (
    <Card className="px-[30px] py-[20px] bg-white rounded-[5px]">
      {/* Title */}
      <div className="text-textBlue text-[20px] font-semibold">販売情報</div>
      <SizeBox h={20} />
      {/* Input Field */}
      <div className="flex flex-row">
        <InputBoxComponent
          error={sellInfo.purchasePriceError}
          max={10}
          value={
            sellInfo.purchasePrice > 0
              ? Helper.japaneseNumberFormat({ number: sellInfo.purchasePrice })
              : "￥"
          }
          onChange={(event) => {
            if (event.currentTarget.value.includes("￥")) {
              setSellInfo({
                ...sellInfo,
                purchasePrice: Helper.japaneseNumberFormatRevert({
                  numericString: event.currentTarget.value,
                }),
                purchasePriceWithTax: calculatePriceWithTax(
                  Helper.japaneseNumberFormatRevert({
                    numericString: event.currentTarget.value,
                  }),
                  sellInfo.purchaseTaxRate
                ),
              });
            } else if (parseInt(event.currentTarget.value) > 0) {
              setSellInfo({
                ...sellInfo,
                purchasePrice: parseInt(event.currentTarget.value),
                purchasePriceWithTax: calculatePriceWithTax(
                  Helper.japaneseNumberFormatRevert({
                    numericString: event.currentTarget.value,
                  }),
                  sellInfo.purchaseTaxRate
                ),
              });
            } else {
              setSellInfo({
                ...sellInfo,
                purchasePrice: 0,
                purchasePriceWithTax: calculatePriceWithTax(
                  Helper.japaneseNumberFormatRevert({
                    numericString: event.currentTarget.value,
                  }),
                  sellInfo.purchaseTaxRate
                ),
              });
            }
          }}
          label="仕入れ単価（税抜）"
        />
        <SizeBox w={50} />
        <InputBoxComponent
          error={sellInfo.sellPriceError}
          max={10}
          value={
            sellInfo.sellPrice > 0
              ? Helper.japaneseNumberFormat({ number: sellInfo.sellPrice })
              : "￥"
          }
          onChange={(event) => {
            if (event.currentTarget.value.includes("￥")) {
              setSellInfo({
                ...sellInfo,
                sellPrice: Helper.japaneseNumberFormatRevert({
                  numericString: event.currentTarget.value,
                }),
                sellPriceWithTax: calculatePriceWithTax(
                  Helper.japaneseNumberFormatRevert({
                    numericString: event.currentTarget.value,
                  }),
                  sellInfo.sellTaxRate
                ),
              });
            } else if (parseInt(event.currentTarget.value) > 0) {
              setSellInfo({
                ...sellInfo,
                sellPrice: parseInt(event.currentTarget.value),
                sellPriceWithTax: calculatePriceWithTax(
                  Helper.japaneseNumberFormatRevert({
                    numericString: event.currentTarget.value,
                  }),
                  sellInfo.sellTaxRate
                ),
              });
            } else {
              setSellInfo({
                ...sellInfo,
                sellPrice: 0,
                sellPriceWithTax: calculatePriceWithTax(
                  Helper.japaneseNumberFormatRevert({
                    numericString: event.currentTarget.value,
                  }),
                  sellInfo.sellTaxRate
                ),
              });
            }
          }}
          label="販売単価（税抜）"
        />
      </div>
      <SizeBox h={15} />
      <div className="flex flex-row">
        <InputBoxPercentComponent
          id="buyTax"
            error={sellInfo.purchaseTaxRateError}
            max={2}
            value={
              sellInfo.purchaseTaxRate > 0
                ? sellInfo.purchaseTaxRate.toString()
                : "0"
          }
          onChange={(event) => {
            setSellInfo((prevSellInfo) => ({
              ...prevSellInfo,
              purchaseTaxRate: isNaN(parseInt(event.target.value))
                ? 0
                : parseInt(event.target.value),
            }));

            setSellInfo((prevSellInfo) => ({
              ...prevSellInfo,
              purchasePriceWithTax: calculatePriceWithTax(
                sellInfo.purchasePrice,
                +event.target.value
              ),
            }));
          }}
          label="仕入れ単価税率"
        />
        <SizeBox w={50} />
        <InputBoxPercentComponent
          id="sellTax"
          error={sellInfo.sellTaxRateError}
          max={2}
          value={sellInfo.sellTaxRate.toString()}
          onChange={(e) => {
            setSellInfo((prevSellInfo) => ({
              ...prevSellInfo,
              sellTaxRate: isNaN(parseInt(e.target.value))
                ? 0
                : parseInt(e.target.value),
              sellPriceWithTax: calculatePriceWithTax(
                sellInfo.sellPrice,
                +e.target.value
              ),
            }));
          }}
          label="販売単価税率"
        />
      </div>
      <SizeBox h={15} />
      <div className="flex flex-row">
        <InputBoxComponent
          disabled
          label="仕入れ単価（税込)"
          backgroundColor="#D9D9D9"
          value={
            sellInfo.purchasePriceWithTax > 0
              ? Helper.japaneseNumberFormat({
                  number: sellInfo.purchasePriceWithTax,
                })
              : "￥"
          }
          onChange={(e) =>
            setSellInfo((prevSellInfo) => ({
              ...prevSellInfo,
              purchasePriceWithTax: parseInt(e.target.value),
            }))
          }
        />

        <SizeBox w={50} />
        <InputBoxComponent
          value={
            sellInfo.sellPriceWithTax > 0
              ? Helper.japaneseNumberFormat({
                  number: sellInfo.sellPriceWithTax,
                })
              : "￥"
          }
          onChange={(e) =>
            setSellInfo((prevSellInfo) => ({
              ...prevSellInfo,
              sellPriceWithTax: +e.target.value,
            }))
          }
          label="販売単価（税込）"
          backgroundColor="#D9D9D9"
          disabled
        />
      </div>
      <SizeBox h={15} />
      <div className="flex flex-row">
        <InputBoxComponent
          error={sellInfo.minimumOrderQuantityError}
          max={5}
          value={sellInfo.minimumOrderQuantity.toString()}
          onChange={(e) =>
            setSellInfo((prevSellInfo) => ({
              ...prevSellInfo,
              minimumOrderQuantity: +e.target.value,
            }))
          }
          label="最低発注数量"
        />
        <SizeBox w={50} />
        <InputBoxComponent
          error={sellInfo.maximumOrderQuantityError}
          max={5}
          value={sellInfo.maximumOrderQuantity.toString()}
          onChange={(e) =>
            setSellInfo((prevSellInfo) => ({
              ...prevSellInfo,
              maximumOrderQuantity: +e.target.value,
            }))
          }
          label="最大発注数量"
        />
      </div>
      <SizeBox h={15} />
      <div className="flex flex-row">
        <div className="flex-1">
          <div className="flex gap-10">
            <Radio
              color={"blue"}
              name="type"
              label="定期購入"
              crossOrigin={undefined}
              onChange={() => handleRegularPurchaseChange("regularPurchase")}
            />
            <Radio
              color="blue"
              name="type"
              label="１回購入"
              defaultChecked
              crossOrigin={undefined}
              onChange={() => handleRegularPurchaseChange("oneTimePurchase")}
            />
          </div>
        </div>
        <SizeBox w={50} />
        {subscribe ? (
          <InputBoxPercentComponent
            id="subscribeDiscount"
            error={sellInfo.subscribeFactorError}
            max={2}
            label="定期購入割引率"
            value={
              sellInfo.subscribeFactor > 0
                ? sellInfo.subscribeFactor.toString()
                : "0"
            }
            onChange={(event) =>
              setSellInfo((prevSellInfo) => ({
                ...prevSellInfo,
                subscribeFactor: isNaN(parseInt(event.target.value))
                  ? 0
                  : parseInt(event.target.value),
              }))
            }
          />
        ) : (
          <InputBoxPercentComponent
            id="discount"
            error={sellInfo.discountRateError}
            max={2}
            label="割引率"
            value={
              sellInfo.discountRate > 0 ? sellInfo.discountRate.toString() : "0"
            }
            onChange={(event) =>
              setSellInfo((prevSellInfo) => ({
                ...prevSellInfo,
                discountRate: isNaN(parseInt(event.target.value))
                  ? 0
                  : parseInt(event.target.value),
              }))
            }
          />
        )}
      </div>
    </Card>
  );
};

export default SellInfoComponent;
