import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'Passwords Manager';
}

@Component({
  selector: 'app-default',
  template: `
    In <b>default</b> component.
    <a [routerLink]="['/other']">Other</a> |
    <a [routerLink]="['/rest']">Rest</a> |
    <a href="{{externalUrl}}">External</a>
  `,
  styles: []
})
export class DefaultComponent {

  externalUrl = '/servlet/make-external-call';

  constructor() {
    if (window.location.port === '4200') {
      this.externalUrl = 'http://localhost:8080' + this.externalUrl;
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
  `,
  styles: []
})
export class RestComponent implements OnInit {
  msg$: Subject<string> = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get('/api/hello', { responseType: 'text' })
      .pipe(
        take(1)
      )
      .subscribe(
        msg => this.msg$.next(msg),
        err => {
          console.error(err);
          this.msg$.next('An error happened - see the console log for details');
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
