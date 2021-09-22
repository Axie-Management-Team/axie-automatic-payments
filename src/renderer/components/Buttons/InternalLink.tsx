import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '@mui/material';

export interface InternalLinkProps {
  path: string;
  text: string;
  disabled?: boolean;
  icon?: string;
}

const IconWrapper = styled.span`
  padding-right: 6px;
`;

const InternalLink = ({ path, icon, text, disabled }: InternalLinkProps) => {
  return (
    <Link to={path}>
      <Button disabled={disabled} variant="contained">
        {icon && <IconWrapper>{icon}</IconWrapper>}
        {text}
      </Button>
    </Link>
  );
};

export default React.memo(InternalLink);
