import React, { useRef, useState, useEffect } from "react";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const slide = useRef();

  const hamOpen = () => {
    if (isOpen) {
      slide.current.style.right = "-100%";
    } else {
      slide.current.style.right = "0";
    }
    setIsOpen(!isOpen);
  };

  // Apply GSAP animations based on the current route
  useEffect(() => {
    const navbarTween = gsap.to(".navbar", {
      backgroundColor: "white",
      color: "#000000",
      boxShadow: "0px 5px 10px rgba(0,0,0,0.2)",
      scrollTrigger: {
        trigger: ".navbar",
        start: "top -10%",
        end: "top 15%",
        scrub: 1,
      },
    });

    const textTween = gsap.to(".navbar-text", {
      color: "#000",
      scrollTrigger: {
        trigger: ".navbar",
        start: "top -10%",
        end: "top 15%",
        scrub: 1,
      },
    });

    // Cleanup animations on component unmount or when path changes
    return () => {
      navbarTween.scrollTrigger.kill();
      textTween.scrollTrigger.kill();
      gsap.killTweensOf(navbarTween); // Kill all related animations
      gsap.killTweensOf(textTween);
    };
  }, [location.pathname]); // Re-run effect when pathname changes

  // Determine navbar style based on route
  const navbarStyle =
    location.pathname === "/"
      ? "navbar bg-transparent shadow-none"
      : "navbar bg-white shadow-lg";

  // Function to determine the active class based on the current path
  const getActiveClass = (path) => {
    return location.pathname === path ? "!text-yellow-500" : "";
  };

  return (
    <div
      className={`${navbarStyle} fixed top-0 z-[99] h-[70px] w-full flex items-center justify-between pl-4 pr-4 md:pl-24 xl:pl-44 xl:pr-44`}
    >
      <div className="nav-right">
        <Link to="/">
          <div className="logo">
            <h1 className="text-4xl lg:text-3xl font-primaryBold text-[#6279BE]">
              AVENA
            </h1>
          </div>
        </Link>
      </div>

      <div className="left">
        <div
          onClick={hamOpen}
          className="smallDevices -mt-5 sm:mt-0 absolute z-10 right-6 md:flex lg:hidden xl:hidden h-12 w-12 flex items-center justify-center"
        >
          <MenuOutlinedIcon className="scale-[1.5]" />
        </div>

        <div
          ref={slide}
          className="hamburger lg:hidden transition-all h-screen w-[280px] absolute top-0 right-[-100%] bg-[#fff] shadow-xl z-50"
        >
          <div className="top h-[150px] w-full bg-[#702b58] relative">
            <div
              onClick={hamOpen}
              className="hamclose text-white scale-[1.8] absolute right-[30px] top-7"
            >
              <CloseOutlinedIcon />
            </div>
            <h1 className="absolute bottom-6 font-PrimaryBold left-7 text-2xl text-white leading-6">
              <span className="text-sm font-primaryMedium">Welcome</span> <br />
              Username
            </h1>
          </div>

          <div className="hamcontent p-8 leading-10">
            <ul>
              <Link to="/">
                <li
                  className={`text-lg font-medium font-primaryMedium pl-6 pt-2 mb-2 pb-2 hover:bg-[#702b58] hover:text-white rounded-lg ${getActiveClass(
                    "/"
                  )}`}
                >
                  Home
                </li>
              </Link>
              <Link to="/bookings">
                <li
                  className={`text-lg font-medium font-primaryMedium pl-6 pt-2 mb-2 pb-2 hover:bg-[#702b58] hover:text-white rounded-lg ${getActiveClass(
                    "/bookings"
                  )}`}
                >
                  Bookings
                </li>
              </Link>
              <Link to="/contact">
                <li
                  className={`text-lg font-medium font-primaryMedium pl-6 pt-2 mb-2 pb-2 hover:bg-[#702b58] hover:text-white rounded-lg ${getActiveClass(
                    "/contact"
                  )}`}
                >
                  Contact Us
                </li>
              </Link>
              <Link to="/explore">
                <li
                  className={`text-lg font-medium font-primaryMedium pl-6 pt-2 mb-2 pb-2 hover:bg-[#702b58] hover:text-white rounded-lg ${getActiveClass(
                    "/explore"
                  )}`}
                >
                  Explore
                </li>
              </Link>
              <Link to="/listyourproperty">
                <li
                  className={`text-lg font-medium font-primaryMedium pl-6 pt-2 mb-2 pb-2 hover:bg-[#702b58] hover:text-white rounded-lg ${getActiveClass(
                    "/listyourproperty"
                  )}`}
                >
                  List Your Property
                </li>
              </Link>
              <Link to="/sign-in">
                <li
                  className={`text-lg font-medium font-primaryMedium pl-6 pt-2 mb-2 pb-2 hover:bg-[#702b58] hover:text-white rounded-lg ${getActiveClass(
                    "/sign-in"
                  )}`}
                >
                  Sign In
                </li>
              </Link>
            </ul>
          </div>
        </div>

        <div className="nav-center flex items-center lg:flex md:mr-24 sm:mr-16 lg:mr-8">
          <ul className="hidden xl:flex gap-8 lg:flex">
            <Link to="/">
              <li
                className={`navbar-text font-primaryMedium text-sm ${getActiveClass(
                  "/"
                )}`}
              >
                Home
              </li>
            </Link>
            <Link to="/bookings">
              <li
                className={`navbar-text font-primaryMedium text-sm ${getActiveClass(
                  "/bookings"
                )}`}
              >
                Bookings
              </li>
            </Link>
            <Link to="/contact">
              <li
                className={`navbar-text font-primaryMedium text-sm ${getActiveClass(
                  "/contact"
                )}`}
              >
                Contact
              </li>
            </Link>
            <Link to="/explore">
              <li
                className={`navbar-text font-primaryMedium text-sm ${getActiveClass(
                  "/explore"
                )}`}
              >
                Explore
              </li>
            </Link>
          </ul>

          <Link to="/sign-in">
            <div
              className={`navbar-text ml-[12vw] hidden font-primaryMedium sm:flex text-sm ${getActiveClass(
                "/sign-in"
              )}`}
            >
              Sign In
            </div>
          </Link>
          <Link to="/listyourproperty">
            <div className="pt-2 pb-2 pl-6 pr-6 ml-8 border-2 hidden sm:flex rounded-full border-[#702b58] border-opacity-75 hover:text-white hover:bg-[#702b58] transition-all hover:text-sm text-[#702b58] bg-white text-xs font-Barlow uppercase">
              List your Property
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
