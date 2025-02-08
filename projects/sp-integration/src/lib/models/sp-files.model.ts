export interface FileInput {
  file?: File;
  hash: string;
  isNew: boolean;
  name: string;
  path: string;
  toDelete: boolean;
}
