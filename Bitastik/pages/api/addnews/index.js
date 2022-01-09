import dbConnect from "../../../lib/dbconnect";
import news from "../../../models/news";
dbConnect();

async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const data = req.body;
      const { title, image, date, description } = data;
      const user = await news.updateOne(
        { title },
        { title, image, date, description },
        { upsert: true }
      );
      res.status(201).json({ message: "News Inserted" });
    } catch (err) {
      const response = { Status: "Failure", Desciription: err.message };
      res.send(response).status(400);
    }
  }
}

export default handler;
