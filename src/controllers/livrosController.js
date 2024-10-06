import NaoEncontrado from "../erros/naoEncontrado.js";
import { autores, livros } from "../models/index.js";

class LivroController {
  static listarLivros = async (req, res, next) => {
    try {
      const buscaLivros = livros.find();
      req.resultado = buscaLivros;
      next();
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros
        .findById(id, {}, { autopopulate: false })
        .populate("autor"); // removemos o segundo parâmetro "nome", e agora essa população mostra todas as informações do autor

      if (livroResultado !== null) {
        res.status(200).send(livroResultado);
      } else {
        next(new NaoEncontrado("Id do Livro não localizado"));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);

      const livroResultado = await livro.save();

      if (livroResultado !== null) {
        res.status(201).send(livroResultado.toJSON());
      } else {
        next(new NaoEncontrado("Id do livro não localizado"));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndUpdate(id, {
        $set: req.body,
      });

      if (livroResultado !== null) {
        res.status(200).send({ message: "Livro atualizado com sucesso" });
      } else {
        next(new NaoEncontrado("Id do livro não localizado"));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndDelete(id);

      if (livroResultado !== null) {
        res.status(200).send({ message: "Livro removido com sucesso" });
      }
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query);

      if (busca !== null) {
        const livrosResultado = livros.find(busca).populate("autor");

        req.resultado = livrosResultado; //guarda a busca do mongoose para o middleware 'paginar'

        next();
      } else {
        res.status(200).send([]);
      }
    } catch (erro) {
      next(erro);
    }
  };
}

async function processaBusca(parametros) {
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametros;

  let busca = {};

  if (editora) busca.editora = editora;
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" }; //case insensitive

  if (minPaginas || maxPaginas) busca.numeroPaginas = {};

  //greater than or equal
  if (minPaginas) busca.numeroPaginas.$gte = minPaginas;
  //less than or equal
  if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas;

  if (nomeAutor) {
    const autor = await autores.findOne({ nome: nomeAutor }); //procura em autores o nome
    if (autor !== null) {
      busca.autor = autor._id; //atribui o id do autor a busca
    } else {
      busca = null; //validar busca
    }
  }

  return busca;
}

export default LivroController;
