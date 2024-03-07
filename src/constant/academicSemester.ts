import { BaseOptionType } from "antd/es/select";

export const AcademicSemesterNames: string[] = [
  "Autumn",
  "Summer",
  "Fall",
] as const;

export const ACADEMIC_SEMESTER_NAMES_OBJ = {
  Autumn: "Autumn",
  Summer: "Summer",
  Fall: "Fall",
} as const;

export const semesterNamesForSelect: BaseOptionType[] =
  AcademicSemesterNames.map((item: string) => ({
    value: item,
    label: item,
  }));
