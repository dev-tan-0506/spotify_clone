export default function useFetchAPI() {
  const getAPI = async (url: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  };
  return [getAPI];
}