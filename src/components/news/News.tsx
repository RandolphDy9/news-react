import { useEffect, useState } from "react";
import axios from "axios";

type NewsType = {
  author: string;
  content: string;
  description: string;
  title: string;
  url: string;
  urlToImage: string;
};

const News = () => {
  const [news, setNews] = useState<NewsType[]>();

  const getNews = () => {
    axios
      // .get(
      //   `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${process.env.REACT_APP_NEWS_KEY}`
      // )
      .get('/articles')
      .then((response) => {
        const filtered = response.data.filter((item: NewsType) => item.urlToImage !== null);
        setNews(filtered);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getNews();
  });

  return (
    <div className="gap-16 md:columns-2 lg:columns-3 columns-1 mt-8 border-t-neutral-200 border-t-2 pt-8 border-l-2 border-r-2 px-20 rounded-2xl bg-white drop-shadow-2xl">
      {news?.map((item: NewsType, index: number) => {
        return (
          <div key={index}>
            <div
              className="p-2 cursor-pointer"
              onClick={() => window.open(`${item.url}`)}
            >
              <div className="mt-10 mb-2">
                <img src={item.urlToImage} alt={`news${index}`} />
              </div>
              <div className="text-left font-medium text-xl">{item.title}</div>
              <div className="text-xs mt-2">By {item.author}</div>
              <div className="my-4 text-justify">{item.description}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default News;
