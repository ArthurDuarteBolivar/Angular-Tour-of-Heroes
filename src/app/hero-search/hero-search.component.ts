import { HeroService } from './../hero.service';
import { debounceTime, distinct, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss']
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<Hero[]>;
  private searhTerms = new Subject<string>();
  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.heroes$ = this.searhTerms.pipe(
      debounceTime(300),

      distinctUntilChanged(),

      switchMap((term: string) => this.heroService.searchHeroes(term)),
    )
  }


  search(term: string): void{
    this.searhTerms.next(term)
  }


}
