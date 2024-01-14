import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PilotsComponent } from './pilots.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';

describe('PilotsComponent', () => {
  let component: PilotsComponent;
  let fixture: ComponentFixture<PilotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PilotsComponent,
        HttpClientModule,
        CommonModule,
    ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PilotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call showPilotsImages for each pilot URL', async () => {
    spyOn(component.starshipsService, 'showPilot').and.returnValue(of({ name: 'Some Pilot' }));
    spyOn(component, 'showPilotsImages').and.returnValue(Promise.resolve());

    component.pilotsURLs = ['pilotURL1', 'pilotURL2'];
    await component.showPilots();

    expect(component.showPilotsImages).toHaveBeenCalledTimes(2);
    expect(component.showPilotsImages).toHaveBeenCalledWith('pilotID1', jasmine.any(Object));
    expect(component.showPilotsImages).toHaveBeenCalledWith('pilotID2', jasmine.any(Object));
  });

  it('should set default image on showPilotsImages error', async () => {
    spyOn(component.starshipsService, 'showPilotImage').and.throwError('Some error');

    const pilot: any = { id: 'someId' };
    await component.showPilotsImages('someId', pilot);

    expect(pilot.imageUrl).toEqual('../../../../assets/images/notfound.jpeg');
  });

});
