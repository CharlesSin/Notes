import axios from "axios";
import cheerio from "cheerio";

const fetchData = async (url) => {
  console.log("Crawling data...");
  // make http call to url
  let response = await axios(url).catch((err) => console.log(err));

  if (response.status !== 200) {
    console.log("Error occurred while fetching data");
    return { error: true, msg: "Error occurred while fetching data" };
  }

  // using cheerio decode html
  const $ = cheerio.load(response.data);

  const title = $("title").text();
  const desc = $('meta[name="description"]').attr("content");

  return { error: false, msg: "Fetch Successful", data: { title, desc } };
};

export default fetchData;
