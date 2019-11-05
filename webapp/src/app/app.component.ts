import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div style="text-align:center">
      <h1>
        Welcome to {{title}}!
      </h1>
      <img width="300" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==">
      <img src="/assets/quarkus_logo_horizontal_rgb_1280px_reverse.svg"/>
    </div>
    <h2>Here are some links to help you start: </h2>
    <ul>
      <li>
        <h2><a target="_blank" rel="noopener" href="https://angular.io/tutorial">Tour of Heroes</a></h2>
      </li>
      <li>
        <h2><a target="_blank" rel="noopener" href="https://angular.io/cli">CLI Documentation</a></h2>
      </li>
      <li>
        <h2><a target="_blank" rel="noopener" href="https://blog.angular.io/">Angular blog</a></h2>
      </li>
    </ul>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'webapp';
}

@Component({
  selector: 'app-default',
  template: `
    In <b>default</b> component. 
    <a [routerLink]="['/other']">Other</a> | 
    <a [routerLink]="['/rest']">Rest</a> |
    <a href="/servlet/make-external-call">External</a>
  `,
  styles: []
})
export class DefaultComponent {
	
	externalUrl = '/servlet/make-external-call';

	 constructor() {
    	if (window.location.port === "4200") {
      		this.externalUrl = "http://localhost:8080" + this.externalUrl;
    	}
	}
}

@Component({
  selector: 'app-other',
  template: `
    In <b>other</b> component. <a [routerLink]="['/']">Default</a>
  `,
  styles: []
})
export class OtherComponent {
}

@Component({
  selector: 'app-rest',
  template: `
    In <b>rest</b> component. <a [routerLink]="['/']">Default</a><br>
    Message was: {{msg$ | async}}
	<br>SEE THE CHANGE IN ACTION
  `,
  styles: []
})
export class RestComponent implements OnInit {
  msg$: Subject<string> = new BehaviorSubject<string>("");

  constructor(private _http: HttpClient) {
  }

  ngOnInit(): void {
    this._http.get('/api/hello', {responseType: 'text'})
    .pipe(
      take(1)
    )
    .subscribe(
      msg => this.msg$.next(msg),
      err => {
        console.error(err);
        this.msg$.next("An error happened - see the console log for details");
      });
  }
}

@Component({
  selector: 'app-rest',
  template: `
    Received callback from server! <a [routerLink]="['/']">Default</a>
  `,
  styles: []
})
export class ClientCallbackComponent {
}