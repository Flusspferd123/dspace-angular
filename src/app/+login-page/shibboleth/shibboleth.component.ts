import { Component, OnInit } from '@angular/core';
import {GetJWTafterShibbLoginAction} from '../../core/auth/auth.actions';
import { select, Store } from '@ngrx/store';
import {CoreState} from '../../core/core.reducers';
import {Observable, of} from 'rxjs';
import { isAuthenticated, isAuthenticationLoading } from '../../core/auth/selectors';

@Component({
  selector: 'ds-shibboleth-page',
  templateUrl: './shibboleth.component.html',
  styleUrls: ['./shibboleth.component.scss']
})
export class ShibbolethComponent implements OnInit {

  /**
   * True if the shibboleth authentication is loading.
   * @type {boolean}
   */
  public loading: Observable<boolean>;
  private isAuthenticated: Observable<boolean>;

  ngOnInit() {
    // set isAuthenticated
    this.isAuthenticated = this.store.pipe(select(isAuthenticated));

    // this.loading = of(true);
    // set loading
    this.loading = this.store.pipe(select(isAuthenticationLoading));

    this.store.dispatch(new GetJWTafterShibbLoginAction());
  }

  constructor( private store: Store<CoreState>,) { }

}
