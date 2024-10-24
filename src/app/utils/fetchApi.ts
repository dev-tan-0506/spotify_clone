/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from "js-cookie";
const access_token =
  Cookies.get("access_token") && `Bearer ${Cookies.get("access_token")}`;

const BaseUrl = "http://localhost:3002";
const useAPI = {
  get: async (url: string) => {
    try {
      const config: any = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: access_token || "",
        },
      };
      const response = await fetch(`${BaseUrl}/${url}`, config);
      if (!response.ok) {
        console.error("Response status: " + response.status);
        return null;
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error: ${error}`);
      return null;
    }
  },
  post: async (url: string, payload: any) => {
    try {
      const response = await fetch(`${BaseUrl}/${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: access_token || "",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.error("Response status: " + response.status);
        return null;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error: ${error}`);
      return null;
    }
  },
};

export default useAPI;
