import { useState } from 'react';
import styled from 'styled-components';
import { Button } from '../Button';
import { Input } from '../Input';

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  gap: 12px;
  align-items: flex-start;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.07);
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  margin-top: 3px;
  cursor: pointer;
  accent-color: #4361ee;
  flex-shrink: 0;
`;

const Content = styled.div`
  flex: 1;
  min-width: 0;
`;

const Title = styled.p`
  font-weight: 500;
  color: ${({ $done }) => ($done ? '#9ca3af' : '#1d2d50')};
  text-decoration: ${({ $done }) => ($done ? 'line-through' : 'none')};
  word-break: break-word;
`;

const Description = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 4px;
  word-break: break-word;
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;
`;

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin-top: 4px;
`;

const EditActions = styled.div`
  display: flex;
  gap: 8px;
`;

export function TaskCard({ task, onToggle, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmitEdit(e) {
    e.preventDefault();
    if (!title.trim()) {
      setError('Título é obrigatório');
      return;
    }
    setLoading(true);
    try {
      await onUpdate(task.id, { title: title.trim(), description: description.trim() || null });
      setEditing(false);
      setError('');
    } catch {
      setError('Erro ao salvar tarefa');
    } finally {
      setLoading(false);
    }
  }

  function handleCancelEdit() {
    setTitle(task.title);
    setDescription(task.description || '');
    setError('');
    setEditing(false);
  }

  return (
    <Card>
      <Checkbox
        type="checkbox"
        checked={!!task.completed}
        onChange={() => onToggle(task.id, !task.completed)}
      />
      <Content>
        {editing ? (
          <EditForm onSubmit={handleSubmitEdit}>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={error}
              placeholder="Título da tarefa"
              autoFocus
            />
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição (opcional)"
            />
            <EditActions>
              <Button type="submit" size="sm" disabled={loading}>
                {loading ? 'Salvando...' : 'Salvar'}
              </Button>
              <Button type="button" variant="ghost" size="sm" onClick={handleCancelEdit}>
                Cancelar
              </Button>
            </EditActions>
          </EditForm>
        ) : (
          <>
            <Title $done={!!task.completed}>{task.title}</Title>
            {task.description && <Description>{task.description}</Description>}
          </>
        )}
      </Content>
      {!editing && (
        <Actions>
          <Button variant="ghost" size="sm" onClick={() => setEditing(true)}>
            Editar
          </Button>
          <Button variant="danger" size="sm" onClick={() => onDelete(task.id)}>
            Excluir
          </Button>
        </Actions>
      )}
    </Card>
  );
}
