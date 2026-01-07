import axios from 'axios';

export const BASEURL = 'http://localhost:3000';

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// 2. 创建实例并显式指定类型
// 我们通过类型断言，让 service 意识到返回的是 ApiResponse 而不是原始的 AxiosResponse
const service = axios.create({
  baseURL: BASEURL,
  timeout: 5000,
});

service.interceptors.request.use(
  (config) => {
    // 从 Cookie 获取 token
    const token = getCookie('token');
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 3. 响应拦截器：添加类型保护
service.interceptors.response.use(
  (response) => {
    // 这里 response.data 的类型就是 ApiResponse
    const res = response.data;

    // 可以在这里做全局错误处理
    if (res.code !== 200) {
      console.error(res.message || 'Error');
      // 可以根据 code 跳转登录等
      return Promise.reject(new Error(res.message || 'Error'));
    }

    return res; // 返回处理后的数据
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 4. 封装基础方法，利用泛型传递类型
const request = {
  get(url, params = {}) {
    return service.get(url, { params });
  },

  post(url, data = {}) {
    return service.post(url, data);
  },

  put(url, data = {}) {
    return service.put(url, data);
  },

  delete(url, params = {}) {
    return service.delete(url, { params });
  }
};

export default request;