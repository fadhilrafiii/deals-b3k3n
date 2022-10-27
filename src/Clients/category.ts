export const getBookCategoriesAPI = async () => {
  try {
    const res = await fetch(
      'https://cors-anywhere.herokuapp.com/https://asia-southeast2-sejutacita-app.cloudfunctions.net/fee-assessment-categories',
    );

    const data = await res.json();
    return data;
  } catch (err) {
    return [];
  }
};
