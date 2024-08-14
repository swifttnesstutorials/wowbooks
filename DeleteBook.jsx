import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

const DeleteBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
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

  const handleDelete = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5656/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setError("Error deleting the book");
        setLoading(false);
      });
  };

  return (
    <div className="p-4">
      <BackButton destination="/" />
      {loading ? (
        <Spinner />
      ) : (
        <div>
          {error && <p className="text-red-500">{error}</p>}
          {book ? (
            <div>
              <h1 className="text-3xl mb-4">Delete Book</h1>
              <p className="text-xl mb-4">Are you sure you want to delete this book?</p>
              <p className="text-xl mb-2">
                <strong>Title:</strong> {book.title}
              </p>
              <p className="text-xl mb-2">
                <strong>Author:</strong> {book.author}
              </p>
              <p className="text-xl mb-2">
                <strong>Publish Year:</strong> {book.publishYear}
              </p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
                <button
                  onClick={() => navigate(-1)}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p>No book found with this ID.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DeleteBook;
