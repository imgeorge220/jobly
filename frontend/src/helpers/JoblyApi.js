import axios from 'axios';
import { formatData } from './ApiHelpers';

class JoblyApi {
  static async request(endpoint, paramsOrData = {}, verb = "get") {
    paramsOrData._token = (localStorage.getItem("_token"));

    // console.debug("API Call:", endpoint, paramsOrData, verb);

    try {
      return (await axios({
        method: verb,
        url: `http://localhost:5000/${endpoint}`,
        [verb === "get" ? "params" : "data"]: paramsOrData
      })).data;
      // axios sends query string data via the "params" key,
      // and request body data via the "data" key,
      // so the key we need depends on the HTTP verb
    }

    catch (err) {
      // console.error("API Error:", err.response);
      let message = err.response.data.message;
      // throw Array.isArray(message) ? message : [message];
      // return false;
      return { error: Array.isArray(message) ? message : [message] };
    }
  }

  static async getToken(formData, endpoint) {
    const data = formatData(formData);

    let res = await this.request(endpoint, data, 'post');
    if (res.token) {
      localStorage.setItem("_token", res.token);
      localStorage.setItem("username", data.username);
    }
    return res;
  }

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  static async getCompanies(search) {
    const endpoint = search ? `companies/?search=${search}` : 'companies/';
    let res = await this.request(endpoint);
    return res.companies;
  }

  static async getJobs(search) {
    const endpoint = search ? `jobs/?search=${search}` : 'jobs/';
    let res = await this.request(endpoint);
    return res.jobs;
  }

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  static async patchUser(username, formData) {
    const data = formatData(formData);
    let res = await this.request(`users/${username}`, data, 'patch');

    return res;
  }

  static async apply(jobId, username) {
    let res = await this.request(
      `jobs/${jobId}/apply`,
      { state: "applied", username },
      "post"
    );
    return res;
  }
}


export default JoblyApi;