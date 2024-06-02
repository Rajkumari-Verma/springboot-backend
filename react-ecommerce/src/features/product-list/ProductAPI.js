// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products/" +id);
    const data = await response.json();
    resolve({ data });
  });
}


export function fetchProductsByFilters(filter, sort, pagination) {
  // filter = {"category":["smartphone","laptops"] }
  // sort = {_sort:"price,_order="order"}
  // pagination ={ _page:1,limit=10} // page=10&_limit=10
  // Todo : on server we will support  multi values
  let qureyString = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      qureyString += `${key}=${lastCategoryValue}&`;
    }
  }

  for (let key in sort) {
    qureyString += `${key}=${sort[key]}&`;
  }

  console.log(pagination);
  for (let key in pagination) {
    qureyString += `${key}=${pagination[key]}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/products?" + qureyString
    );
    const data = await response.json();
    const totalItems = await response.headers.get("x-Total-Count");

    resolve({ data: { products: data, totalItems: totalItems } });
  });
}

export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/categories");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/brands");
    const data = await response.json();
    resolve({ data });
  });
}
