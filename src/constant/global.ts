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

export const DaysArray: string[] = [
  "Sat",
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
] as const;

export const daysListForSelect: BaseOptionType[] = DaysArray.map(
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
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  },
];

export const bloodGroupOptions: BaseOptionType[] = bloodGroups.map(
  (item: string) => ({
    value: item,
    label: item,
  })
);
