import { useContext } from 'react';
import { intlContext } from './provider';
import { invariantIntlContext } from '../utils';

export default function useIntl() {
  const intl = useContext(intlContext);
  invariantIntlContext(intl);
  return intl;
}
