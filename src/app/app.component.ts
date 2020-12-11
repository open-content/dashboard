import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationStart, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Subscription } from 'rxjs';
import { SessionService } from './auth/session.service';
import { TitleService } from './shared/title.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private _authSubscription: Subscription;

  loggedIn: boolean = false;
  noSidebar: boolean = false;

  constructor( 
    private session: SessionService, 
    private router: Router, 
    private route: ActivatedRoute,
    private title: TitleService
  ) {
    this.loggedIn = this.session.token ? true : false;
  }

  ngOnInit() {
    document.body.classList.remove('auth-bg');
    this._authSubscription = this.session.subscribe((loggedIn: boolean) => {
      this.loggedIn = loggedIn;
    });

    this.router.events.subscribe((event: RouterEvent) => {
      if(event instanceof NavigationEnd) {
        const { routeConfig }: ActivatedRoute = this._child(this.route);

        if(routeConfig.data.noSidebar) {
          this.noSidebar = true;
        } else {
          this.noSidebar = false;
        }

        if(routeConfig.data && routeConfig.data.title) {
          this.title.set(routeConfig.data.title);
        }
      }
    })
  }

  ngOnDestroy() {
    this._authSubscription.unsubscribe();
  }

  private _child(route: ActivatedRoute): ActivatedRoute {
    if(route.firstChild) {
      return this._child(route.firstChild);
    }

    return route;
  }
}
