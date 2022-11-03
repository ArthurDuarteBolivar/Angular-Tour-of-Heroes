import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private http: HttpClient,
  private messageService: MessageService) { }

  private log(message: string){
    this.messageService.add(`HeroService: ${message}`)
  }
  private heroesUrl = 'api/heroes';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

getHeroes(): Observable<Hero[]>{
  return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(_ => this.log('fetch heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    )
}

private handleError<T>(operation = 'operation', result?:T) {
  return (error: any):Observable<T> => {
    console.error(error);
    this.log(`${operation} failed: ${error.message}`);
    return of(result as T);
  };
}

getHero(id: number): Observable<Hero>{
  const hero = HEROES.find(h => h.id === id)
  this.messageService.add(`HeroService: fetched hero id=${id}`);
  return of(hero!)
}

 updateHero(hero: Hero): Observable<any>{
  return this .http.put(this.heroesUrl, hero, this.httpOptions).pipe(
    tap(_ => this.log(`update hero id=${hero.id}`)),
    catchError(this.handleError<any>('updateHero'))
  )
 }
 addHero(name: Hero): Observable<Hero>{
  return this.http.post<Hero>(this.heroesUrl, name, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added new Hero id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
  )

 }
 deleteHero(id: number): Observable<Hero>{
  const url = `${this.heroesUrl}/${id}`

  return this.http.delete<Hero>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted hero id=${id}`)),
    catchError(this.handleError<Hero>('deletedHero'))
  )
 }

 searchHeroes(term: string): Observable<Hero[]>{
  if(!term.trim){
    return of([])
  }
  return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
    tap(x => x.length ?
      this.log(`found heroes matching "${term}"`) :
      this.log(`no heroes matching "${term}`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
  )
 }

}
