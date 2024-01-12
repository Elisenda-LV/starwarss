import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Starships, StarshipsData } from '../interfaces/starships.interface';

@Injectable({providedIn: 'root'})

export class StarshipsService {

  constructor() { }

  //TODO: 1 - Injectar HttpClient i conectar-se a la API
  //(abans afegir als providers de app.config.ts el HttpClientModule i els que siguin necessaris.)

  private httpClient = inject(HttpClient)
  private apiUrl = 'https://swapi.py4e.com/api/starships';
  private imageUrl = 'https://starwars-visualguide.com/assets/img';


  //TODO: 2 - métode per mostrar les naus i cards. Amb l'obserbable enllacem l'interface per tenir l'estructura de dades necessàries.
  // Aquest mètode el farem servir al starship.component.ts per crera el métode per mostrar naus en pantalla.

  public showStarships(page: string): Observable<Starships> {
    const apiUrlPage = `${this.apiUrl}/?page=${page.toString()}`;

    return this.httpClient
    .get<Starships>(apiUrlPage);

  }

  public showCards(id: string): Observable<any> {
    const apiUrlWithId = `${this.apiUrl}/${id}`;

    return this.httpClient
    .get<StarshipsData>(apiUrlWithId);

  }

  //TODO: 3- métode per mostrar les imatges de les naus.

  public async showImages(id: string): Promise<any>{
    try {
      const resp = await fetch(`${this.imageUrl}/starships/${id}.jpg`);

      if(resp.ok){
        const respData = await resp.blob();
        //Crear url de la imatge per assignar a la propietat d'un component.
        const imageUrlData = URL.createObjectURL(respData);
        console.log(imageUrlData)

        return imageUrlData;

      }else throw new Error('Image not available');


    }catch(error){
      console.error(error);
      throw error;
    }

  }

  //TODO: 4- Mostrar pilots i films:

  public showPilot(url: string) {
    return this.httpClient.get<any>(url);
  }

  public async showPilotImage(id: string): Promise<string> {
    try {
      const response = await fetch(`${this.imageUrl}/characters/${id}.jpg`);

      if (response.ok) {
        const responseData = await response.blob();
        const imageUrl = URL.createObjectURL(responseData);
        // imageUrl ahora contiene la URL de la imagen que puedes asignar a una propiedad en tu componente
        console.log('Imagen loaded succesfully:', imageUrl);
        return imageUrl;
      }
      else throw new Error('Image not available');

    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }

  public showFilm(url: string) {
    return this.httpClient.get<any>(url);
  }

  public async showFilmImage(id: string): Promise<string> {
    try {
      const response = await fetch(`${this.imageUrl}/films/${id}.jpg`);

      if (response.ok) {
        const responseData = await response.blob();
        const imageUrl = URL.createObjectURL(responseData);
        // imageUrl ahora contiene la URL de la imagen que puedes asignar a una propiedad en tu componente
        console.log('Imagen loaded succesfully:', imageUrl);
        return imageUrl;
      }
      else throw new Error('Image not available');

    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }



}
