import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="p-4 border-b border-black mb-2">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "px-3 py-2 border border-black bg-black rounded-md text-white"
            : "px-3 py-2 border border-black rounded-md text-black"
        }
      >
        Gallery
      </NavLink>
      <NavLink
        to="/series"
        className={({ isActive }) =>
          isActive
            ? "px-3 py-2 border border-black bg-black rounded-md text-white mx-3"
            : "px-3 py-2 border border-black rounded-md text-black mx-3"
        }
      >
        Shop
      </NavLink>
      <NavLink
        to="/info"
        className={({ isActive }) =>
          isActive
            ? "px-3 py-2 border border-black bg-black rounded-md text-white"
            : "px-3 py-2 border border-black rounded-md text-black"
        }
      >
        Info
      </NavLink>
    </div>
  );
};

export default Navbar;
