import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-scroll";
import _ from "lodash";
import { format } from "date-fns";
import { useNavigate } from 'react-router-dom';

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
  const [query, setQuery] = useState("");
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

  const fetchNews = (
    item: string,
    setter: React.Dispatch<React.SetStateAction<any>>
  ) => {
    axios
      .get(
        `https://newsapi.org/v2/everything?q=${item}&apiKey=${process.env.REACT_APP_NEWS_KEY}`
      )
      .then((response) => {
        console.log(response);
        const filtered = response.data.articles.filter(
          (item: NewsType) => item.urlToImage !== null
        );
        setArticles((prevState: any) => ({
          ...prevState,
          [item]: filtered,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchNews("news", setArticles);
    fetchNews("sports", setArticles);
    fetchNews("entertainment", setArticles);
    fetchNews("life", setArticles);
    fetchNews("money", setArticles);
    fetchNews("tech", setArticles);
    fetchNews("travel", setArticles);
  }, []);

  const NavigationItem = ({ name }: { name: string }) => {
    return (
      <button
        className={`${
          activeSection === name ? "border-b-2 border-primary font-bold" : ""
        } py-1 md:py-0 md:border-b-2 md:border-transparent md:hover:border-primary md:hover:font-bold md:px-2`}
      >
        <Link to={name} smooth={true} offset={-170} duration={500}>
          {_.capitalize(name)}
        </Link>
      </button>
    );
  };

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

  const handleSearch = () => {
    console.log(query);
    navigate(`/${query}`);
  };

  const CurrentDate = () => {
    const currentDate = new Date();
    const formattedDate = format(currentDate, "EEEE, MMMM d, yyyy");
    const formattedTime = format(currentDate, "h:mm a");

    return (
      <div className="text-primary text-sm flex font-bold">
        <p>
          {formattedDate} - {formattedTime}
        </p>
      </div>
    );
  };

  const Footer = () => {
    return (
      <div className="flex flex-col justify-center items-center text-sm gap-10 w-80 md:w-1/2 mx-auto mt-4 text-center py-8">
        <div>
          Crafted with creativity and inspired by the vibrant world of Dribbble,
          the design of this news page is a fusion of innovative ideas. Drawing
          from an eclectic palette of color combinations and fonts, our website
          offers a unique visual experience.
        </div>
        <div className="text-xs font-bold">
          Developed with passion by Randolph Dy &copy; 2023
        </div>
      </div>
    );
  };

  type NewsSectionType = {
    item: string;
    article: any[];
  }

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
            <div className="underline text-md font-bold text-primary" onClick={() => navigate(`/${item}`)}>
              View More
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full mx-auto p-4 relative">
      <div className="border-gray-50">
        <div className="fixed top-0 left-0 w-full bg-background z-50 px-4 md:px-28 pt-6 md:pt-10">
          <div className="flex lg:flex-row flex-col gap-4 justify-between items-center text-center py-6">
            {/* <Navbar toggleMobileMenu={toggleMobileMenu} /> */}

            <div className="w-full md:w-1/3 font-secondary flex justify-center md:justify-start items-center gap-6">
              <div className="block px-2" onClick={toggleMobileMenu}>
                <button className="flex items-center cursor-pointer">
                  <svg
                    className="fill-current h-6 w-6"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                  </svg>
                </button>
              </div>
              <input
                type="text"
                className="bg-background border-2 border-primary border-spacing-2 rounded-2xl py-1 md:px-6"
                onChange={(event) => setQuery(event.target.value)}
                value={query}
              />
              <button className="p-2 font-bold" onClick={handleSearch}>
                Go!
              </button>
            </div>

            <div className="w-full md:w-1/3 text-5xl font-bold font-main" onClick={() => navigate('/')}>
              .newsfeed
            </div>

            <div className="w-full md:w-1/3 font-secondary flex justify-center md:justify-end">
              <CurrentDate />
            </div>
          </div>
          <div className="flex md:flex-row flex-col md:justify-center md:gap-16 border-b-2 border-primary pb-2 mt-4 md:mt-8">
            {/* Collapsible mobile menu */}
            <div
              className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}
            >
              {sections.map((item) => (
                <div key={item} className="md:py-2">
                  <NavigationItem name={item} />
                </div>
              ))}
            </div>

            {/* Desktop menu */}
            <div className="hidden md:flex md:flex-row md:gap-2">
              {sections.map((item) => (
                <div key={item} className="md:px-2">
                  <NavigationItem name={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

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
