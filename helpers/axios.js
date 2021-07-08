import axios from 'axios';
import {urlConfig} from './urlConfig';
const axiosInstance = axios.create({
  baseURL: `${urlConfig}`,
});

export default axiosInstance;
