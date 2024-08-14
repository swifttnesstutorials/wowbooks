import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import booksRoute from './routes/booksRoute.js';   

export const PORT = process.env.PORT || 5656;
export const mongoDBURL = process.env.MONGODB_URL || "mongodb+srv://aryanandhaaryanandha5:GHnW8KFxwthrMUSW@cluster0.wnbde.mongodb.net/";

const app = express();

app.use(express.json());
app.use(cors());
app.use('/', booksRoute);  

mongoose.connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("App connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
