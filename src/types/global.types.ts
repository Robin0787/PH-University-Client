import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TResponse<T> = {
  success: boolean;
  message: string;
  meta?: TMeta;
  data: T;
};

export type TMeta = {
  page: number;
  limit: number;
  totalPage: number;
  totalData: number;
};

export type TIssue = {
  path: string;
  message: string;
};

export type TError = {
  data: {
    success: boolean;
    message: string;
    stack: string;
    errorSources: TIssue[];
  };
  status: number;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;
