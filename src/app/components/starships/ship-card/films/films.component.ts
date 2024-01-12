import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { StarshipsService } from '../../../../services/starships.service';

type Film = {
  id: string;
  title: string;
  episode: string;
  imageUrl: string;
}

@Component({
  selector: 'app-films',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './films.component.html',
  styleUrl: './films.component.scss'
})
export class FilmsComponent implements OnChanges {

  @Input() filmsURLs: string[] = [];

  public filmsArray: Film[] = [];

  constructor(public starshipsService: StarshipsService){}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filmsURLs'] && changes['filmsURLs'].currentValue) this.showFilms();
  }

  public showFilms(){
    this.filmsURLs.forEach(filmURL => {
      const filmID = filmURL.split("/").filter(segment => segment !== "").pop();
      this.starshipsService.showFilm(filmURL)
          .subscribe(
            {
              next: (res) => {
                console.log(res);
                const film: Film = {
                  id: filmID!,
                  imageUrl: '',
                  title: res.title,
                  episode: 'Episode ' + res.episode_id
                }
                this.showFilmsImages(filmID!, film);
                this.filmsArray.push(film);
              }
            }
          )
    })
  }

  async showFilmsImages(id: string, film: Film): Promise<void> {
    try {
      film.imageUrl = await this.starshipsService.showFilmImage(id);
    } catch (error) {
      film.imageUrl = '../../../../assets/images/notfound.jpg';
    }
  }

}
