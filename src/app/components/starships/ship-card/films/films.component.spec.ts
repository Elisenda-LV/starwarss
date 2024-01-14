import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmsComponent } from './films.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

describe('FilmsComponent', () => {
  let component: FilmsComponent;
  let fixture: ComponentFixture<FilmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FilmsComponent,
        CommonModule,
        HttpClientModule,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should call showFilmsImages for each film URL', async () => {
    spyOn(component.starshipsService, 'showFilm').and.returnValue(of({ title: 'Some Film', episode_id: 1 }));
    spyOn(component, 'showFilmsImages').and.returnValue(Promise.resolve());

    component.filmsURLs = ['filmURL1', 'filmURL2'];
    await component.showFilms();

    expect(component.showFilmsImages).toHaveBeenCalledTimes(2);
    expect(component.showFilmsImages).toHaveBeenCalledWith('filmID1', jasmine.any(Object));
    expect(component.showFilmsImages).toHaveBeenCalledWith('filmID2', jasmine.any(Object));
  });

  it('should set default image on showFilmsImages error', async () => {
    spyOn(component.starshipsService, 'showFilmImage').and.throwError('Some error');

    const film: any = { id: 'someId' };
    await component.showFilmsImages('someId', film);

    expect(film.imageUrl).toEqual('../../../../assets/images/notfound.jpg');
  });


});
