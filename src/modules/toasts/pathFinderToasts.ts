import { useToast } from 'vue-toastification';
import { getEnumValues } from '@/modules/commonFunctions/enumHelpers';
import ToastTypeEnum from '@/modules/enums/toastTypesEnum';

import CheckIcon from '@/components/icons/toastsIcons/CheckIcon.vue';
import ExclamationIcon from '@/components/icons/toastsIcons/ExclamationIcon.vue';
import XMarkIcon from '@/components/icons/toastsIcons/XMarkIcon.vue';

/**
 * Wrapper for toast notifications that contains our custom styles config
 * @param {string} toastType toast type
 * @param {string} msg toast message
 */
export const toast = (toastType: string, msg: string): void => {
  if (!getEnumValues(ToastTypeEnum).includes(toastType)) return;
  const toast = useToast();

  switch(toastType) {
    case ToastTypeEnum.SUCCESS: toast.success(msg, { icon: CheckIcon }); break;
    case ToastTypeEnum.WARNING: toast.warning(msg, { icon: ExclamationIcon }); break;
    case ToastTypeEnum.ERROR: toast.error(msg, { icon: XMarkIcon }); break;
  }
};
