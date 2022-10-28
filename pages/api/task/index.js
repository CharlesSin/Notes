import Bookmark from "../../../models/Bookmark";
import dbConnect from "../../../utils/dbConnect";
import fetchData from "../../../utils/fetchHtml";

export default async (req, res) => {
  const { method } = req;

  // Connect to database
  await dbConnect();

  // Create Bookmark
  if (method === "POST") {
    try {
      const { bookmark } = req.body;
      let response = await fetchData(bookmark);
      let { error, msg, data: dataObj } = response;
      let { title, desc } = dataObj;
      let domain = bookmark.split("/")[2];

      const saveLink = await new Bookmark({
        link: bookmark,
        title,
        desc,
        domain,
      }).save();

      res
        .status(201)
        .json({ data: saveLink, message: "Bookmark added successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
    }
  }

  if (method === "GET") {
    try {
      const bookmarkList = await Bookmark.find({}).limit(10).exec();

      res.status(200).json({ data: bookmarkList.reverse() });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
    }
  }
};
