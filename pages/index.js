import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/Home.module.css";
import * as ga from "../utils/ga";

const url = "{deploy_server_url}/api/task";

export default function Home(props) {
  const [bookmarkLists, setBookmarkLists] = useState(props.link);
  const [bookmark, setBookmark] = useState({ bookmark: "" });

  useEffect(() => {
    ga.pageview("https://charles-favorite.vercel.app");
  }, []);

  const handleChange = ({ currentTarget: input }) => {
    input.value === ""
      ? setBookmark({ bookmark: "" })
      : setBookmark((prev) => ({ ...prev, bookmark: input.value }));
  };

  const addTask = async (e) => {
    e.preventDefault();
    ga.event({
      action: "create_bookmark",
      params: {
        bookmark_uri: bookmark,
      },
    });
    try {
      const { data } = await axios.post(url, bookmark);
      setBookmarkLists((prev) => [...prev, data.data]);
      setBookmark({ bookmark: "" });
      console.log(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async (item) => {
    ga.event({
      action: "click_bookmark",
      params: {
        bookmark_uri: item.link,
      },
    });
  };

  return (
    <main className={styles.main} role="main">
      <h1 className={styles.heading}>Charles Favorite List</h1>
      <article
        className={styles.container}
        itemScope
        itemType="http://schema.org/Article"
      >
        <form onSubmit={addTask} className={styles.form_container}>
          <input
            className={styles.input}
            type="text"
            placeholder="Link"
            onChange={handleChange}
            value={bookmark.bookmark}
          />
          <button type="submit" className={styles.submit_btn}>
            Add
          </button>
        </form>
        <section className={styles.bookmark_list} itemProp="articleBody">
          {bookmarkLists.map((item) => (
            <a
              className={styles.bookmark_list_container}
              href={item.link}
              key={item._id}
              title={item.title}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => handleClick(item)}
            >
              <h2 className={styles.bookmark_text}>{item.title}</h2>
              <h3 className={styles.bookmark_text}>{item.desc}</h3>
            </a>
          ))}
          {bookmarkLists.length === 0 && (
            <h2 className={styles.no_bookmark}>No Favorites</h2>
          )}
        </section>
      </article>
    </main>
  );
}

export const getServerSideProps = async () => {
  const { data } = await axios.get(url);
  return {
    props: {
      link: data.data,
    },
  };
};
