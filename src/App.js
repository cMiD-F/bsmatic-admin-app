import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import RedefinirSenha from "./pages/RedefinirSenha";
import EsqueceuSenha from "./pages/EsqueceuSenha";
import MainLayout from "./components/MainLayout";
import Perguntas from "./pages/Perguntas";
import BlogLista from "./pages/BlogLista";
import BlogCatLista from "./pages/BlogCatLista";
import Pedidos from "./pages/Pedidos";
import Clientes from "./pages/Clientes";
import AplicacaoLista from "./pages/AplicacaoLista";
import CategoriaLista from "./pages/CategoriaLista";
import MarcaLista from "./pages/MarcasLista";
import ProdutosLista from "./pages/ProdutosLista";
import AddBlog from "./pages/AddBlog";
import AddBlogCat from "./pages/AddBlogCat";
import AddAplicacao from "./pages/AddAplicacao";
import AddCategoria from "./pages/AddCategoria";
import AddMarca from "./pages/AddMarca";
import AddProduto from "./pages/AddProduto";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/redefinir-senha" element={<RedefinirSenha />} />
        <Route path="/esqueceu-senha" element={<EsqueceuSenha />} />
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="perguntas" element={<Perguntas />} />
          <Route path="lista-blog" element={<BlogLista />} />
          <Route path="blog" element={<AddBlog />} />
          <Route path="categoria" element={<AddCategoria />} />
          <Route path="lista-blog-categoria" element={<BlogCatLista />} />
          <Route path="blog-categoria" element={<AddBlogCat />} />
          <Route path="pedidos" element={<Pedidos />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="aplicacao" element={<AddAplicacao />} />
          <Route path="lista-aplicacao" element={<AplicacaoLista />} />
          <Route path="lista-categoria" element={<CategoriaLista />} />
          <Route path="marca" element={<AddMarca />} />
          <Route path="lista-marca" element={<MarcaLista />} />
          <Route path="produto" element={<AddProduto />} />
          <Route path="lista-produto" element={<ProdutosLista />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
