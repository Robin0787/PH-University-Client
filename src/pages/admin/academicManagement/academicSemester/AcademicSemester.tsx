// import { LoaderIcon } from "react-hot-toast";
import type { TableColumnsType, TableProps } from "antd";
import { Table } from "antd";
import { Key, useState } from "react";
import GradientContainer from "../../../../components/gradientContainer/gradientContainer";
import { MonthsArray } from "../../../../constant/global";
import { useGetAllSemesterQuery } from "../../../../redux/features/admin/academicManagement.api";
import { TAcademicSemester } from "../../../../types/academicManagement.types";
import { getFiveYears } from "./academicSemester.utils";

export type TTableData = Pick<
  TAcademicSemester,
  "_id" | "name" | "year" | "startMonth" | "endMonth"
>;

export type TQueryParam = {
  name: string;
  value: boolean | Key;
};

const columns: TableColumnsType<TTableData> = [
  {
    title: "Name",
    dataIndex: "name",
    filters: [
      {
        text: "Autumn",
        value: "Autumn",
      },
      {
        text: "Summer",
        value: "Summer",
      },
      {
        text: "Fall",
        value: "Fall",
      },
    ],
  },
  {
    title: "Year",
    dataIndex: "year",
    defaultSortOrder: "descend",
    sorter: (a, b) => Number(a.year) - Number(b.year),
    filters: getFiveYears().map((year) => {
      return {
        text: year,
        value: year,
      };
    }),
  },
  {
    title: "Start Month",
    dataIndex: "startMonth",
    filters: MonthsArray.map((month) => {
      return {
        text: month,
        value: month,
      };
    }),
  },
  {
    title: "End Month",
    dataIndex: "endMonth",
    filters: MonthsArray.map((month) => {
      return {
        text: month,
        value: month,
      };
    }),
  },
];

const AcademicSemester = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const { data, isLoading } = useGetAllSemesterQuery(params);
  const academicSemesters = data?.data;

  const tableData = academicSemesters?.map(
    ({ _id, name, startMonth, endMonth, year }) => ({
      key: _id,
      _id,
      name,
      startMonth,
      endMonth,
      year,
    })
  );

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];
      filters.name?.forEach((item) => {
        queryParams.push({ name: "name", value: item });
      });
      filters.year?.forEach((item) => {
        queryParams.push({ name: "year", value: item });
      });
      filters.startMonth?.forEach((item) => {
        queryParams.push({ name: "startMonth", value: item });
      });
      filters.endMonth?.forEach((item) => {
        queryParams.push({ name: "endMonth", value: item });
      });
      setParams(queryParams);
    }
  };

  return (
    <GradientContainer>
      <div style={{ padding: "20px 0" }}>
        <div style={{ paddingBlock: "10px 20px" }}>
          <h1 className="heading">Academic Semesters</h1>
        </div>
        <Table
          columns={columns}
          dataSource={tableData}
          onChange={onChange}
          loading={isLoading}
        />
      </div>
    </GradientContainer>
  );
};

export default AcademicSemester;