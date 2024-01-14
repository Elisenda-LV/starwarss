import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarshipsComponent } from './starships.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

describe('StarshipsComponent', () => {
  let component: StarshipsComponent;
  let fixture: ComponentFixture<StarshipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StarshipsComponent,
        CommonModule,
        HttpClientModule,
        RouterModule,
        InfiniteScrollModule
        ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarshipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load starships data on ngOnInit', () => {
    spyOn(component, 'showData');  // Espía el método showData

    component.ngOnInit();

    expect(component.showData).toHaveBeenCalledOnceWith();
  });

  it('should navigate to starship details on viewShip', () => {
    spyOn(component.router, 'navigate');  // Espía el método navigate del router
    const id = '123';

    component.viewShip(id);

    expect(component.router.navigate).toHaveBeenCalledOnceWith(['/starships', id]);
  });

  it('should load starships data on loadStarships', () => {
    spyOn(component, 'showData');  // Espía el método showData

    component.loadStarships();

    expect(component.showData).toHaveBeenCalledOnceWith();
  });

  it('should decrement currentPage and load starships data on scrollUp', () => {
    spyOn(component, 'showData');  // Espía el método showData
    component.currentPage = 2;

    component.scrollUp();

    expect(component.currentPage).toEqual(1);
    expect(component.showData).toHaveBeenCalledOnceWith();
  });

  it('should set load to false and not load data if load is false on loadStarships', () => {
    spyOn(component, 'showData');  // Espía el método showData
    component.load = false;

    component.loadStarships();

    expect(component.showData).not.toHaveBeenCalled();
  });



});
