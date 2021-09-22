import React, { ComponentProps, ElementType } from 'react';
import { LayoutProps, SpaceProps } from 'styled-system';
import { Link } from 'react-router-dom';

export type AsProps<E extends ElementType = ElementType> = {
  as?: E;
};

export type MergeProps<E extends ElementType> = AsProps<E> &
  Omit<ComponentProps<E>, keyof AsProps>;

export type PolymorphicComponentProps<E extends ElementType, P> = P &
  MergeProps<E>;

export interface BaseButtonProps extends LayoutProps, SpaceProps {
  as?: 'a' | 'button' | typeof Link;
  external?: boolean;
  isLoading?: boolean;
}

export type ButtonProps<P extends ElementType = 'button'> =
  PolymorphicComponentProps<P, BaseButtonProps>;

const Button = <E extends ElementType = 'button'>(
  props: ButtonProps<E>
): JSX.Element => {
  const {
    startIcon,
    endIcon,
    external,
    className,
    isLoading,
    disabled,
    children,
    value,
    ...rest
  } = props;
  const isDisabled = isLoading || disabled;
  const classNames = className ? [className] : [];

  return (
    <button className={classNames.join(' ')} disabled={isDisabled} {...rest}>
      {value}
    </button>
  );
};

Button.defaultProps = {
  isLoading: false,
  external: false,
  disabled: false,
};

export default Button;
