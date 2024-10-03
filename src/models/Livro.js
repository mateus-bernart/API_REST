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
    enum: {
      values: ["Casa do codigo", "Alura"],
      message: "A editora '{VALUE}' não é um valor permitido",
    },
  },
  numeroPaginas: {
    type: Number,
    validade: {
      validator: (valor) => {
        valor >= 10 && valor <= 5000;
      },
    },
    message: "O número de páginas deve estar entre 10 e 5000",
  },
});

const livros = mongoose.model("livros", livroSchema);

export default livros;
