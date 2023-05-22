import { AnimatePresence, motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { IoMenu, IoClose } from "react-icons/io5";
import { useState } from "react";

const Navbar = () => {
  const activeStyle = "text-black mx-2";
  const inactiveStyle = "opacity-[50%] mx-2 hover:opacity-100";

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const dropIn = {
    hidden: {
      x: "100vh",
    },
    visible: {
      x: "0",
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      x: "100vh",
    },
  };

  return (
    <>
      <div className="fixed h-[8%] top-0 z-[30] w-full bg-white flex justify-between items-center px-5 border-b border-black">
        <Link
          to="/"
          className="bold text-[20px] md:text-[24px] flex items-center"
        >
          MATRNAUD
        </Link>
        <div className="hidden md:flex text-[14px] regular">
          <NavLink
            className={({ isActive }) =>
              isActive ? activeStyle : inactiveStyle
            }
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? activeStyle : inactiveStyle
            }
            to="/shop"
          >
            SHOP
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? activeStyle : inactiveStyle
            }
            to="/bookings"
          >
            BOOKINGS
          </NavLink>
        </div>

        <IoMenu
          className="md:hidden text-[24px]"
          onClick={() => setSidebarOpen(true)}
        />
      </div>
      <AnimatePresence initial={false} mode="wait">
        {sidebarOpen && (
          <motion.div
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed right-0 top-0 w-1/2 z-[50] h-screen border-l border-black bg-white"
          >
            <div className="flex items-center h-[8%] px-5">
              <IoClose
                className="text-[24px] ml-auto"
                onClick={() => setSidebarOpen(false)}
              />
            </div>
            <div className="flex flex-col regular text-[14px] px-5">
              <NavLink
                className={({ isActive }) =>
                  isActive ? activeStyle : inactiveStyle
                }
                to="/"
              >
                HOME
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? activeStyle : inactiveStyle
                }
                to="/shop"
              >
                SHOP
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? activeStyle : inactiveStyle
                }
                to="/bookings"
              >
                BOOKINGS
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
