// Backend MERN - Estrutura completa (Node.js + Express + MongoDB + Mongoose)
// Arquivo: server.js
// Instruções: este é o ponto de entrada do servidor Express

import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/postRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();
const app = express();

// Middlewares gerais
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes);

// Middleware de erro
app.use(errorHandler);

// Conexão com MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB conectado com sucesso!');
    app.listen(process.env.PORT, () =>
      console.log(`Servidor rodando na porta ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));


// ===== MODELOS =====
// Arquivo: models/Post.js
import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
  },
  { timestamps: true }
);

export default mongoose.model('Post', PostSchema);

// Arquivo: models/Category.js
const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }
  },
  { timestamps: true }
);

export default mongoose.model('Category', CategorySchema);


// ===== CONTROLLERS =====
// Arquivo: controllers/postController.js
import Post from '../models/Post.js';

export const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate('category');
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

export const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('category');
    if (!post) return res.status(404).json({ message: 'Post não encontrado' });
    res.json(post);
  } catch (err) {
    next(err);
  }
};

export const createPost = async (req, res, next) => {
  try {
    const newPost = new Post(req.body);
    const saved = await newPost.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post apagado com sucesso' });
  } catch (err) {
    next(err);
  }
};


// Arquivo: controllers/categoryController.js
import Category from '../models/Category.js';

export const getCategories = async (req, res, next) => {
  try {
    const cats = await Category.find();
    res.json(cats);
  } catch (err) {
    next(err);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const cat = new Category(req.body);
    const saved = await cat.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};


// ===== ROTAS =====
// Arquivo: routes/postRoutes.js
import express from 'express';
import { getPosts, getPostById, createPost, updatePost, deletePost } from '../controllers/postController.js';
import validatePost from '../validators/postValidator.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', validatePost, createPost);
router.put('/:id', validatePost, updatePost);
router.delete('/:id', deletePost);

export default router;


// Arquivo: routes/categoryRoutes.js
import express from 'express';
import { getCategories, createCategory } from '../controllers/categoryController.js';

const router = express.Router();

router.get('/', getCategories);
router.post('/', createCategory);

export default router;


// ===== VALIDADORES =====
// Arquivo: validators/postValidator.js
import { body, validationResult } from 'express-validator';

const validatePost = [
  body('title').notEmpty().withMessage('Título é obrigatório'),
  body('content').notEmpty().withMessage('Conteúdo é obrigatório'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export default validatePost;


// ===== MIDDLEWARE DE ERRO =====
// Arquivo: middleware/errorHandler.js
export default function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ message: 'Erro interno no servidor', error: err.message });
}


// ===== .env.example =====
// MONGO_URI=mongodb://localhost:27017/mern_blog
// PORT=5000
