import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { FileInput, SPListSubmit } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SpFilesService {
  private readonly http = inject(HttpClient);

  private readonly baseApiWebPath: string;

  constructor(
    @Inject('env') private readonly env: any
  ) {
    this.baseApiWebPath = `${this.env.spSitePath}/_api/web`;
  }

  createDirectory(directory: string): Observable<any> {
    const spData: SPListSubmit = {
      __metadata: {
        type: 'SP.Folder'
      },
      ServerRelativeUrl: `SiteAssets/Ng-Forms/${directory}`
    };
    const url = `${this.baseApiWebPath}/folders`;

    return this.http.post(url, spData);
  }

  downloadFile(files: FileInput[], path?: string): void {
    const file = files[0];
    const fileName = this.getFileName(file);
    let url = this.env.spSiteAssets;

    if (path) {
      url += `/${path}`;
    } else {
      url += `/${file.path}`;
    }

    url += `/${fileName}`;

    window.open(url, '_blank');
  }

  getFileName(file: FileInput): string {
    const name = file.name.split('.');

    return `${name[0]}.${file.hash}.${name[name.length - 1]}`;
  }

  getSafeFileName(file: FileInput): string {
    const name = file.name.split('.');

    return `${decodeURIComponent(name[0])}.${name[2]}`;
  }

  uploadFile(directory: string, fileName: string, data: File): Observable<any> {
    const url = `${this.baseApiWebPath}/GetFolderByServerRelativeUrl('SiteAssets/Ng-Forms/${directory}')/Files/add(url='${fileName}',overwrite=true)`;

    return this.http.post(url, data);
  }
}
