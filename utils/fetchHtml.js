import axios from "axios";
import cheerio from "cheerio";

const shortTitle = (string1 = "", string2 = "") => {
  if (string1.length === 0) {
    return string2;
  }

  if (string2.length === 0) {
    return string1;
  }

  return string1.length < string2.length ? string1 : string2;
};

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

  const original_title = $("title").text();
  const desc = $('meta[name="description"]').attr("content");
  const property_title = $('meta[property="og:title"]').attr("content");

  const title = shortTitle(original_title, property_title);

  return { error: false, msg: "Fetch Successful", data: { title, desc } };
};

export default fetchData;
