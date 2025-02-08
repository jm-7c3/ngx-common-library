import { SpListDataResponseResults } from './sp-lists.model';

export interface CurrentUser {
  email: string;
  groups: {id: number; title: string;}[];
  id: number;
  isSiteAdmin: boolean;
  title: string;
}

export interface CurrentUserProfile {
  cellPhone: string;
  email: string;
  homePhone: string;
  location: string;
  manager: string;
  name: string;
  title: string;
  workPhone: string;
}

export interface SpCurrentUser {
  Email: string;
  Groups: {Id: number; Title: string;}[];
  Id: number;
  IsSiteAdmin: boolean;
  Title: string;
}

export interface SpCurrentUserProfile {
  DisplayName: string;
  Email: string;
  Title: string;
  UserProfileProperties: any[];
}

export interface SpListDataResponse {
  d: {
    results: SpListDataResponseResults[];
  };
}

export interface SpUser {
  Email: string;
  Id: number;
  IsSiteAdmin: boolean;
  Title: string;
}

export interface User {
  email: string;
  id: number;
  isSiteAdmin: boolean;
  title: string;
}
