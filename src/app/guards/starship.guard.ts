import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { StarshipsService } from '../services/starships.service';


@Injectable({
  providedIn: 'root',
})
export class StarshipGuard {
  constructor(
    private router: Router,
    private starshipsService: StarshipsService,
  ) {}

    //TODO: Important! Afegir a app.routes.ts el CanActivate!

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const id: string = route.params['id'];

    if (isNaN(Number(id))) {
      this.router.navigate(['/not-found']);
      return of(false);
    }

    return this.starshipsService.showCards(id).pipe(
      map((starship) => {
        if (starship) {
          return true;
        } else {
          this.router.navigate(['/not-found']);
          return false;
        }
      }),
      catchError((error) => {
        this.router.navigate(['/not-found']);
        return of(false);
      })
    );
  }
}
