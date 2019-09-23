import { Component, OnInit } from '@angular/core';
import {GetJWTafterShibbLoginAction} from '../../core/auth/auth.actions';
import { select, Store } from '@ngrx/store';
import {CoreState} from '../../core/core.reducers';
import {Observable, of} from 'rxjs';
import { isAuthenticated, isAuthenticationLoading } from '../../core/auth/selectors';
import { filter, takeWhile } from 'rxjs/operators';
import { AuthService } from '../../core/auth/auth.service';

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
  public isAuthenticated: Observable<boolean>;

  /**
   * Component state.
   * @type {boolean}
   */
  private alive = true;

  ngOnInit() {
    // set isAuthenticated
    this.isAuthenticated = this.store.pipe(select(isAuthenticated));

    // this.loading = of(true);
    // set loading
    this.loading = this.store.pipe(select(isAuthenticationLoading));

    this.store.dispatch(new GetJWTafterShibbLoginAction());

    // subscribe to success
    this.store.pipe(
      select(isAuthenticated),
      takeWhile(() => this.alive),
      filter((authenticated) => authenticated)
    ).subscribe(() => {
          this.authService.redirectAfterLoginSuccess(false);
        }
      );
  }

  constructor( private store: Store<CoreState>, private authService: AuthService) { }

}
