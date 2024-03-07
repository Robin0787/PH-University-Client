import { BaseOptionType } from "antd/es/select";

export const MonthsArray: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export const monthListForSelect: BaseOptionType[] = MonthsArray.map(
  (item: string) => ({
    value: item,
    label: item,
  })
);
