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

export const bloodGroups: string[] = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];

export const genderOptions: BaseOptionType[] = [
  {
    value: "male",
    label: "Male",
  },
  {
    value: "female",
    label: "Female",
  },
];

export const bloodGroupOptions: BaseOptionType[] = bloodGroups.map(
  (item: string) => ({
    value: item,
    label: item,
  })
);
