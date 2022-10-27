interface GetBooksQuery {
  page?: string;
  size?: string;
  categoryId: string;
}

export const getBooksAPI = async (query: GetBooksQuery) => {
  try {
    const querystring = new URLSearchParams({ ...query }).toString();
    const response = await fetch(
      'https://cors-anywhere.herokuapp.com/https://asia-southeast2-sejutacita-app.cloudfunctions.net/fee-assessment-books?' +
        querystring,
    );

    const data = await response.json();
    return data;
  } catch (err) {
    return [];
  }
};
