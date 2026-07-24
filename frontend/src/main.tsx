import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage.tsx";
import CartPage from "./pages/CartPage.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/product/:slug" element={<ProductDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>,
);
