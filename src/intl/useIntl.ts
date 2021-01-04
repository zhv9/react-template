import { useIntlState } from './IntlContextProvider';
import { useSimpleIntl } from './intlSimpleProvider';

export function useIntl() {
  const intl = useSimpleIntl();
  try {
    return useIntlState().intl;
  } catch (error) {
    return intl;
  }
}
