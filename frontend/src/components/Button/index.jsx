import styled, { css } from 'styled-components';

const variants = {
  primary: css`
    background: #4361ee;
    color: white;
    &:hover:not(:disabled) { background: #3451d1; }
  `,
  danger: css`
    background: #e63946;
    color: white;
    &:hover:not(:disabled) { background: #c1121f; }
  `,
  secondary: css`
    background: transparent;
    color: #4361ee;
    border: 1.5px solid #4361ee;
    &:hover:not(:disabled) { background: #f0f4ff; }
  `,
  ghost: css`
    background: transparent;
    color: #6b7280;
    &:hover:not(:disabled) { background: #f3f4f6; color: #1d2d50; }
  `,
};

const StyledButton = styled.button`
  padding: ${({ $size }) => ($size === 'sm' ? '6px 12px' : '10px 20px')};
  font-size: ${({ $size }) => ($size === 'sm' ? '0.8rem' : '0.95rem')};
  font-weight: 500;
  border: none;
  border-radius: 8px;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 6px;

  ${({ $variant }) => variants[$variant] || variants.primary}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export function Button({ variant = 'primary', size, children, ...props }) {
  return (
    <StyledButton $variant={variant} $size={size} {...props}>
      {children}
    </StyledButton>
  );
}
