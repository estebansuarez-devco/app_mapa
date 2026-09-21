import {AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA,} from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage implements AfterViewInit {
  private map!: L.Map;

  constructor() {}
  ngAfterViewInit(): void {
    this.initMap();
    //this.Punto();
  }

  async initMap() {
    this.map = L.map('map').setView([4.60575, -74.08198], 15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    L.marker([4.60575, -74.08198])
      .addTo(this.map)
      .bindPopup('ETITC')
      .openPopup();
    setTimeout(() => {
      this.map.invalidateSize();
    }, 100);
  }

  async Punto() {
    try {
      const point = await Geolocation.getCurrentPosition();

      console.log('Ubicación:', point);

      const lat = point.coords.latitude;
      const lng = point.coords.longitude;

      this.map.setView([lat, lng], 15);

      L.marker([lat, lng])
        .addTo(this.map)
        .bindPopup('Ubicación actual')
        .openPopup();
    } catch (error) {
      console.error('Error obteniendo ubicación:', error);
    }
  }
}
