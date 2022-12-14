import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { ReactComponent as Github } from "../../assets/icons/github.svg";
import { ReactComponent as Matrix } from "../../assets/icons/matrix.svg";
import { ReactComponent as Twitter } from "../../assets/icons/twitter.svg";
import logoText from "../../assets/logo-rounded.svg";
import { DOCS_URL, PLAYGROUND_URL } from "../../constants";

const Header = () => {
  const [showNav, setShowNav] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768); // tailwind md=768px
  window.addEventListener("resize", () => {
    setIsDesktop(window.innerWidth > 768);
  });

  const toggleNav = () => {
    setShowNav((prev) => !prev);
  };
  return (
    <header className="flex flex-wrap justify-between w-auto py-4 md:py-6 md:flex-nowrap">
      <ReactTooltip effect="solid" />
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <img src={logoText} alt="Trustcontract logo" className="max-h-10" />
          <span className="ml-3 text-2xl text-gray-700 font-vt323">
            trustcontract.dev
          </span>
        </Link>
      </div>
      <button className="block md:hidden" onClick={toggleNav}>
        <HiMenu className="text-3xl text-gray-700 hover:text-ceruleanBlue-500" />
      </button>
      {/* A div to break flex into new line */}
      <div className="h-0 basis-full"></div>
      <div
        className={`${
          showNav || isDesktop ? "flex" : "hidden"
        } items-center justify-center md:justify-end text-center flex-col md:flex-row w-full mt-4 md:mt-0`}
      >
        <nav
          className={`${
            showNav || isDesktop ? "flex" : "hidden"
          } font-vt323 text-2xl text-gray-700 flex-col md:flex-row`}
        >
          <Link
            className="mx-2 my-2 link-underline md:mx-6 hover:text-ceruleanBlue-500"
            to="/verifier"
          >
            Verify
          </Link>
          <Link
            className="mx-2 my-2 link-underline md:mx-6 hover:text-ceruleanBlue-500"
            to="/lookup"
          >
            Lookup
          </Link>
          <a
            className="mx-2 my-2 link-underline md:mx-6 hover:text-ceruleanBlue-500"
            href={DOCS_URL}
          >
            Docs
          </a>
          <a
            className="mx-2 my-2 link-underline md:mx-6 hover:text-ceruleanBlue-500"
            href={PLAYGROUND_URL}
          >
            Playground
          </a>
        </nav>
        {/* Icons */}
        <div className="flex items-center mt-6 md:ml-8 md:mt-0">
          <a
            className="px-2 hover-to-fill"
            href="https://github.com/jfinchain/trustcontract"
            data-tip="Github"
          >
            <Github className="w-auto h-6 fill-gray-700 " />
          </a>
          <a
            className="px-2 hover-to-fill"
            href="#"
            data-tip="Twitter"
          >
            <Twitter className="h-[1.4rem] w-auto fill-gray-700 500" />
          </a>

        </div>
        {/* <Link
          className="mt-6 mb-2 ml-2 link-underline md:mt-2 md:ml-6 hover:text-ceruleanBlue-500"
          to="/status"
          data-tip="Server status: working"
        >
          <span className="inline md:hidden">Server status: </span> ✅
        </Link> */}
      </div>
    </header>
  );
};

export default Header;
