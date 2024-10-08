import mongoose from "mongoose";
import ErroBase from "../erros/erroBase.js";
import ErroValidacao from "../erros/ErroValidacao.js";
import RequisicaoIncorreta from "../erros/requisicaoIncorreta.js";

function manipuladorDeErros(erro, req, res, next) {
  console.log(erro);

  //dado que mongoose nao estava esperando
  if (erro instanceof mongoose.Error.CastError) {
    new RequisicaoIncorreta().enviarResposta(res);
  } else if (erro instanceof mongoose.Error.ValidationError) {
    new ErroValidacao(erro).enviarResposta(res);
  } else if (erro instanceof ErroBase) {
    erro.enviarResposta(res);
  } else {
    new ErroBase().enviarResposta(res);
  }
}

export default manipuladorDeErros;
