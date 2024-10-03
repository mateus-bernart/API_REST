import mongoose from "mongoose";

const livroSchema = new mongoose.Schema({
  id: { type: String },
  titulo: { type: String, required: [true, "O Titulo do livro é obrigatório"] },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "autores",
    required: [true, "O autor(a) do livro é obrigatório"],
  },
  editora: {
    type: String,
    required: [true, "A editora do livro é obrigatório"],
  },
  numeroPaginas: { type: Number },
});

const livros = mongoose.model("livros", livroSchema);

export default livros;
