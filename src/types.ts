export type PrimitiveType = string | number | boolean | null | undefined | Date;

export interface MessageDescriptor {
  id: string;
  description?: string | object;
  defaultMessage?: string;
}

export interface IntlConfig {
  locale: string;
  timeZone?: string;
  // formats: CustomFormats;
  textComponent?: React.ComponentType | keyof React.ReactHTML;
  messages: Record<
    string,
    string
  > /* | Record<string, MessageFormatElement[]> */;
  defaultLocale: string;
  // defaultFormats: CustomFormats;
  onError(err: string): void;
}

export interface IntlShape extends IntlConfig, IntlFormatters {
  // formatters: Formatters;
}

export interface IntlFormatters {
  // formatDate(
  //   value: Parameters<Intl.DateTimeFormat['format']>[0] | string,
  //   opts?: FormatDateOptions
  // ): string;
  // formatTime(
  //   value: Parameters<Intl.DateTimeFormat['format']>[0] | string,
  //   opts?: FormatDateOptions
  // ): string;
  // formatDateToParts(
  //   value: Parameters<Intl.DateTimeFormat['format']>[0] | string,
  //   opts?: FormatDateOptions
  // ): Intl.DateTimeFormatPart[];
  // formatTimeToParts(
  //   value: Parameters<Intl.DateTimeFormat['format']>[0] | string,
  //   opts?: FormatDateOptions
  // ): Intl.DateTimeFormatPart[];
  // formatRelativeTime(
  //   value: Parameters<IntlRelativeTimeFormat['format']>[0],
  //   unit?: Parameters<IntlRelativeTimeFormat['format']>[1],
  //   opts?: FormatRelativeTimeOptions
  // ): string;
  // formatNumber(
  //   value: Parameters<Intl.NumberFormat['format']>[0],
  //   opts?: FormatNumberOptions
  // ): string;
  // formatNumberToParts(
  //   value: Parameters<Intl.NumberFormat['format']>[0],
  //   opts?: FormatNumberOptions
  // ): Intl.NumberFormatPart[];
  // formatPlural(
  //   value: Parameters<Intl.PluralRules['select']>[0],
  //   opts?: FormatPluralOptions
  // ): ReturnType<Intl.PluralRules['select']>;
  formatMessage(
    descriptor: MessageDescriptor,
    values?: Record<string, PrimitiveType>
  ): string;
  formatMessage(
    descriptor: MessageDescriptor,
    values?: Record<string, PrimitiveType>
  ): string | React.ReactNodeArray;
  formatHTMLMessage(
    descriptor: MessageDescriptor,
    values?: Record<string, PrimitiveType>
  ): string;
}
