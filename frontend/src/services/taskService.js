import api from './api';

export const taskService = {
  async getAll() {
    const { data } = await api.get('/tasks');
    return data;
  },

  async create(title, description) {
    const { data } = await api.post('/tasks', { title, description });
    return data;
  },

  async update(id, updates) {
    const { data } = await api.put(`/tasks/${id}`, updates);
    return data;
  },

  async remove(id) {
    await api.delete(`/tasks/${id}`);
  },
};
