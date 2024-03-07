import { BaseOptionType } from "antd/es/select";
import { ACADEMIC_SEMESTER_NAMES_OBJ } from "../../../../constant/academicSemester";

export const getSemesterCodeBasedOnSemesterName = (name: string): string => {
  if (name === ACADEMIC_SEMESTER_NAMES_OBJ.Autumn) {
    return "01";
  } else if (name === ACADEMIC_SEMESTER_NAMES_OBJ.Summer) {
    return "02";
  } else if (name === ACADEMIC_SEMESTER_NAMES_OBJ.Fall) {
    return "03";
  } else {
    return "00";
  }
};

export const getFiveYears = () => {
  const currentYear = new Date().getFullYear();

  const years: number[] = [];

  for (let i = 0; i < 5; i++) {
    years.push(Number(currentYear) + i);
  }

  return years;
};

export const yearListForSelect: BaseOptionType[] = getFiveYears().map(
  (item: number) => ({
    value: `${item}`,
    label: `${item}`,
  })
);
