import { Classification } from "@/models/dataModel";

export const classificationList: Array<Classification> = [
  {
    classificationId: 1,
    classificationName: "14日",
    classificationValue: 14,
    classificationType: "定期",
  },
  {
    classificationId: 2,
    classificationName: "21日",
    classificationValue: 21,
    classificationType: "定期",
  },
  {
    classificationId: 3,
    classificationName: "30日",
    classificationValue: 30,
    classificationType: "定期",
  },
  {
    classificationId: 4,
    classificationName: "受取",
    classificationValue: 1,
    classificationType: "ポイント付与",
  },
  {
    classificationId: 5,
    classificationName: "使用",
    classificationValue: 2,
    classificationType: "ポイント付与",
  },
  {
    classificationId: 6,
    classificationName: "入れる",
    classificationValue: 1,
    classificationType: "在庫仕入れステータス",
  },
  {
    classificationId: 7,
    classificationName: "出す",
    classificationValue: 2,
    classificationType: "在庫仕入れステータス",
  },
  {
    classificationId: 8,
    classificationName: "pending",
    classificationValue: 1,
    classificationType: "取引ステータス",
  },
  {
    classificationId: 9,
    classificationName: "pending",
    classificationValue: 2,
    classificationType: "取引ステータス",
  },
  {
    classificationId: 10,
    classificationName: "pending",
    classificationValue: 3,
    classificationType: "取引ステータス",
  },
];
