import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import usuariosReducer from "../features/usuario/usuarioSlice";
import produtoReducer from "../features/produto/produtoSlice";
import marcaReducer from "../features/marca/marcaSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    usuarios: usuariosReducer,
    produto : produtoReducer,
    marca: marcaReducer,
  },
});

