/**
 * Reactivity in Angular
 * @see https://angular.io/guide/reactive-programming
 * ==============================
 * 
 * Reactivity is a programming paradigm that focuses on the propagation of changes.
 * 
 * Observables and RxJS
 * 
 * In Angular, reactivity was primarily achieved through the use of RxJS (Reactive Extensions for JavaScript),
 * which provides a powerful way to work with asynchronous data streams. 
 * Angular leverages RxJS to handle events, HTTP requests, and other asynchronous operations in a declarative manner.
 * 
 * Signals
 * 
 * Nowadays, with the introduction of Angular Signals, reactivity is further enhanced.
 * Signals provide a more straightforward and efficient way to manage state and reactivity in Angular applications.
 * 
 */

import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, computed, effect, signal } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: 'app-reactive',
  template: `
    <h2>Reactivity in Angular</h2>
    <button (click)="false">Click</button>
    <br>
    Time : {{ time }} <br>
    TimeSignal : {{ timeSignal() }}  - {{ humanTime()}}<br>
    TimeSubject : {{ timeSubject | async }} <br>
    TimePromise : {{ timePromise | async }} <br>
  `,
  imports: [AsyncPipe],
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReactiveComponent {
    time = Date.now();

    timeSignal = signal(Date.now());

    humanTime = computed( () => new Date(this.timeSignal()).toLocaleDateString() );

    sigRef = effect(() => {
        console.log('TimeSignal changed:', this.timeSignal());
    });

    timePromise = Promise.resolve(Date.now());

    timeSubject = new BehaviorSubject(Date.now());

    constructor() {
        setInterval(() => {
            this.time = Date.now();
            this.timeSignal.set(Date.now());
            this.timeSubject.next(Date.now());  

        }, 1000);
    }

}