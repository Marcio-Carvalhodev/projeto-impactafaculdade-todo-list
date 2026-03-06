const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');

const authService = {
  async register({ name, email, password }) {
    if (!name || !email || !password) {
      throw Object.assign(new Error('Todos os campos são obrigatórios'), { status: 400 });
    }

    const existing = await userRepository.findByEmail(email);
    if (existing) {
      throw Object.assign(new Error('Email já cadastrado'), { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await userRepository.create({ name, email, password: hashed });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    return { user, token };
  },

  async login({ email, password }) {
    if (!email || !password) {
      throw Object.assign(new Error('Email e senha são obrigatórios'), { status: 400 });
    }

    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw Object.assign(new Error('Credenciais inválidas'), { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw Object.assign(new Error('Credenciais inválidas'), { status: 401 });
    }

    const { password: _, ...userWithoutPassword } = user;
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    return { user: userWithoutPassword, token };
  },
};

module.exports = authService;
