import React, { useEffect, useState } from "react";
import styles from "./CardNews.module.css";

import useCoingeckoRequest from "../../apiHooks/useThirdApiRequests";

const CardNews = () => {
  const { handleNewsRequest } = useCoingeckoRequest();
  const [newsList, setNewsList] = useState<any>(null);

  useEffect(() => {
    handleNewsRequest().then((data) => setNewsList(data));
  }, []);

  return (
    <div className={styles["card-news"]}>
      <h3 className={styles["card-news-title"]}>Crypto News</h3>
      <ul className={styles["news-list"]}>
        {newsList &&
          newsList.map((article: any, index: number) => {
            return (
              <li className={styles["list-item"]} key={index}>
                <a className={styles.link} href={article.data.url}>
                  <div className={styles["news-details"]}>
                    <h4 className={styles["news-title"]}>
                      {article.data.title}
                    </h4>
                    <p className={styles["news-date"]}>
                      {new Date(article.data.created * 1000).toLocaleDateString(
                        "en-US",
                        {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                        }
                      )}
                    </p>
                  </div>
                </a>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default CardNews;
