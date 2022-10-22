import axios, { AxiosInstance } from 'axios';
interface AxiosParams {
  url: string;
  method: string;
  data: Record<string | number, any>;
  params: Record<string | number, any>;
}

const GameInstance = axios.create();

GameInstance.interceptors.request.use((req) => {
  req.headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
  };
  return req;
});

const createClient = (instance: AxiosInstance) => {
  return ({
    url = '',
    method = 'get',
    data = {},
    params = {},
  }: AxiosParams) => {
    // return (instance as any)[method](url, { data: data, params: params });
    const _params =
      Object.keys(params).length === 0 ? data : { data: data, params: params };
    return (instance as any)[method](url, _params);
  };
};

export const GameAxiosClient = createClient(GameInstance);
