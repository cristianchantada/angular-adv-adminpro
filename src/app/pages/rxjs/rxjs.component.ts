import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs: Subscription;

  constructor() {

    // this.retornaObservable()
    //   .pipe(retry(2))
    //   .subscribe(
    //     (valor) => console.log('Subs:', valor),
    //     (err) => console.warn('Error:', err),
    //     () => console.info('Observer terminado')
    //   );

    this.intervalSubs = this.retornaIntervalo().subscribe(
      console.log
    )

  }

  retornaIntervalo(): Observable<number> {
    return interval(300).pipe(
      //take(10),
      map(valor => valor + 1),
      filter(valor => valor % 2 === 1 ? true : false)
    );
  }

  retornaObservable(): Observable<number> {
    let i = -1;

    return new Observable<number>((observer) => {
      const intervalo = setInterval(() => {
        i++;
        observer.next(i);

        if (i === 3) {
          clearInterval(intervalo);
          observer.complete();
        }

        if (i === 2) observer.error('i llegó al valor de 2');
      }, 1000);
    });
  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

}
