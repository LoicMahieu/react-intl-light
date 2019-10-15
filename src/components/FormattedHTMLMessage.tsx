import React from 'react';
import useIntl from './useIntl';
import { PrimitiveType } from '../types';
import { Props } from './FormattedMessage';

export const FormattedHTMLMessage = <
  V extends Record<string, any> = Record<
    string,
    PrimitiveType | React.ReactElement
  >
>({
  id,
  description,
  defaultMessage,
  children,
  tagName: Component = 'span',
}: Props<V>) => {
  const intl = useIntl();
  const descriptor = { id, description, defaultMessage };
  const message = intl.formatHTMLMessage(descriptor);

  if (typeof children === 'function') {
    return children(message);
  }

  const html = { __html: message };
  return <Component dangerouslySetInnerHTML={html} />;
};
