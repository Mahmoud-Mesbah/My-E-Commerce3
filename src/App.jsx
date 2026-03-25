import { RouterProvider } from "react-router"
import { createBrowserRouter } from "react-router-dom"
import AllOrders from "./components/AllOrders/AllOrders"
import BrandDetails from "./components/BrandDetaild/BrandDetails"
import Brands from "./components/Brands/Brands"
import Cart from "./components/Cart/Cart"
import Categories from "./components/Categories/Categories"
import CategoriesDetails from "./components/CategoriesDetails/CategoriesDetails"
import CategoriesSliderDetails from "./components/CategoriesSliderDetails/CategoriesSliderDetails"
import CheckOut from "./components/CheckOut/CheckOut"
import Home from "./components/Home/Home"
import Layout from "./components/Layout/Layout"
import Notfound from "./components/Notfound/Notfound"
import ProductDetails from "./components/ProductDetails/ProductDetails"
import Products from "./components/Products/Products"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"
import Register from "./components/Register/Register"
import Signin from "./components/Signin/Signin"
import Wishlist from "./components/Wishlist/Wishlist"


export default function App() {
  const routers = createBrowserRouter([{
    path: "/", element: <ProtectedRoute><Layout /></ProtectedRoute>, children: [
      { index: true, element: <Register /> },
      { path: "signin", element: <Signin /> },
      { path: "home", element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "products", element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: "wishlist", element: <ProtectedRoute><Wishlist /></ProtectedRoute> },
      { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: "categories", element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: "productDetails/:id", element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: "brandDetails/:id", element: <ProtectedRoute><BrandDetails /></ProtectedRoute> },
      { path: "categoriesDetails/:id", element: <ProtectedRoute><CategoriesDetails /></ProtectedRoute> },
      { path: "CategoriesSliderDetails/:id", element: <ProtectedRoute><CategoriesSliderDetails /></ProtectedRoute> },
      { path: "checkOut", element: <ProtectedRoute><CheckOut/></ProtectedRoute> },
      { path: "allorders", element: <ProtectedRoute><AllOrders/></ProtectedRoute> },
      { path: "*", element: <Notfound /> }
    ]
  }])
  return (
    <>
      <RouterProvider router={routers}>
        <Layout />
      </RouterProvider>

    </>

  )
}