import { RouterProvider } from "react-router"
import { createBrowserRouter } from "react-router-dom"
import BrandDetails from "./components/BrandDetaild/BrandDetails"
import Brands from "./components/Brands/Brands"
import Cart from "./components/Cart/Cart"
import Categories from "./components/Categories/Categories"
import CategoriesDetails from "./components/categoriesDetails/categoriesDetails"
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
    path: "/", element: <Layout />, children: [
      { index: true, element: <Register /> },
      { path: "signin", element:<Signin />  },
      { path: "home", element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "products", element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: "wishlist", element: <ProtectedRoute><Wishlist /></ProtectedRoute> },
      { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: "categories", element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: "productDetails/:id", element: <ProtectedRoute><ProductDetails/></ProtectedRoute> },
      { path: "brandDetails/:id", element: <ProtectedRoute><BrandDetails/></ProtectedRoute> },
      { path: "categoriesDetails/:id", element: <ProtectedRoute><CategoriesDetails/></ProtectedRoute> },
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