import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../Button';

const Wrapper = styled.header`
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
`;

const Logo = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  color: #4361ee;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const UserName = styled.span`
  font-size: 0.9rem;
  color: #6b7280;
`;

export function Header() {
  const { user, logout } = useAuth();

  return (
    <Wrapper>
      <Logo>To-Do List</Logo>
      <UserInfo>
        <UserName>Olá, {user?.name}</UserName>
        <Button variant="ghost" size="sm" onClick={logout}>
          Sair
        </Button>
      </UserInfo>
    </Wrapper>
  );
}
