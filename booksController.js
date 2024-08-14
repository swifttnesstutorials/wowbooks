import { Book } from './models/bookmodel.js';

export const createBook = async (req, res) => {
  try {
    const { title, author, publishyear } = req.body;
    if (!title || !author || !publishyear) {
      return res.status(400).send({ message: "Please fill all required fields" });
    }

    const newBook = new Book({ title, author, publishyear });
    const aBook = await newBook.save();
    return res.status(201).send(aBook);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ message: error.message });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).send(books);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ message: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    return res.status(200).send(book);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ message: error.message });
  }
};

export const updateOne = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    return res.status(200).send({ message: "Book updated successfully", book });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ message: error.message });
  }
};

export const deleteOne = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    return res.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ message: error.message });
  }
};
