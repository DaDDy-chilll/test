
// productA
import ProductA1 from "@/assets/product/items/productA/productA1.png";
import ProductA2 from "@/assets/product/items/productA/productA2.png";
import ProductA3 from "@/assets/product/items/productA/productA3.png";
import ProductA4 from "@/assets/product/items/productA/productA4.png";

// productB
import ProductB1 from "@/assets/product/items/productB/productB1.png";
import ProductB2 from "@/assets/product/items/productB/productB2.png";
import ProductB3 from "@/assets/product/items/productB/productB3.png";
import ProductB4 from "@/assets/product/items/productB/productB4.png";

// productB
import ProductC1 from "@/assets/product/items/productC/productC1.png";
import ProductC2 from "@/assets/product/items/productC/productC2.png";
import ProductC3 from "@/assets/product/items/productC/productC3.png";
import ProductC4 from "@/assets/product/items/productC/productC4.png";

// product Set
import ProductSet from "@/assets/product/items/productSet/productSet.png";

import { Product, ProductOrder, Warehouse } from "@/models/dataModel";


export const warehouse: Array<Warehouse> = [
    {
        productId: 1,
        inventory: 250
    },
    {
        productId: 2,
        inventory: 200
    },
    {
        productId: 3,
        inventory: 230
    },
    {
        productId: 4,
        inventory: 130
    },
    {
        productId: 5,
        inventory: 300
    }
]

export const productList: Array<Product> = [
    {
        productId: 1,
        productName: "8030カルシウムプラス",
        productTitle: "270mg X 30日分 X 2箱",
        productCode: "#12939343",
        productPhoto: [ProductA1, ProductA2, ProductA3, ProductA4],
        productCategory: "サプリメント",
        subCategory: "健康用サプリメント",
        buyPrice: 15000,
        taxPercent: 8,
        sellPrice: 16000,
        subscribeFactor: 0.95,
        status: 0,
        desciptionTitle:"こんな方におすすめ",
        desciption:"骨粗しょう症が気になる方子供の進捗を伸ばしたい骨を丈夫にしたい方",
        productBgColor:"productABG"

    },
    {
        productId: 2,
        productName: "エイペクセル キトサン",
        productTitle: "277mg  X  30日分  X  2箱",
        productCode: "#12939344",
        productPhoto: [ProductB1, ProductB2, ProductB3, ProductB4],
        productCategory: "サプリメント",
        subCategory: "健康用サプリメント",
        buyPrice: 15000,
        taxPercent: 8,
        sellPrice: 16000,
        subscribeFactor: 0.95,
        status: 0,
        desciptionTitle:'血管をキレイにしたい方 おすすめ',
        desciption:"現代人に多く見られる高脂肪・低繊維に 偏りがちな毎日にお役立ていただけるサプリメント",
        productBgColor:"productBBG"
 
    },
    {
        productId: 3,
        productName: "セレン酵 母",
        productTitle: "300mg X 30日分 X 2箱",
        productCode: "#12934532",
        productPhoto: [ProductC1, ProductC2, ProductC3, ProductC4],
        productCategory: "サプリメント",
        subCategory: "健康用サプリメント",
        buyPrice: 15000,
        taxPercent: 8,
        sellPrice: 16000,
        subscribeFactor: 0.90,
        status: 1,
        desciptionTitle:"体を守りたい方 おすすめ",
        desciption:"微量ながら大切な働きを担う必須ミネラル 体内ではつくり出せない栄養素 高麗人参、ニンニク、ワカサギなどに含まれている",
        productBgColor:"productCBG"
 
    },
    {
        productId:4 ,
        productName: "３つ商品セット購入",
        productTitle: "",
        productCode: "#12934532",
        productPhoto: [ProductSet, ProductA2, ProductB2, ProductC2],
        productCategory: "サプリメント",
        subCategory: "健康用サプリメント",
        buyPrice: 42000,
        taxPercent: 8,
        sellPrice: 44160,
        subscribeFactor: 0.90,
        status: 1,
        desciptionTitle:"体を守りたい方 おすすめ",
        desciption:"微量ながら大切な働きを担う必須ミネラル 体内ではつくり出せない栄養素 高麗人参、ニンニク、ワカサギなどに含まれている",
        productBgColor:"productABG"
 
    }
];

export const orderList: Array<ProductOrder> = [
    {
        productId: 1,
        productName: "8030カルシウムプラス",
        productTitle: "270mg X 30日分 X 2箱",
        productCode: "#12939343",
        productPhoto: [ProductA1, ProductA2, ProductA3, ProductA4],
        taxPercent: 8,
        status: 1,
        customerName: "山田",
        customerCode: "#2344333",
        orderDate: "2023/12/12",
        totalAmount: 30000,
        deliveryFees: "無料",
        paymentService: "VISAカード",
        paymentDate: "2023/12/12",
        destination: "1240025 東京都葛飾区西新小岩2-1-1",
        shipping: "2023/12/18 午前",
        expectedShipping: "2023/12/18 午前",
    },
    {
        productId: 2,
        productName: "8030カルシウムプラス",
        productTitle: "270mg X 30日分 X 2箱",
        productCode: "#12939343",
        productPhoto: [ProductA1, ProductA2, ProductA3, ProductA4],
        taxPercent: 8,
        status: 1,
        customerName: "山田",
        customerCode: "#2344333",
        orderDate: "2023/12/12",
        totalAmount: 30000,
        deliveryFees: "無料",
        paymentService: "VISAカード",
        paymentDate: "2023/12/12",
        destination: "1240025 東京都葛飾区西新小岩2-1-1",
        shipping: "2023/12/18 午前",
        expectedShipping: "2023/12/18 午前",
    },
    {
        productId: 3,
        productName: "8030カルシウムプラス",
        productTitle: "270mg X 30日分 X 2箱",
        productCode: "#12939343",
        productPhoto: [ProductA1, ProductA2, ProductA3, ProductA4],
        taxPercent: 8,
        status: 1,
        customerName: "山田",
        customerCode: "#2344333",
        orderDate: "2023/12/12",
        totalAmount: 30000,
        deliveryFees: "無料",
        paymentService: "VISAカード",
        paymentDate: "2023/12/12",
        destination: "1240025 東京都葛飾区西新小岩2-1-1",
        shipping: "2023/12/18 午前",
        expectedShipping: "2023/12/18 午前",
    },
    {
        productId: 4,
        productName: "8030カルシウムプラス",
        productTitle: "270mg X 30日分 X 2箱",
        productCode: "#12939343",
        productPhoto: [ProductA1, ProductA2, ProductA3, ProductA4],
        taxPercent: 8,
        status: 1,
        customerName: "山田",
        customerCode: "#2344333",
        orderDate: "2023/12/12",
        totalAmount: 30000,
        deliveryFees: "無料",
        paymentService: "VISAカード",
        paymentDate: "2023/12/12",
        destination: "1240025 東京都葛飾区西新小岩2-1-1",
        shipping: "2023/12/18 午前",
        expectedShipping: "2023/12/18 午前",
    },
];
