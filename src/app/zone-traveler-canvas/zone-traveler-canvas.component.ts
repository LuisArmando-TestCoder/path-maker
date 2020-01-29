import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MapTravelService } from '../services/map-travel.service';
import Canvas from 'canvas-preset';

@Component({
  selector: 'zt-canvas',
  templateUrl: './zone-traveler-canvas.component.html',
  styleUrls: ['./zone-traveler-canvas.component.css'],
  providers: [MapTravelService]
})
export class ZoneTravelerCanvasComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private mapTravel: MapTravelService,
  ) { }

  private pasteArc(obj, color): object {
    return Object.assign(obj, { c: color, r: 5 })
  }

  private pasteTraveler(traveler): object {
    return this.pasteArc(traveler, '#2196f3');
  }

  private pasteZoneVertex(zoneVertex) {
    return this.pasteArc(zoneVertex, '#f44336');
  }

  private pasteZones(zone): object[] {
    return zone.map(zoneVertex => this.pasteZoneVertex(zoneVertex));
  }

  private pasteManyTravelers(travel): object[] {
    return travel.travelers.map(traveler => this.pasteTraveler(traveler));
  }

  private pasteManyZones(travel): object[][] {
    return travel.zones.map(zone => this.pasteZones(zone));
  }

  private makeUrlTravel(obj): string {
    return `travel?q=${this.mapTravel.toString(obj)}`;
  }

  private pushTraveler({x, y}) {
    this.travelers.push(this.pasteTraveler({
      x, y,
      originalPositions: { x, y },
      zoneIndex: 0
    }));
  }

  private pushZone({x, y}) {
    const index = this.travelers.length - 1;
    if (!this.zones[index]) this.zones[index] = [];
    this.zones[index].push(this.pasteZoneVertex({ x, y }));
  }

  private resetZoneIndex(travelers) {
    travelers.forEach(traveler => traveler.zoneIndex = 0);
    return travelers;
  }

  private hardCopy(value) {
    return JSON.parse(JSON.stringify(value));
  }

  stringTravel: string = this.route.snapshot.queryParams.q || '';
  jsonTravel = this.mapTravel.toJSON(this.stringTravel);
  travelers: object[] = [...this.pasteManyTravelers(this.jsonTravel)];
  zones: any = this.pasteManyZones(this.jsonTravel);
  isPastingTypeTraveler: boolean = true;
  chosenTraveler: number = 0;
  urlTravel: string = this.makeUrlTravel(this.jsonTravel);


  ngOnInit() {
    Canvas(({ size, clear, draw, renderGroup }) => {
      size();
      draw(() => {
        clear('#000');
        this.zones.forEach(zone => {
          renderGroup('arc', zone);
        });
        renderGroup('arc', this.travelers, (traveler, i) => {
          const zone = this.zones[i];
          const vertex = zone[traveler.zoneIndex];

          const areXAxisEqual = traveler.x - vertex.x < 1;
          const areYAxisEqual = traveler.y - vertex.y < 1;
          const canIncreaseIndex = areXAxisEqual && areYAxisEqual && traveler.zoneIndex < this.zones[i].length - 1;

          if (canIncreaseIndex) traveler.zoneIndex++;

          traveler.x += (vertex.x - traveler.x) / 10;
          traveler.y += (vertex.y - traveler.y) / 10;
        });
      });
    });
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const { clientX: x, clientY: y } = event;

    event.stopPropagation();

    if (this.isPastingTypeTraveler) {
      this.pushTraveler({x, y});
      this.isPastingTypeTraveler = false;
    }

    this.pushZone({x, y});

    this.urlTravel = this.makeUrlTravel({
      travelers: this.resetZoneIndex(this.hardCopy(this.travelers)), zones: this.zones
    });

    window.history.pushState('', '', this.urlTravel);
  }
}
