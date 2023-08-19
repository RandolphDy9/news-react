import { Link } from "react-scroll";
import _ from "lodash";
import { format } from "date-fns";
import { useNavigate } from 'react-router-dom';

type NavbarType = {
  activeSection: string;
  toggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
  sections: string[];
}

const Navbar = ({ activeSection, toggleMobileMenu, isMobileMenuOpen, sections }: NavbarType) => {
  const navigate = useNavigate();

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

  return (
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
            {/* <input
                type="text"
                className="bg-background border-2 border-primary border-spacing-2 rounded-2xl py-1 md:px-6"
                onChange={(event) => setQuery(event.target.value)}
                value={query}
              />
              <button className="p-2 font-bold" onClick={handleSearch}>
                Go!
              </button> */}
          </div>

          <div
            className="w-full md:w-1/3 text-5xl font-bold font-main cursor-pointer"
            onClick={() => navigate("/")}
          >
            .newsfeed
          </div>

          <div className="w-full md:w-1/3 font-secondary flex justify-center md:justify-end">
            <CurrentDate />
          </div>
        </div>
        <div className="flex md:flex-row flex-col md:justify-center md:gap-16 border-b-2 border-primary pb-2 mt-4 md:mt-8">
          {/* Collapsible mobile menu */}
          <div className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}>
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
  );
};

export default Navbar;
