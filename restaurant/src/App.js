
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Lobby from './pages/lobby/Lobby';
import ProductDetail from './pages/products/ProductDetail';
import ProductList from './pages/products/ProductList';
import Layout from './components/Layout';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navigate to="/login" replace />}></Route>

          <Route path="/login" element={<Login />}></Route>
          <Route path="/manage/*" element={<Layout />}>
            <Route path="home">
              <Route index element={<Home />} />
            </Route>
            <Route path="lobby">
              <Route index element={<Lobby />} />
            </Route>
            <Route path="product" >
              <Route index element={<ProductList />} />
              <Route path=":id" element={<ProductDetail />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
