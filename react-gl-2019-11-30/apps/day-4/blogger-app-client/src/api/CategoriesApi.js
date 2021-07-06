const apiBaseUrl = 'http://localhost:3001/categories';

export const getCategories = async () => {
  const response = await fetch(apiBaseUrl);
  return await response.json();
};
