import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { CurrentUser, CurrentUserProfile, SpCurrentUser, SpCurrentUserProfile,
  SpListResponse, SpListResponseValue, SpQueryConfig, SpUser, User } from '../models';
import { SpListsService } from './sp-lists.service';

@Injectable({
  providedIn: 'root'
})
export class SpUsersService {
  private readonly http = inject(HttpClient);
  private readonly spListsService = inject(SpListsService);

  private readonly baseApiPath: string;
  private readonly baseApiWebPath: string;;

  constructor(
    @Inject('env') private readonly env: any
  ) {
    this.baseApiPath = `${this.env.spSitePath}/_api`;
    this.baseApiWebPath = `${this.env.spSitePath}/_api/web`;
  }

  getCurrentUser(): Observable<CurrentUser> {
    const url = `${this.baseApiWebPath}/currentUser?$expand=groups`;

    return this.http.get<SpCurrentUser>(url).pipe(
      map(user => ({
        email: user.Email,
        groups: user.Groups.map(({ Id, Title }) => ({ id: Id, title: Title })),
        id: user.Id,
        isSiteAdmin: user.IsSiteAdmin,
        title: user.Title
      }))
    );
  }

  async getCurrentUserAsync(): Promise<CurrentUser> {
    const url = `${this.baseApiWebPath}/currentUser?$expand=groups`;

    const response = await fetch(url);
    const { Email, Groups, Id, IsSiteAdmin, Title }: SpCurrentUser = await response.json();

    const user = {
      email: Email,
      groups: Groups.map(group => ({ id: group.Id, title: group.Title })),
      id: Id,
      isSiteAdmin: IsSiteAdmin,
      title: Title
    };

    return user;
  }

  getCurrentUserProfile(): Observable<CurrentUserProfile> {
    const url = `${this.baseApiPath}/SP.UserProfiles.PeopleManager/GetMyProperties`;

    return this.http.get<SpCurrentUserProfile>(url).pipe(
      map(({ Email, DisplayName, Title, UserProfileProperties }) => ({
        cellPhone: getUserProfileProperty(UserProfileProperties, 'CellPhone')?.Value ?? '',
        email: Email,
        homePhone: getUserProfileProperty(UserProfileProperties, 'HomePhone')?.Value ?? '',
        location: getUserProfileProperty(UserProfileProperties, 'SPS-Location')?.Value ?? '',
        manager: getUserProfileProperty(UserProfileProperties, 'Manager')?.Value ?? '',
        name: DisplayName,
        title: Title,
        workPhone: getUserProfileProperty(UserProfileProperties, 'WorkPhone')?.Value ?? ''
      }))
    );
  }

  getUser(id: number): Observable<User> {
    const url = `${this.baseApiWebPath}/getuserbyid(${id})`;

    return this.http.get<SpUser>(url).pipe(
      map(user => ({
        email: user.Email,
        id: user.Id,
        isSiteAdmin: user.IsSiteAdmin,
        title: user.Title
      }))
    );
  }

  siteUsers(config: SpQueryConfig): Observable<SpListResponseValue[]> {
    const url = this.spListsService.getQuery(null, 'siteusers', config);

    return this.http.get<SpListResponse>(url).pipe(
      map(({ value }) => value)
    );
  }
}

function getUserProfileProperty(values: any[], key: string): any | null {
  return values.find(value => value.Key === key) ?? null;
}
