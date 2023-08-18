import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import { Link } from "react-scroll";
import _ from "lodash";

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
  const [articles, setSetArticles] = useState<NewsType[]>();
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

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
        `https://newsapi.org/v2/everything?q=${category}&apiKey=${process.env.REACT_APP_NEWS_KEY}`
      )
      .then((response) => {
        console.log(response);
        const filtered = response.data.articles.filter(
          (item: NewsType) => item.urlToImage !== null
        );
        setSetArticles(filtered);
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
            setActiveSection(category)
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

  return (
    <div className="w-full mx-auto p-4 relative bg-background">
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

      <div className="grid grid-cols-2 m-0 p-0 md:grid-cols-3 md:mt-40 md:my-32">
        {articles &&
          articles.map((item: NewsType) => {
            return (
              <div
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
