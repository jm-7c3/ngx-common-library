export interface FormDialogData {
  component: any;
  config?: FormDialogDataConfig;
  header: string;
  key: string;
  styleClass?: string;
  value?: any;
}

export interface FormDialogDataConfig {
  cancelLabel?: string;
  hideSubmitButton?: boolean;
  submitLabel?: string;
}
