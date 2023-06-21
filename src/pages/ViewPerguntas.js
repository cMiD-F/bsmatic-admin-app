import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getAPergunta,
  resetState,
  updateAPergunta,
} from "../features/perguntas/perguntasSlice";
import { BiArrowBack } from "react-icons/bi";

const ViewPerguntas = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getPergId = location.pathname.split("/")[3];
  const enqState = useSelector((state) => state.pergunta);
  const { pergNome, pergTelefone, pergEmail, pergComentario, pergStatus } = enqState;

  useEffect(() => {
    dispatch(getAPergunta(getPergId));
  }, [getPergId]);
  const goBack = () => {
    navigate(-1);
  };
  const setPerguntaStatus = (e, i) => {
    console.log(e, i);
    const data = { id: i, enqData: e };
    dispatch(updateAPergunta(data));
    dispatch(resetState());
    setTimeout(() => {
      dispatch(getAPergunta(getPergId));
    }, 100);
  };
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mb-4 title">Ver consulta</h3>
        <button
          className="bg-transpatent border-0 fs-6 mb-0 d-flex align-items-center gap-1"
          onClick={goBack}
        >
          <BiArrowBack className="fs-5" /> Volte
        </button>
      </div>
      <div className="mt-5 bg-white p-4 d-flex gap-3 flex-column rounded-3">
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Nome:</h6>
          <p className="mb-0">{pergNome}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Telefone:</h6>
          <p className="mb-0">
            <a href={`tel:+11${pergTelefone}`}>{pergTelefone}</a>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Email:</h6>
          <p className="mb-0">
            <a href={`email:{pergEmail}`}>{pergEmail}</a>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Comentario:</h6>
          <p className="mb-0">{pergComentario}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Status:</h6>
          <p className="mb-0">{pergStatus}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Alterar estado:</h6>
          <div>
            <select
              name=""
              defaultValue={pergStatus ? pergStatus : "Submetido"}
              className="form-control form-select"
              id=""
              onChange={(e) => setPerguntaStatus(e.target.value, getPergId)}
            >
              <option value="Submitted">Submetido</option>
              <option value="Contacted">Contatado</option>
              <option value="In Progress">Em andamento</option>
              <option value="Resolved">Resolvido</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPerguntas;
