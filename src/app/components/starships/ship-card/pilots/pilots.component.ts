import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { StarshipsService } from '../../../../services/starships.service';

type Pilot = {
  id: string;
  name: string;
  imageUrl: string;
}

@Component({
  selector: 'app-pilots',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pilots.component.html',
  styleUrl: './pilots.component.scss'
})
export class PilotsComponent implements OnChanges {

  @Input() pilotsURLs: string[] = [];

  public pilotsArray: Pilot[] = [];

  constructor(public starshipsService: StarshipsService){}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pilotsURLs'] && changes['pilotsURLs'].currentValue) this.showPilots();
  }

  showPilots() {
    this.pilotsURLs.forEach(pilotURL => {
      //split by "/", delete the last "/"" which is an empty segment, get the last element with the pop() function
      const pilotID = pilotURL.split("/").filter(segment => segment !== "").pop();
      this.starshipsService.showPilot(pilotURL)
          .subscribe(
            {
              next: (res) => {
                console.log(res);
                const pilot: Pilot = {
                  id: pilotID!,
                  imageUrl: '',
                  name: res.name
                }
                this.showPilotsImages(pilotID!, pilot);
                this.pilotsArray.push(pilot);
              }
            }
          )
    })
  }

  async showPilotsImages(id: string, pilot: Pilot): Promise<void> {
    try {
      pilot.imageUrl = await this.starshipsService.showPilotImage(id);
    } catch (error) {
      pilot.imageUrl = '../../../../assets/images/notfound.jpeg';
    }
  }


}
