import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export interface InternalLinkProps {
  path: string;
  text: string;
  disabled?: boolean;
  icon?: string;
}

const Button = styled.button``;

const IconWrapper = styled.span`
  padding-right: 6px;
`;

const InternalLink = ({ path, icon, text, disabled }: InternalLinkProps) => {
  return (
    <Link to={path}>
      <Button disabled={disabled}>
        {icon && <IconWrapper>{icon}</IconWrapper>}
        {text}
      </Button>
    </Link>
  );
};

export default React.memo(InternalLink);
