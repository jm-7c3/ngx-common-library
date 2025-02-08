import { Injectable } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { patchState, signalState } from '@ngrx/signals';
import { filter, Observable } from 'rxjs';

import { ClState, ClStateMessage, ClStateMessageType } from '../models';

const initialState: ClState = {
  stateMessage: null
};

@Injectable({
  providedIn: 'root'
})
export class ClStateService {
  private readonly state = signalState(initialState);

  readonly stateMessage: any = this.state.stateMessage;
  private readonly stateMessage$ = toObservable(this.state.stateMessage);

  onStateMessage(type: ClStateMessageType): Observable<ClStateMessage | null> {
    return this.stateMessage$.pipe(
      filter(message => message?.type === type)
    );
  }

  updateStateMessage(stateMessage: ClStateMessage | null): void {
    patchState(this.state, {stateMessage});
  }
}
