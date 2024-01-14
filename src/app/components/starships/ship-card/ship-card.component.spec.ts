import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipCardComponent } from './ship-card.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

describe('ShipCardComponent', () => {
  let component: ShipCardComponent;
  let fixture: ComponentFixture<ShipCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ShipCardComponent,
        CommonModule,
        RouterModule,
        HttpClientModule,

      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load starship card data on ngOnInit', () => {
    spyOn(component, 'showCard');  // Espía el método showCard

    component.ngOnInit();

    expect(component.showCard).toHaveBeenCalledOnceWith('someId');
  });

  it('should set default image on showImage error', async () => {
    spyOn(component.starshipService, 'showImages').and.throwError('Some error');

    await component.showImage('someId');

    expect(component.starshipCard.url).toEqual('assets/images/notfound.png');
  });




});
