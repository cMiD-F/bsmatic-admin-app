import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import usuariosReducer from "../features/usuario/usuarioSlice";
import produtoReducer from "../features/produto/produtoSlice";
import marcaReducer from "../features/marca/marcaSlice";
import pCategoriaReducer from "../features/pcategoria/pcategoriaSlice";
import bCategoriaReducer from "../features/bcategoria/bcategoriaSlice";
import blogReducer from "../features/blogs/blogSlice";
import aplicacaoReducer from "../features/aplicacao/aplicacaoSlice";
import perguntaReducer from "../features/perguntas/perguntasSlice";
import uploadReducer from "../features/upload/uploadSlice";
import cupomReducer from "../features/cupom/cupomSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    usuarios: usuariosReducer,
    produto : produtoReducer,
    marca: marcaReducer,
    pCategoria: pCategoriaReducer,
    bCategoria: bCategoriaReducer,
    blogs: blogReducer,
    aplicacao: aplicacaoReducer,
    pergunta: perguntaReducer,
    upload: uploadReducer,
    cupom: cupomReducer,
  },
});

