import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { StarshipsService } from '../../services/starships.service';
import { Starships } from '../../interfaces/starships.interface';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-starships',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    InfiniteScrollModule,
  ],
  templateUrl: './starships.component.html',
  styleUrl: './starships.component.scss'
})
export class StarshipsComponent implements OnInit {
  //TODO: 1- Afegir HttpClientModule a imports. I implementar l'OnInit.

  public starshipService = inject(StarshipsService);
  public starshipsData: any[] = [];

  public currentPage: number = 1;
  public load: boolean = true;

  constructor(public router: Router){}

  ngOnInit(): void {
    this.showData()
  }

  //TODO: 2- Crear métode per mostrar dades, fem servir showStarships() que hem creat al service.

  public showData(){
    this.starshipService.showStarships(this.currentPage)
      .subscribe({
        next: (data: Starships) => {
        this.starshipsData = data.results;
        this.starshipsData.forEach(ship => {
          ship.id = ship.url.split('/').reverse()[1];
        });
        console.log(this.starshipsData);
      },
    });
  }

  //TODO: 3- Métode per mostrar dades a ship-card, (click):

  public viewShip(id: string) {
    if(id){
    this.router.navigate(['/starships', id]);
    }else{
      console.error('Id undefined o null')
    }
  }


  //TODO: 4- Métode per implementar l'inifinite-scroll.
  //Descarregar biblioteca a la terminal, afegir InfiniteScrollModule a imports.

   public loadStarships(){
    if(this.load){
      this.currentPage++;
      this.showData();
    }

  }

  public scrollUp(){
    if(this.load){
      this.currentPage--;
      this.showData();
    }

  }



  }

