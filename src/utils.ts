import React from 'react';
import { IntlConfig } from './types';
// Since rollup cannot deal with namespace being a function,
// this is to interop with TypeScript since `invariant`
// does not export a default
// https://github.com/rollup/rollup/issues/1267
import * as invariant_ from 'invariant';
const invariant: typeof invariant_.default =
  (invariant_ as any).default || invariant_;

export const DEFAULT_INTL_CONFIG: Pick<
  IntlConfig,
  // | 'formats'
  | 'messages'
  | 'timeZone'
  | 'textComponent'
  | 'defaultLocale'
  // | 'defaultFormats'
  | 'onError'
> = {
  // formats: {},
  messages: {},
  timeZone: undefined,
  textComponent: React.Fragment,

  defaultLocale: 'en',
  // defaultFormats: {},

  onError: defaultErrorHandler,
};

export function defaultErrorHandler(error: string) {
  if (process.env.NODE_ENV !== 'production') {
    console.error(error);
  }
}

export function createError(message: string, exception?: Error) {
  const eMsg = exception ? `\n${exception.stack}` : '';
  return `[React Intl] ${message}${eMsg}`;
}

export function invariantIntlContext(intl?: any) {
  invariant(
    intl,
    '[React Intl] Could not find required `intl` object. ' +
      '<IntlProvider> needs to exist in the component ancestry.'
  );
}
