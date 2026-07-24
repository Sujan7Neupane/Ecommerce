import { useState } from "react";
import {
  LogIn,
  Menu,
  X,
  HouseHeart,
  ShoppingBasket,
  CircleUserRound,
} from "lucide-react";
import { NavLink } from "react-router";
import Container from "./Container";
import { useSelector } from "react-redux";
import type { CartItem } from "../redux/slices/cartSlice";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  //   console.log(isOpen);

  const { cartItems } = useSelector((state: any) => state.cart);
  // console.log(cartItems);

  const linkStyle = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 font-medium transition-colors ${
      isActive ? "text-purple-400" : "text-white hover:text-purple-600"
    }`;

  return (
    <header className="w-full bg-black shadow-md">
      <Container>
        <nav className="flex h-16 items-center justify-between">
          <NavLink to="/" className={linkStyle}>
            <h1 className="text-2xl font-bold text-white">Ecommerce</h1>
          </NavLink>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={linkStyle}>
              <HouseHeart size={20} />
              <span>Home</span>
            </NavLink>

            <NavLink to="/products" className={linkStyle}>
              <ShoppingBasket size={20} />
              <span>Products</span>
            </NavLink>

            <NavLink to="/profile" className={linkStyle}>
              <CircleUserRound size={20} />
              <span>Profile</span>
            </NavLink>

            <NavLink to="/login" className={linkStyle}>
              <LogIn size={20} />
              <span>Login</span>
            </NavLink>

            <NavLink to="/cart" className={linkStyle}>
              <div className="relative">
                <ShoppingBasket size={20} />

                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {cartItems.reduce(
                    (acc: number, item: CartItem) => acc + item.quantity,
                    0,
                  )}
                </span>
              </div>

              <span>Cart</span>
            </NavLink>
          </div>

          {/* Hamburger here */}
          <button
            className="md:hidden text-white cursor-pointer transition-transform duration-200 hover:scale-110"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>

        {/* Mobile Menus */}
        {/* isOpen => true  = navitems visible */}
        {isOpen && (
          <div className="md:hidden flex flex-col gap-4 py-4">
            <NavLink
              to="/"
              className={linkStyle}
              onClick={() => setIsOpen(false)}
            >
              <HouseHeart size={20} />
              <span>Home</span>
            </NavLink>

            <NavLink
              to="/products"
              className={linkStyle}
              onClick={() => setIsOpen(false)}
            >
              <ShoppingBasket size={20} />
              <span>Products</span>
            </NavLink>

            <NavLink
              to="/profile"
              className={linkStyle}
              onClick={() => setIsOpen(false)}
            >
              <CircleUserRound size={20} />
              <span>Profile</span>
            </NavLink>

            <NavLink
              to="/login"
              className={linkStyle}
              onClick={() => setIsOpen(false)}
            >
              <LogIn size={20} />
              <span>Login</span>
            </NavLink>

            <NavLink
              to="/cart"
              className={linkStyle}
              onClick={() => setIsOpen(false)}
            >
              <div className="relative">
                <ShoppingBasket size={20} />

                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {cartItems.reduce(
                    (acc: number, item: CartItem) => acc + item.quantity,
                    0,
                  )}
                </span>
              </div>

              <span>Cart</span>
            </NavLink>
          </div>
        )}
      </Container>
    </header>
  );
};

export default Header;
