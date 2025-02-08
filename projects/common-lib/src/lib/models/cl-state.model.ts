export type ClState = {
  stateMessage: ClStateMessage | null;
};

export interface ClStateMessage {
  key?: string;
  payload?: any;
  type: ClStateMessageType;
};

export type ClStateMessageType = 'confirmation' | 'confirmation-accept' |
  'confirmation-cancel' | 'content-dialog' | 'content-dialog-cancel' |
  'content-dialog-close' | 'form-dialog' | 'form-dialog-cancel' |
  'form-dialog-submit' | 'progess-bar-dialog-close' | 'progess-bar-dialog-open' |
  'toast';
