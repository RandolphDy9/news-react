import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

type NewsType = {
  author: string;
  content: string;
  description: string;
  title: string;
  url: string;
  urlToImage: string;
};

const News = () => {
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const [articles, setArticles] = useState<any>({
    news: [],
    sports: [],
    entertainment: [],
    life: [],
    money: [],
    tech: [],
    travel: [],
  });

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
    const handleScroll = () => {
      for (const section of sections) {
        const element = document.getElementById(section);
        const rect = element && element.getBoundingClientRect();
        if (rect && rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchNews = () => {
    axios
      .get(
        `https://raw.githubusercontent.com/RandolphDy9/news-react/main/db.json`
      )
      .then((response) => {
        console.log(response.data);
        const data = response.data;
        setArticles(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const Card = ({ news }: { news: NewsType }) => {
    return (
      <div className="w-full md:w-1/3 cursor-pointer">
        <div className="mt-10 mb-2">
          <img
            src={news?.urlToImage}
            alt="news1"
            className="h-[200px] w-full object-cover rounded-lg"
            onClick={() => window.open(`${news?.url}`)}
          />
        </div>
        <div
          className="text-xl font-main my-3"
          onClick={() => window.open(`${news?.url}`)}
        >
          {news?.title}
        </div>
        <div className="text-sm">{news?.author}</div>
      </div>
    );
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  // const handleSearch = () => {
  //   console.log(query);
  //   navigate(`/${query}`);
  // };

  type NewsSectionType = {
    item: string;
    article: any[];
  };

  const NewsSection = ({ item, article }: NewsSectionType) => {
    return (
      <div
        key={item}
        id={item}
        className={`tab-content mt-10 border-b-2 border-primary pb-8 md:pb-16 md:shadow-lg md:px-6 ${
          item === "news" ? "pt-40 md:pt-32" : "-p-5 md:pt-2"
        }`}
      >
        <div className="tab-pane active">
          <div className="text-5xl text-primary my-10 font-main font-semibold relative">
            <div className="z-10 relative">{item}</div>
            <div className="absolute bottom-0 h-3.5 w-32 bg-accent"></div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-32">
            <div className="w-full md:w-1/2 flex flex-col gap-2 cursor-pointer">
              <div className="text-sm">{article && article[0]?.author}</div>
              <div
                className="text-4xl font-main"
                onClick={() => window.open(`${article && article[0]?.url}`)}
              >
                {article && article[0]?.title}
              </div>
            </div>
            <div className="w-full md:w-1/2 cursor-pointer">
              {article && (
                <img
                  src={article[0]?.urlToImage}
                  alt="main-news-img"
                  className="rounded-lg"
                  onClick={() => window.open(`${article && article[0]?.url}`)}
                />
              )}
            </div>
          </div>
          {article && (
            <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-10">
              <Card news={article[1]} />
              <Card news={article[2]} />
              <Card news={article[3]} />
            </div>
          )}
          <div className="flex justify-center mt-12 cursor-pointer">
            <div
              className="underline text-md font-bold text-primary"
              onClick={() => navigate(`/${item}`)}
            >
              View More
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full mx-auto p-4 relative">
      <Navbar
        activeSection={activeSection}
        toggleMobileMenu={toggleMobileMenu}
        isMobileMenuOpen={isMobileMenuOpen}
        sections={sections}
      />

      <NewsSection item="news" article={articles.news} />
      <NewsSection item="sports" article={articles.sports} />
      <NewsSection item="entertainment" article={articles.entertainment} />
      <NewsSection item="life" article={articles.life} />
      <NewsSection item="money" article={articles.money} />
      <NewsSection item="tech" article={articles.tech} />
      <NewsSection item="travel" article={articles.travel} />
      <Footer />
    </div>
  );
};

export default News;
