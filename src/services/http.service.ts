import axios from "axios";

export const HttpService = {
  get(url: string, params: any): Promise<any> {
    return axios.get(url, params);
  }
};
