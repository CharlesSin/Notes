import Bookmark from "../../../models/Bookmark";
import dbConnect from "../../../utils/dbConnect";

export default async (req, res) => {
  const { method } = req;
  const { id } = req.query;

  // Connect to database
  await dbConnect();

  if (method === "PUT") {
    try {
      const result = await Bookmark.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );

      res
        .status(200)
        .json({ data: result, message: "Bookmark Updated Successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
    }
  }

  if (method === "DELETE") {
    try {
      await Bookmark.findByIdAndDelete(id);
      res.status(200).json({ message: "Bookmark Deleted Successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
    }
  }
};
