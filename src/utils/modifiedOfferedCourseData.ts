import { TOfferedCourse } from "../types/courseManagement.types";

interface TModifiedItem {
  courseTitle: string;
  sections: {
    section: number;
    _id: string;
    startTime: string;
    endTime: string;
    days: string[];
  }[];
}

const modifiedOfferedCourseData = (
  data: TOfferedCourse[] | undefined
): TModifiedItem[] | [] => {
  if (!data) {
    return [];
  }
  const singleObject = data?.reduce((acc, item) => {
    const key = item.course.title;
    acc[key] = acc[key] || {
      courseTitle: key,
      sections: [],
    };

    acc[key].sections.push({
      section: item.section,
      _id: item._id,
      startTime: item.startTime,
      endTime: item.endTime,
      days: item.days,
    });

    return acc;
  }, {});

  const modifiedData: TModifiedItem[] = Object.values(singleObject || {});
  return modifiedData;
};

export default modifiedOfferedCourseData;
