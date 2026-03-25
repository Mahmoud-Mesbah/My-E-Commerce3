import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUserName } from "../../Features/userSlice";
import logo from "../../assets/pngtree-e-letter-logo-ecommerce-shop-store-design-png-image_4381099.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const {token,name} = useSelector((state) => state.userSlice);
  const cartItems = useSelector((state) => state.cartSlice.cartItems); 
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(setToken(localStorage.getItem("token")));
    }
  }, [dispatch]);

  const getLinkClass = (isActive, base = "text-gray-800 hover:text-purple-600 font-semibold") =>
    isActive ? "text-purple-600 font-bold" : base;

  const getActionClass = (isActive) =>
    isActive ? "text-purple-600 font-bold text-sm" : "text-gray-700 hover:text-purple-600 text-sm font-medium";

  function logout() {
    localStorage.removeItem("token");
    dispatch(setToken(null));
    dispatch(setUserName(''))
    navigate("/");
  }

  return (
    <nav className="bg-white shadow-md px-4 fixed left-0 right-0 top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-38" />
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex md:items-center md:space-x-6 w-full justify-between">
          {/* Center Links */}
          <div className="flex items-center space-x-6 justify-center flex-1">
            {token && (
              <>
                <NavLink to="/home" className={({ isActive }) => getLinkClass(isActive)}>Home</NavLink>
                <NavLink to="/products" className={({ isActive }) => getLinkClass(isActive)}>Products</NavLink>
                <NavLink to="/brands" className={({ isActive }) => getLinkClass(isActive)}>Brands</NavLink>
                <NavLink to="/categories" className={({ isActive }) => getLinkClass(isActive)}>Categories</NavLink>
              </>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {token ? (
              <>
                {/* Cart with badge */}
                <NavLink to="/cart" className={({ isActive }) => getActionClass(isActive)}>
                  <div className="relative">
                    <BsCart4 className="text-xl text-purple-400 font-bold" />
                    {cartItems.products?.length > 0 && (
                      <span className="absolute -top-1 -right-1 z-10 bg-red-500 text-white text-[0.65rem] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                        {cartItems.products.length}
                      </span>
                    )}
                  </div>
                </NavLink>

                {/* Wishlist */}
                <NavLink to="/wishlist" className={({ isActive }) => getActionClass(isActive)}>
                  <FaHeart className="text-xl text-red-700" />
                </NavLink>

                {/* Logout */}
                <button onClick={logout} className="focus:outline-none">
                  <RiLogoutCircleRFill className="text-bold text-xl text-red-500 hover:text-red-400" />
                </button>
                <div className="flex items-center justify-center text-white bg-gray-400 w-7 h-7 rounded-full"><h1 className="text-white">{name?.split("").slice(0,1).join("")}</h1></div>
              </>
            ) : (
              <>
                <NavLink to="/signin" className={({ isActive }) => getActionClass(isActive)}>Login</NavLink>
                <NavLink to="/" className={({ isActive }) => getActionClass(isActive)}>Register</NavLink>
              </>
            )}
          </div>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Side Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden z-40`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setIsOpen(false)} className="text-gray-800 focus:outline-none text-xl font-bold">
            &times;
          </button>
        </div>

        <div className="flex flex-col space-y-4 px-6 mt-4">
          {token && (
            <>
              <NavLink to="/home" className={({ isActive }) => getLinkClass(isActive)}>Home</NavLink>
              <NavLink to="/products" className={({ isActive }) => getLinkClass(isActive)}>Products</NavLink>
              <NavLink to="/brands" className={({ isActive }) => getLinkClass(isActive)}>Brands</NavLink>
              <NavLink to="/categories" className={({ isActive }) => getLinkClass(isActive)}>Categories</NavLink>

              {/* Cart with badge */}
              <NavLink to="/cart" className={({ isActive }) => getActionClass(isActive)}>
                <div className="relative ">
                  <BsCart4 className="text-xl text-purple-400 font-bold" />
                  {cartItems.products?.length > 0 && (
                    <span className="absolute -top-0 -right-1 z-10 bg-red-500 text-white text-[0.65rem] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                      {cartItems.products.length}
                    </span>
                  )}
                </div>
              </NavLink>

              <NavLink to="/wishlist" className={({ isActive }) => getActionClass(isActive)}>
                <FaHeart className="text-xl text-red-700" />
              </NavLink>

              <button onClick={logout} className="focus:outline-none">
                <RiLogoutCircleRFill className="text-bold text-xl text-red-500 hover:text-red-400" />
              </button>
              <div className="flex items-center justify-center text-white bg-gray-400 w-7 h-7 rounded-full"><h1 className="text-white">{name?.split("").slice(0,1).join("")}</h1></div>

            </>
          )}

          {!token && (
            <>
              <NavLink to="/signin" className={({ isActive }) => getActionClass(isActive)}>Login</NavLink>
              <NavLink to="/" className={({ isActive }) => getActionClass(isActive)}>Register</NavLink>
            </>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 z-30 md:hidden" onClick={() => setIsOpen(false)}></div>}
    </nav>
  );
}