/* eslint-disable @typescript-eslint/no-explicit-any */
const BaseUrl = "http://localhost:3002";
const useAPI = {
  get: async (url: string) => {
    try {
      const response = await fetch(`${BaseUrl}/${url}`);
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
