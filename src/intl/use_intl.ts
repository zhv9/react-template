import { useIntlState } from './intl_context_provider';
import { useSimpleIntl } from './intl_simple_provider';

export function useIntl() {
  const intl = useSimpleIntl();
  try {
    return useIntlState().intl;
  } catch (error) {
    return intl;
  }
}
