import { createAction, props } from '@ngrx/store';

import { ToastData } from './toasts.models';

export const toastError = createAction(
  '[Message] Toast Error',
  props<ToastData>()
);
export const toastSuccess = createAction(
  '[Message] Toast Success',
  props<ToastData>()
);
export const toastWarning = createAction(
  '[Message] Toast Warning',
  props<ToastData>()
);
