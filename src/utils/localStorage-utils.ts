export const setDataInLocalStorage = (key: string, data: any) => {
  if (typeof window === "undefined") return;
  if (key && window) {
    if (typeof data === "object") {
      const newData = JSON.stringify(data);
      localStorage.setItem(key, newData);
    } else localStorage.setItem(key, data);
  }
};

export const getDataFromLocalStorage = (key: string) => {
  if (typeof window === "undefined") return;
  if (key && window) {
    const data = localStorage.getItem(key);
    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        return data;
      }
    }
  }
  return null;
};

export const removeDataFromLocalStorage = (key: string) => {
  if (typeof window === "undefined") return;
  if (key) {
    const data = localStorage.getItem(key);
    if (data) {
      localStorage.removeItem(key);
    }
  }
  return null;
};

export const clearDataFromLocalStorage = () => {
  if (typeof window === "undefined") return;
  localStorage.clear();
};
