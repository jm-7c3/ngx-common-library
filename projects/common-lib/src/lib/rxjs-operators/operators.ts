import { concatWith, Observable, toArray } from 'rxjs';

export function concatWithToArray<T>(values: Observable<T>[]): Observable<T[]> {
  return values[0].pipe(
      concatWith(...values.slice(1)),
      toArray()
  );
}
