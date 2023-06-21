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
import Usuarios from "./pages/Usuarios";
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
import CupomLista from "./pages/CupomLista";
import AddCupom from "./pages/AddCupom";
import ViewPerguntas from "./pages/ViewPerguntas";
import ViewPedidos from "./pages/ViewPedidos";

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
          <Route path="perguntas/:id" element={<ViewPerguntas />} />
          <Route path="lista-blog" element={<BlogLista />} />
          <Route path="blog" element={<AddBlog />} />
          <Route path="blog/:id" element={<AddBlog />} />
          <Route path="lista-cupom" element={<CupomLista />} />
          <Route path="cupom" element={<AddCupom />} />
          <Route path="cupom/:id" element={<AddCupom />} />
          <Route path="categoria" element={<AddCategoria />} />
          <Route path="categoria/:id" element={<AddCategoria  />} />
          <Route path="lista-blog-categoria" element={<BlogCatLista />} />
          <Route path="blog-categoria" element={<AddBlogCat />} />
          <Route path="blog-categoria/:id" element={<AddBlogCat />} />
          <Route path="pedidos" element={<Pedidos />} />
          <Route path="pedidos/:id" element={<ViewPedidos />} />
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="aplicacao" element={<AddAplicacao />} />
          <Route path="aplicacao/:id" element={<AddAplicacao />} />
          <Route path="lista-aplicacao" element={<AplicacaoLista />} />
          <Route path="lista-categoria" element={<CategoriaLista />} />          
          <Route path="marca" element={<AddMarca />} />
          <Route path="lista-marca" element={<MarcaLista />} />
          <Route path="marca/:id" element={<AddMarca />} />
          <Route path="produto-lista" element={<ProdutosLista />} />
          <Route path="produto" element={<AddProduto />} />
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
