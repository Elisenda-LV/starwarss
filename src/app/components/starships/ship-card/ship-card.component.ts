import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { StarshipsComponent } from '../starships.component';
import { StarshipsData } from '../../../interfaces/starships.interface';
import { StarshipsService } from '../../../services/starships.service';

@Component({
  selector: 'app-ship-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    StarshipsComponent,
  ],
  templateUrl: './ship-card.component.html',
  styleUrl: './ship-card.component.scss'
})
export class ShipCardComponent {
  public starshipService = inject(StarshipsService);
  public starshipsId : string = '';

  public starshipCard : StarshipsData = {
    id:                     '',
    name:                   '',
    model:                  '',
    manufacturer:           '',
    cost_in_credits:        '',
    length:                 '',
    max_atmosphering_speed: '',
    crew:                   '',
    passengers:             '',
    cargo_capacity:         '',
    consumables:            '',
    hyperdrive_rating:      '',
    MGLT:                   '',
    starship_class:         '',
    pilots:                 [],
    films:                  [],
    created:                '',
    edited:                 '',
    url:                    '',
  }

  public pilots: string[] = [];
  public films: string[] = [];

  constructor(public route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(id => {
        this.starshipsId = id.get('id')!;
    });

    this.showCard(this.starshipsId);

  }

  //TODO: Métode per extreure dades de l'api, showCards(), showImages() els obtenim del service.
  public showCard(id: string){
    this.starshipService.showCards(id)
      .subscribe({
        next: async (data: StarshipsData) => {
        this.starshipCard = data;
        this.pilots = this.starshipCard.pilots;
        this.films = this.starshipCard.films;
        await this.showImage(id);
        },
      })


  }

  async showImage(id: string){
    try{
      this.starshipCard.url = await this.starshipService.showImages(id)

    }catch(error){
      this.starshipCard.url = 'assets/images/notfound.png';

    }
  }


}
