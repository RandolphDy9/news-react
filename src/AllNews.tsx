import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";

type NewsType = {
  author: string;
  content: string;
  description: string;
  title: string;
  url: string;
  urlToImage: string;
};

const AllNews = () => {
  const { category } = useParams();
  const [articles, setArticles] = useState<NewsType[]>();
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sections = [
    "news",
    "sports",
    "entertainment",
    "life",
    "money",
    "tech",
    "travel",
  ];

  useEffect(() => {
    axios
      .get(
        `https://raw.githubusercontent.com/RandolphDy9/news-server/main/db.json`
      )
      .then((response) => {
        console.log(response.data);
        const data = response.data;
        if (category === "news") setArticles(data.news);
        else if (category === "sports") setArticles(data.sports);
        else if (category === "entertainment") setArticles(data.entertainment);
        else if (category === "life") setArticles(data.life);
        else if (category === "money") setArticles(data.money);
        else if (category === "tech") setArticles(data.tech);
        else if (category === "travel") setArticles(data.travel);
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      for (const section of sections) {
        const element = document.getElementById(section);
        const rect = element && element.getBoundingClientRect();
        if (rect && rect.top <= 100 && rect.bottom >= 100) {
          // setActiveSection(section);
          if (category) {
            setActiveSection(category);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="w-full mx-auto p-4 relative bg-background">
      <Navbar
        activeSection={activeSection}
        toggleMobileMenu={toggleMobileMenu}
        isMobileMenuOpen={isMobileMenuOpen}
        sections={sections}
      />

      <div className="grid grid-cols-2 m-0 p-0 md:grid-cols-3 md:mt-40 md:my-32">
        {articles &&
          articles.map((item: NewsType) => {
            return (
              <div
                key={item.author}
                className="p-6"
                onClick={() => window.open(`${item.url}`)}
              >
                <div className="flex flex-col gap-2">
                  <img
                    src={item.urlToImage}
                    alt="news1"
                    className="h-[200px] w-full object-cover rounded-lg"
                    onClick={() => window.open(`${item.url}`)}
                  />
                  <div className="text-xl font-bold">{item.title}</div>
                  <div className="text-sm">{item.description}</div>
                  <div className="text-md">{item.author}</div>
                </div>
              </div>
            );
          })}
      </div>

      <footer />
    </div>
  );
};

export default AllNews;
