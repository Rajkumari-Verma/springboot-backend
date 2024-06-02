import React, { useState, useEffect } from "react";

const Apps = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

  useEffect(() => {
    fetch("http://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleFilter = (e) => {
    const keyword = e.target.value.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(keyword) ||
        product.description.toLowerCase().includes(keyword) ||
        product.category.toLowerCase().includes(keyword)
    );
    setFilteredProducts(filtered);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const renderTableHeader = () => {
    return currentProducts.map((product) => (
      <tr key={product.id}>
        <td onClick={() => alert(`The product of title is: ${product.title}`)}>
          {product.title}
        </td>
        <td>{product.description}</td>
        <td>{product.price}</td>
        <td>{product.rating}</td>
        <td>{product.category}</td>
      </tr>
    ));
  };

  const renderTableData = () => {
    return currentProducts.map((product) => (
      <tr key={product.id}>
        <td>{product.title}</td>
        <td>{product.description}</td>
        <td>{product.price}</td>
        <td>{product.rating}</td>
        <td>{product.category}</td>
      </tr>
    ));
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <input type="text" placeholder="Search..." onChange={handleFilter} />
      <table>
        <thead>{renderTableHeader()}</thead>
        <tbody>{renderTableData()}</tbody>
      </table>
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={filteredProducts.length}
        paginate={paginate}
      />
    </div>
  );
};

const Pagination = ({ productsPerPage, totalProducts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul>
        {pageNumbers.map((number) => (
          <li key={number}>
            <a href="#!" onClick={() => paginate(number)}>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Apps;
