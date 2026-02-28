import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
`;

const StyledInput = styled.input`
  padding: 10px 14px;
  border: 1.5px solid ${({ $hasError }) => ($hasError ? '#e63946' : '#d1d5db')};
  border-radius: 8px;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s;
  background: white;
  width: 100%;

  &:focus {
    border-color: ${({ $hasError }) => ($hasError ? '#e63946' : '#4361ee')};
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const ErrorText = styled.span`
  font-size: 0.8rem;
  color: #e63946;
`;

export function Input({ label, error, ...props }) {
  return (
    <Wrapper>
      {label && <Label>{label}</Label>}
      <StyledInput $hasError={!!error} {...props} />
      {error && <ErrorText>{error}</ErrorText>}
    </Wrapper>
  );
}
