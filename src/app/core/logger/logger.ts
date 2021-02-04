import { Injectable, Inject, InjectionToken } from '@angular/core';
import { NgxsPlugin } from '@ngxs/store';
import { tap } from 'rxjs/operators';

export const NGXS_LOGGER_PLUGIN_OPTIONS = new InjectionToken('NGXS_LOGGER_PLUGIN_OPTIONS');

@Injectable()
export class LoggerPlugin implements NgxsPlugin {
  constructor(@Inject(NGXS_LOGGER_PLUGIN_OPTIONS) private options: any) {}

  handle(state, action, next) {
    console.log('Action started!', state);
    return next(state, action).pipe(
      tap(result => {
        console.log('Action happened!', result);
      })
    );
  }
}

