export class CategoryService {

  constructor() { }

  async getCategories() {
    const url = process.env.REACT_APP_URL + 'category/';
    return await fetch(url, {
      method: 'GET',
      // body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('Authorization')
      }
    });
  }

}
