import NaoEncontrado from "../erros/naoEncontrado.js";

function manipulador404(req, res, next) {
  //executados apenas se nao tiver nenhuma correspondencia em nenhuma das rotas
  const erro404 = new NaoEncontrado();
  next(erro404); //vai parar no manipuladorDeErros.js
}

export default manipulador404;
