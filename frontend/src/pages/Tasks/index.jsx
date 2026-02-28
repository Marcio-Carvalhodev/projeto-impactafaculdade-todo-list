import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Header } from '../../components/Header';
import { TaskCard } from '../../components/TaskCard';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { taskService } from '../../services/taskService';

const PageContent = styled.main`
  max-width: 720px;
  margin: 0 auto;
  padding: 32px 24px;
`;

const PageTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 24px;
  color: #1d2d50;
`;

const AddForm = styled.form`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.07);
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FormTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #1d2d50;
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 48px 24px;
  color: #9ca3af;
  background: white;
  border-radius: 12px;
`;

const EmptyIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 12px;
`;

const Filters = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

const FilterButton = styled.button`
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.875rem;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  background: ${({ $active }) => ($active ? '#4361ee' : 'white')};
  color: ${({ $active }) => ($active ? 'white' : '#6b7280')};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.07);

  &:hover {
    background: ${({ $active }) => ($active ? '#3451d1' : '#f3f4f6')};
  }
`;

export function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');

  const loadTasks = useCallback(async () => {
    try {
      const data = await taskService.getAll();
      setTasks(data);
    } catch {
      // erros 401 são tratados pelo interceptor da api
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  async function handleCreate(e) {
    e.preventDefault();
    if (!title.trim()) {
      setError('Título é obrigatório');
      return;
    }
    setLoading(true);
    try {
      const task = await taskService.create(title.trim(), description.trim() || null);
      setTasks((prev) => [task, ...prev]);
      setTitle('');
      setDescription('');
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao criar tarefa');
    } finally {
      setLoading(false);
    }
  }

  async function handleToggle(id, completed) {
    try {
      const updated = await taskService.update(id, { completed });
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch {
      // mantém estado atual em caso de falha
    }
  }

  async function handleUpdate(id, data) {
    const updated = await taskService.update(id, data);
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  }

  async function handleDelete(id) {
    try {
      await taskService.remove(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch {
      // mantém estado atual em caso de falha
    }
  }

  const filtered = tasks.filter((t) => {
    if (filter === 'active') return !t.completed;
    if (filter === 'done') return !!t.completed;
    return true;
  });

  return (
    <>
      <Header />
      <PageContent>
        <PageTitle>Minhas Tarefas</PageTitle>

        <AddForm onSubmit={handleCreate}>
          <FormTitle>Nova Tarefa</FormTitle>
          <Input
            value={title}
            onChange={(e) => { setTitle(e.target.value); setError(''); }}
            placeholder="O que precisa ser feito?"
            error={error}
          />
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descrição (opcional)"
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Adicionando...' : 'Adicionar Tarefa'}
          </Button>
        </AddForm>

        <Filters>
          {[
            { key: 'all', label: 'Todas' },
            { key: 'active', label: 'Pendentes' },
            { key: 'done', label: 'Concluídas' },
          ].map(({ key, label }) => (
            <FilterButton
              key={key}
              $active={filter === key}
              onClick={() => setFilter(key)}
            >
              {label}
            </FilterButton>
          ))}
        </Filters>

        <TaskList>
          {filtered.length === 0 ? (
            <EmptyState>
              <EmptyIcon>📝</EmptyIcon>
              <p>Nenhuma tarefa encontrada</p>
            </EmptyState>
          ) : (
            filtered.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={handleToggle}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            ))
          )}
        </TaskList>
      </PageContent>
    </>
  );
}
