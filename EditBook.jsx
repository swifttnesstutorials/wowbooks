import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
    author: "",
    publishYear: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5656/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError("Error fetching book details");
        setLoading(false);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .put(`http://localhost:5656/books/${id}`, book)
      .then((response) => {
        setLoading(false);
        navigate(`/books/details/${id}`);
      })
      .catch((error) => {
        console.log(error);
        setError("Error updating book details");
        setLoading(false);
      });
  };

  return (
    <div className="p-4">
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <h1 className="text-3xl mb-4">Edit Book</h1>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={book.title}
                onChange={handleInputChange}
                className="border rounded w-full py-2 px-3 text-gray-700"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Author</label>
              <input
                type="text"
                name="author"
                value={book.author}
                onChange={handleInputChange}
                className="border rounded w-full py-2 px-3 text-gray-700"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Publish Year</label>
              <input
                type="number"
                name="publishYear"
                value={book.publishYear}
                onChange={handleInputChange}
                className="border rounded w-full py-2 px-3 text-gray-700"
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditBook;
