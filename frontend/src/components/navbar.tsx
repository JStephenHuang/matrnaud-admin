import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const activeStyle = "text-black mx-2";
  const inactiveStyle = "opacity-[50%] mx-2 hover:opacity-100";
  return (
    <div className="fixed h-[8%] z-[30] w-full bg-white flex justify-between item-center px-5 border border-black">
      <Link to="/" className="font-bold text-[24px] flex items-center">
        MATRNAUD
      </Link>
      <div className="flex text-[14px] regular items-center">
        <NavLink
          className={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          to="/"
        >
          HOME
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          to="/shop"
        >
          SHOP
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          to="/bookings"
        >
          BOOKINGS
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
