import { useEffect, useState } from "react";
import Filter from "../components/Filter";
import axios from "axios";
import Card from "../components/Card";
import { useNavigate, useSearchParams } from "react-router-dom";

const Product = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const params = {
      q: searchParams.get("search"),
      //_sort: "title",
     // _order: searchParams.get("sort") === "z-a" ? "desc" : "asc",
    };
    axios
      .get("http://localhost:3000/books", { params })
      .then((res) => setBooks(res.data))
      .catch((err) => {
        navigate("/notfound");
      });
  }, [searchParams]);
  return (
    <div className="container my-5">
      {books.length === 0 ? (
        <h3 className="bg-danger p-3 rounded fs-2 text-center">
          Aratılan kitap bulunmadı !!
        </h3>
      ) : (
        <h3>{books.length} kitap bulundu</h3>
      )}
      <Filter />
      <div className="cards-container">
        {books.map((book) => (
          <Card key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Product;
