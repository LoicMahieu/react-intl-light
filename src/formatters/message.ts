
// Since rollup cannot deal with namespace being a function,
// this is to interop with TypeScript since `invariant`
// does not export a default
// https://github.com/rollup/rollup/issues/1267
import * as invariant_ from 'invariant';
const invariant: typeof invariant_.default = (invariant_ as any).default || invariant_;

import {
  IntlConfig,
  MessageDescriptor,
} from '../types';

import { createError } from '../utils';

export function formatMessage(
  {
    locale,
    messages,
    defaultLocale,
    onError,
  }: Pick<
    IntlConfig,
    | 'locale'
    | 'messages'
    | 'defaultLocale'
    | 'onError'
    | 'timeZone'
  >,
  messageDescriptor: MessageDescriptor = { id: '' },
): string {
  const { id, defaultMessage } = messageDescriptor;

  // `id` is a required field of a Message Descriptor.
  invariant(id, '[React Intl] An `id` must be provided to format a message.');

  const message = messages && messages[id];

  if (!message) {
    // This prevents warnings from littering the console in development
    // when no `messages` are passed into the <IntlProvider> for the
    // default locale, and a default message is in the source.
    if (
      !defaultMessage ||
      (locale && locale.toLowerCase() !== defaultLocale.toLowerCase())
    ) {
      onError(
        createError(
          `Missing message: "${id}" for locale: "${locale}"` +
            (defaultMessage ? ', using default message as fallback.' : '')
        )
      );
    }
  }

  return message;
}

export function formatHTMLMessage(
  config: Pick<
    IntlConfig,
    | 'locale'
    | 'messages'
    | 'defaultLocale'
    | 'onError'
  >,
  messageDescriptor: MessageDescriptor = { id: '' },
) {
  return formatMessage(config, messageDescriptor);
}
