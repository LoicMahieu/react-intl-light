import React, { ReactNode } from 'react';
import { IntlConfig, IntlShape } from '../types';
import { DEFAULT_INTL_CONFIG, createError } from '../utils';
import { formatMessage, formatHTMLMessage } from '../formatters/message';

export type OptionalIntlConfig = Omit<
  IntlConfig,
  keyof typeof DEFAULT_INTL_CONFIG
> &
  Partial<typeof DEFAULT_INTL_CONFIG>;

/**
 * Create intl object
 * @param config intl config
 * @param cache cache for formatter instances to prevent memory leak
 */
export function createIntl(config: OptionalIntlConfig): IntlShape {
  const resolvedConfig = { ...DEFAULT_INTL_CONFIG, ...config };
  if (!resolvedConfig.locale) {
    const { locale, defaultLocale, onError } = resolvedConfig;
    if (typeof onError === 'function') {
      onError(
        createError(
          `Missing locale data for locale: "${locale}". ` +
            `Using default locale: "${defaultLocale}" as fallback.`
        )
      );
    }

    // Since there's no registered locale data for `locale`, this will
    // fallback to the `defaultLocale` to make sure things can render.
    // The `messages` are overridden to the `defaultProps` empty object
    // to maintain referential equality across re-renders. It's assumed
    // each <FormattedMessage> contains a `defaultMessage` prop.
    resolvedConfig.locale = resolvedConfig.defaultLocale || 'en';
  }
  return {
    ...resolvedConfig,
    formatMessage: formatMessage.bind(null, resolvedConfig),
    formatHTMLMessage: formatHTMLMessage.bind(null, resolvedConfig),
  };
}

export const intlContext = React.createContext<IntlShape>(
  createIntl({
    ...DEFAULT_INTL_CONFIG,
    locale: 'en',
  })
);

export const IntlProvider = ({
  children,
  ...props
}: OptionalIntlConfig & { children: ReactNode }) => (
  <intlContext.Provider value={createIntl(props)}>
    {children}
  </intlContext.Provider>
);
