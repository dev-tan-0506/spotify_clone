export default function useFetchAPI() {
  const getAPI = async (url: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error("Response status: " + response.status);
        return;
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };
  return [getAPI];
}

export const getAPI = async (url: string) => {
  try {
    const response = await fetch(url);
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
};
