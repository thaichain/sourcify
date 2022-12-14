// AnimateOnScroll
import AOS from "aos";
import "aos/dist/aos.css";
import { useRef, useState } from "react";
import { BsChevronCompactDown } from "react-icons/bs";
import { HiCheckCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import jsonLang from "react-syntax-highlighter/dist/esm/languages/prism/json";
import solidityLang from "react-syntax-highlighter/dist/esm/languages/prism/solidity";
import lightStyle from "react-syntax-highlighter/dist/esm/styles/prism/ghcolors";
import codeStyle from "react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus";
import ReactTooltip from "react-tooltip";
import arbitrum from "../../assets/chains/arbitrum.svg";
import avalanche from "../../assets/chains/avalanche.png";
import bsc from "../../assets/chains/binance.png";
import boba from "../../assets/chains/boba.png";
import celo from "../../assets/chains/celo.png";
import ethereum from "../../assets/chains/ethereum.png";
import optimism from "../../assets/chains/optimism.svg";
import polygon from "../../assets/chains/polygon.webp";
import xdai from "../../assets/chains/xdai.png";
import decode from "../../assets/decode.gif";
import openSourceDecentralized from "../../assets/openSourceDecentralized.svg";
import verification from "../../assets/verification.svg";
import Button from "../../components/Button";
import Header from "../../components/Header";
import {
  DOCS_URL,
  IPFS_IPNS_GATEWAY_URL,
  REPOSITORY_SERVER_URL_FULL_MATCH,
} from "../../constants";
import ChartSection from "./ChartSection";
import sourceCode from "./Contract.sol";
import CustomCarousel from "./CustomCarousel";
import metadata from "./metadata.json";
import PoweredByTrustcontract from "./PoweredByTrustcontract";
import ToolsPlugin from "./ToolsPlugin";
AOS.init({
  duration: 800,
  once: true,
});

SyntaxHighlighter.registerLanguage("solidity", solidityLang);
SyntaxHighlighter.registerLanguage("json", jsonLang);

// Helper components

type ResourceListItemProps = {
  children: string;
  href: string;
  date?: string;
};
const ResourceListItem = ({ children, href, date }: ResourceListItemProps) => (
  <li>
    <a
      href={href}
      className="text-gray-600 colored-bullet hover:text-ceruleanBlue-500"
    >
      <span className="link-underline">{children}</span>{" "}
      {date && <span className="text-sm text-gray-400">{"- " + date}</span>}
    </a>
  </li>
);
type FooterItemProps = {
  href?: string;
  children: string;
};
const FooterItem = ({ href, children }: FooterItemProps) => (
  <a href={href}>
    <li className="text-ceruleanBlue-300 hover:text-ceruleanBlue-100">
      {children}
    </li>
  </a>
);

const A = ({ href, children }: FooterItemProps) => (
  <a href={href} className="text-ceruleanBlue-500 link-underline">
    {children}
  </a>
);
//////////////////////////////////
///////// MAIN COMPONENT /////////
//////////////////////////////////

const LandingPage = () => {
  const [showMoreReadResources, setShowMoreReadResources] = useState(false);
  const [showMoreWatchResources, setShowMoreWatchResources] = useState(false);

  const aboutRef = useRef<HTMLElement>(null);
  return (
    <div>
      <div className="flex flex-col h-screen px-8 bg-gray-100 md:px-12 lg:px-24 ">
        <Header />
        <section className="grid flex-1 gap-8 md:grid-cols-2">
          {/* Hero left */}
          <div className="flex flex-col justify-center">
            <h1 className="mb-4 text-2xl font-bold leading-tight md:text-3xl xl:text-4xl">
              Source-verified smart contracts for transparency and better UX in
              web3
            </h1>
            <h2 className="text-lg">
              Trustcontract enables transparent and human-readable smart contract
              interactions through automated Solidity contract verification,
              contract metadata, and NatSpec comments.
            </h2>
            <div className="flex flex-col items-center mt-4 sm:flex-row justify-evenly">
              <Link to="/verifier">
                <Button className="mt-4 uppercase">Verify Contract</Button>
              </Link>
              <Link to="/lookup">
                <Button className="mt-4 uppercase" type="secondary">
                  Lookup Contract
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero right */}
          <div
            className="items-center justify-center hidden overflow-hidden md:flex"
            id=""
          >
            <div
              className="relative flex items-center justify-center w-full h-full"
              id="hero-image"
            >
              {/* Source code visual */}
              <div
                className="absolute mt-16 mr-16 xl:mt-32 xl:mr-32 z-10 transition-all duration-300 ease-in-out md:text-[0.6rem] lg:text-[0.7rem]"
                id="hero-source-code"
              >
                <SyntaxHighlighter
                  language="solidity"
                  style={codeStyle}
                  className="rounded-md"
                  customStyle={{
                    fontSize: "inherit",
                    lineHeight: "1.2",
                    padding: "1rem",
                  }}
                  wrapLongLines
                  codeTagProps={{ style: { display: "block" } }}
                >
                  {sourceCode}
                </SyntaxHighlighter>
              </div>
              {/* Verification visual */}
              <div
                className="absolute z-0 px-4 py-2 mb-16 ml-16 text-xs transition-all duration-300 ease-in-out border-2 rounded-md lg:ml-32 bg-ceruleanBlue-100 border-ceruleanBlue-400 lg:text-sm"
                id="hero-bytecode"
              >
                <div className="py-4">
                  <div className="flex items-center text-green-600 ">
                    <HiCheckCircle className="inline mr-1 text-xl text-green-600 align-middle" />
                    Contract fully verified
                  </div>
                </div>
                <div className="">
                  <img
                    src={ethereum}
                    className="inline h-6 mb-1 -ml-1"
                    alt="eth icon"
                  />
                  <a
                    href={`${REPOSITORY_SERVER_URL_FULL_MATCH}/5/0x00878Ac0D6B8d981ae72BA7cDC967eA0Fae69df4`}
                    className="break-all link-underline"
                  >
                    <b>Ethereum Görli</b> <br />
                    0x00878Ac0D6B8d981ae72BA7cDC967eA0Fae69df4
                  </a>
                </div>
                <div className="mt-4 text-[0.6rem]">
                  <p className="text-sm">metadata.json</p>
                  <SyntaxHighlighter
                    language="json"
                    style={lightStyle}
                    className="h-48 p-3 m-3 rounded-md xl:h-64"
                    customStyle={{
                      fontSize: "inherit",
                      lineHeight: "1.2",
                    }}
                    wrapLongLines
                    codeTagProps={{ style: { display: "block" } }}
                  >
                    {metadata}
                  </SyntaxHighlighter>
                </div>
              </div>
            </div>
          </div>
        </section>
        <a className="flex justify-center my-4" href="/#about">
          <BsChevronCompactDown className="inline text-4xl text-gray-500 animate-bounce" />
        </a>
      </div>

      {/* About section */}
      <section
        className="px-8 py-16 bg-white md:px-12 lg:px-48"
        ref={aboutRef}
        id="about"
      >
        <div className="mt-12">
          <div className="flex flex-col items-center md:flex-row">
            <div className="flex-1" data-aos="fade-right">
              <img
                src={openSourceDecentralized}
                alt="Illustration depicting open source and decentralized development"
                className="w-64 md:w-auto md:pr-48 md:pl-8 -scale-x-100"
              />
            </div>
            <div className="flex-1 mt-4 md:mt-0" data-aos="fade-left">
              <h1 className="text-2xl font-bold text-ceruleanBlue-500">
                Fully open-source and decentralized
              </h1>{" "}
              <p className="mt-4 text-lg">
                Trustcontract's code is fully open-sourced. The repository of
                verified contracts is completely public and decentralized by
                being served over <A href={IPFS_IPNS_GATEWAY_URL}>IPFS</A>.
              </p>
            </div>
          </div>
        </div>
        <div className="my-24 md:text-right">
          <div className="flex flex-col-reverse items-center md:flex-row">
            <div className="flex-1 mt-4 md:mt-0" data-aos="fade-right">
              <h1 className="text-2xl font-bold text-ceruleanBlue-500">
                Next-level smart contract verification
              </h1>{" "}
              <p className="mt-4 text-lg">
                <A href="https://docs.sourcify.dev/docs/full-vs-partial-match/">
                  Full matches
                </A>{" "}
                on Trustcontract cryptographically guarantee the verified source code
                is identical to the original deployed contract. Our monitoring
                service observes contract creations and verifies the source
                codes automatically if published to IPFS.
              </p>
            </div>
            <div className="flex-1" data-aos="fade-left">
              <img
                src={verification}
                alt="Illustration of contract verification"
                className="w-48 md:w-auto md:pr-48 md:pl-8 max-h-80"
              />
            </div>
          </div>
        </div>
        <div className="mb-12" data-aos="fade-left">
          <div className="flex flex-col items-center md:flex-row">
            <div
              className="flex flex-1 mt-4 md:justify-end md:mt-0"
              data-aos="fade-right"
            >
              <img
                src={decode}
                alt="Decoding contract interaction with Trustcontract"
                className="md:pl-48 md:pr-8"
              />
            </div>
            <div className="flex-1 mt-4 md:mt-0" data-aos="fade-left">
              <h1 className="text-2xl font-bold text-ceruleanBlue-500">
                Human-readable contract interactions
              </h1>
              <p className="text-lg">
                Goodbye <i>YOLO signing</i> 👋. Decode contract interactions
                with the verified contract's ABI and{" "}
                <A href="https://docs.soliditylang.org/en/develop/natspec-format.html">
                  NatSpec comments
                </A>{" "}
                . Show wallet users meaningful information instead of hex
                strings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Networks */}
      <section
        className="px-8 py-16 bg-gray-100 md:px-12 lg:px-24"
        data-aos="fade"
      >
        <h1 className="text-3xl font-bold text-ceruleanBlue-500">
          Supported Chains
        </h1>
        <div className="mt-8 text-lg">
          <p>Trustcontract is multi-chain and works on all EVM based networks.</p>
        </div>
        <ReactTooltip effect="solid" />
        <div className="flex flex-row flex-wrap justify-center w-full py-16 logos-container">
          <img
            src={ethereum}
            data-tip="Ethereum"
            className="h-12 mx-4 my-4 transition-opacity md:h-24 "
            alt="Ethereum logo"
          />
          <img
            src={arbitrum}
            data-tip="Arbitrum"
            className="h-12 mx-4 my-4 transition-opacity md:h-24"
            alt="Arbitrum logo"
          />
          <img
            src={avalanche}
            data-tip="Avalanche"
            className="h-12 mx-4 my-4 transition-opacity md:h-24"
            alt="Avalanche logo"
          />
          <img
            src={bsc}
            data-tip="Binance Smart Chain"
            className="h-12 mx-4 my-4 transition-opacity rounded-full md:h-24"
            alt="Binance Smart Chain logo"
          />
          <img
            src={boba}
            data-tip="Boba Network"
            className="h-12 mx-4 my-4 transition-opacity rounded-full md:h-24"
            alt="Boba network logo"
          />
          <img
            src={celo}
            data-tip="Celo"
            className="h-12 mx-4 my-4 transition-opacity md:h-24"
            alt="Celo logo"
          />
          <img
            src={xdai}
            data-tip="Gnosis Chain (xDai)"
            className="h-12 mx-4 my-4 transition-opacity rounded-full md:h-24"
            alt="Gnosis chain (xDai) logo"
          />
          <img
            src={polygon}
            data-tip="Polygon"
            className="h-12 mx-4 my-4 transition-opacity md:h-24"
            alt="Polygon logo"
          />
          <img
            src={optimism}
            data-tip="Optimism"
            className="h-12 mx-4 my-4 transition-opacity md:h-24"
            alt="Optimism logo"
          />
          <div className="flex items-center justify-center p-1 mx-4 my-4 text-xs text-center transition-opacity rounded-full h-14 w-14 md:text-base md:h-24 md:w-24 text-ceruleanBlue-400">
            <a href={`${DOCS_URL}/docs/chains`}>And many more!</a>
          </div>
        </div>
        <div className="flex justify-center">
          <a
            href={`${DOCS_URL}/docs/chains`}
            // className="font-semibold underline decoration-lightCoral-500 decoration-2 text-ceruleanBlue-500"
            className="font-semibold link-underline text-ceruleanBlue-500"
          >
            See all networks
          </a>
        </div>
      </section>




      <footer className="px-8 py-8 text-xl text-center text-white md:text-left md:px-48 md:py-16 bg-ceruleanBlue-500">
        <nav className="grid gap-8 font-vt323 md:grid-cols-3">
          <div>
            <h3 className="font-bold uppercase text-ceruleanBlue-100">
              Internal Links
            </h3>
            <ul>
              <FooterItem href="/verifier">Contract Verifier</FooterItem>
              <FooterItem href="/lookup">Contract Lookup</FooterItem>
              {/* <FooterItem href="/status">Server Status</FooterItem> */}
            </ul>
          </div>
          <div>
            <h3 className="font-bold uppercase text-ceruleanBlue-100">
              External Links
            </h3>
            <ul>
              <FooterItem href="https://docs.sourcify.dev">
                Documentation
              </FooterItem>
            </ul>
          </div>
          <div>
            <h3 className="font-bold uppercase text-ceruleanBlue-100">
              Socials
            </h3>
            <ul>
              <FooterItem href="#">
                Twitter
              </FooterItem>
              <FooterItem href="#">
                Gitter
              </FooterItem>
              <FooterItem href="https://github.com/jfinchain/trustcontract">
                GitHub (main)
              </FooterItem>
            </ul>
          </div>
        </nav>
        <div className="mt-8 text-sm text-center text-ceruleanBlue-300">
          Trustcontract Team • {new Date().getFullYear()} • trustcontract.dev{" "}
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
