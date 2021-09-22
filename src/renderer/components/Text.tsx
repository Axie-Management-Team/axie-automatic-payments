import {
  space,
  typography,
  layout,
  SpaceProps,
  TypographyProps,
  LayoutProps,
} from 'styled-system';
import styled from 'styled-components';

export interface TextProps extends SpaceProps, TypographyProps, LayoutProps {
  color?: string;
  fontSize?: string;
  bold?: boolean;
  small?: boolean;
  ellipsis?: boolean;
  textTransform?: 'uppercase' | 'lowercase' | 'capitalize';
}

const Text = styled.div<TextProps>`
  font-weight: ${({ bold }) => (bold ? 600 : 400)};
  line-height: 1.5;
  ${({ textTransform }) => textTransform && `text-transform: ${textTransform};`}

  ${space}
  ${typography}
  ${layout}
`;

Text.defaultProps = {
  color: 'text',
  small: false,
};

export default Text;
