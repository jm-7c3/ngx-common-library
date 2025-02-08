import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpFormDigestService {
  private readonly http = inject(HttpClient);

  private readonly formDigestTimeoutSeconds: number;
  private interval: number;

  constructor(
    @Inject('env') private readonly env: any
  ) {
    this.loadFormDigest();

    this.formDigestTimeoutSeconds = (this.env.formDigestTimeoutSeconds ?? 300) * 1000;
    this.interval = setInterval(() => { this.loadFormDigest(); }, this.formDigestTimeoutSeconds);
  }

  clear(): void {
    clearInterval(this.interval);
  }

  getFormDigest(): string {
    return localStorage.getItem('formDigestValue') ?? '';
  }

  private loadFormDigest(): void {
    const baseApiContextPath = `${this.env.spSitePath}/_api/contextinfo`;
    const options = {
      headers: new HttpHeaders({
        accept: 'application/json;odata=verbose'
      })
    };

    this.http.post<any>(baseApiContextPath, options)
      .subscribe(({d}) => {
        const formDigest = d.GetContextWebInformation.FormDigestValue;

        localStorage.setItem('formDigestValue', formDigest);
      });
  }
}
