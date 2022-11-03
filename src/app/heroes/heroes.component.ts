import { MessageService } from './../message.service';
import { HEROES } from './../mock-heroes';
import { Hero } from './../hero';
import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  heroes : Hero[] = []
  constructor(private heroService: HeroService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getHeroes();
  }


  getHeroes(): void{
   this.heroService.getHeroes().subscribe((heroes) =>   this.heroes = heroes);
  }

  add(name: string){
    name = name.trim();
    if(!name) {
      return this.messageService.add("preencha todos os campos")
    }
    this.heroService.addHero({name} as Hero).subscribe(hero => {
      this.heroes.push(hero);
    })
  }
  delete(hero: Hero): void{
    this.heroes =  this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
