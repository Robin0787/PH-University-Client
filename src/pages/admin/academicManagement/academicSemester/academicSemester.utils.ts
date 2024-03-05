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
