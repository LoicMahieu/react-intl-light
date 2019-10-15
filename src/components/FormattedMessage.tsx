import React from 'react';
import useIntl from './useIntl';
import { PrimitiveType, MessageDescriptor } from '../types';

export const FormattedMessage = <
  V extends Record<string, any> = Record<
    string,
    PrimitiveType | React.ReactElement
  >
>({
  id,
  description,
  defaultMessage,
  children,
  tagName: Component,
}: Props<V>): JSX.Element => {
  const intl = useIntl();
  const descriptor = { id, description, defaultMessage };
  const message = intl.formatMessage(descriptor) || defaultMessage;

  if (typeof children === 'function') {
    return children(message);
  }

  if (Component) {
    // Needs to use `createElement()` instead of JSX, otherwise React will
    // warn about a missing `key` prop with rich-text message formatting.
    return React.createElement(Component, null, message);
  }

  return <>{message}</>;
};

export interface Props<
  V extends Record<string, any> = Record<string, React.ReactNode>
> extends MessageDescriptor {
  values?: V;
  tagName?: React.ElementType<any>;
  children?(message?: string): JSX.Element;
}
