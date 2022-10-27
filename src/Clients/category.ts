export const getBookCategoriesAPI = async () => {
  try {
    const res = await fetch('/fee-assessment-categories');

    const data = await res.json();
    return data;
  } catch (err) {
    return err;
  }
};
