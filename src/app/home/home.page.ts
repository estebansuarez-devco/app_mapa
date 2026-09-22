import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import * as L from 'leaflet';
import { PUNTOS, PuntoInteres } from './puntos-interes';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage implements AfterViewInit {
  private map!: L.Map;
  private ubicacionUsuario!: {
    lat: number;
    lng: number;
  };

  private rutaActual?: L.Polyline;
  private marcadoresPuntos: L.Marker[] = [];

  private iconoUsuario = L.icon({
    iconUrl: 'assets/icon/marker.png',
    iconSize: [30, 40],
    iconAnchor: [15, 40],
    popupAnchor: [0, -40],
  });

  private iconosPorTipo: Record<PuntoInteres['tipo'], L.Icon> = {
    cafeteria: L.icon({
      iconUrl: 'assets/icon/cafe.png',
      iconSize: [30, 30],
    }),

    biblioteca: L.icon({
      iconUrl: 'assets/icon/book.png',
      iconSize: [30, 30],
    }),

    parque: L.icon({
      iconUrl: 'assets/icon/parque.png',
      iconSize: [30, 30],
    }),
    universidad: L.icon({
      iconUrl: 'assets/icon/universidad.jpg',
      iconSize: [35, 35],
    }),
    universidadN: L.icon({
      iconUrl: 'assets/icon/universidadN.jpg',
      iconSize: [35, 35],
    }),
    universidadD: L.icon({
      iconUrl: 'assets/icon/universidadD.png',
      iconSize: [35, 35],
    }),
  };

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

    //marcador de la ETITC

    /*L.marker([4.60575, -74.08198])
      .addTo(this.map)
      .bindPopup('ETITC')
      .openPopup();*/

    //PUNTOS interes
    PUNTOS.forEach((p) => {
      const marker = L.marker([p.lat, p.lng], {
        icon: this.iconosPorTipo[p.tipo],
      }).addTo(this.map).bindPopup(`
      <strong>${p.nombre}</strong><br>
      ${p.tipo}
    `);

      marker.on('click', () => {
        this.trazarRuta(p.lat, p.lng);
      });

      this.marcadoresPuntos.push(marker);
    });

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

      //Guardar ubicacion del usuario
      this.ubicacionUsuario = {
        lat,
        lng,
      };

      PUNTOS.forEach((p, index) => {
        const distancia = this.calcularDistancia(lat, lng, p.lat, p.lng);

        const distanciaTexto =
          distancia < 1000
            ? `${distancia.toFixed(0)} m`
            : `${(distancia / 1000).toFixed(2)} km`;

        this.marcadoresPuntos[index].bindPopup(`<strong>${p.nombre}</strong>
          <br>${p.tipo}
          <br>Distancia: ${distanciaTexto}
`);
      });

      //centrar mapa
      this.map.setView([lat, lng], 15);

      //marcador del usuario
      L.marker([lat, lng], {
        icon: this.iconoUsuario,
      })
        .addTo(this.map)
        .bindPopup('Ubicación actual')
        .openPopup();
    } catch (error) {
      console.error('Error obteniendo ubicación:', error);
    }
  }

  private calcularDistancia(
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number,
  ): number {
    const R = 6371e3; // Radio de la Tierra en metros

    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;

    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lng2 - lng1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) ** 2 +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  private async obtenerRuta(
    origenLat: number,
    origenLng: number,
    destinoLat: number,
    destinoLng: number,
  ): Promise<L.LatLng[]> {
    const url =
      `https://router.project-osrm.org/route/v1/foot/` +
      `${origenLng},${origenLat};${destinoLng},${destinoLat}` +
      `?overview=full&geometries=geojson`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data.routes || data.routes.length === 0) {
      throw new Error('No se encontró una ruta');
    }

    return data.routes[0].geometry.coordinates.map((coord: [number, number]) =>
      L.latLng(coord[1], coord[0]),
    );
  }

  async trazarRuta(destinoLat: number, destinoLng: number) {
    try {
      if (!this.ubicacionUsuario) {
        console.warn('Primero debes presionar Localizar');
        return;
      }

      const coordenadas = await this.obtenerRuta(
        this.ubicacionUsuario.lat,
        this.ubicacionUsuario.lng,
        destinoLat,
        destinoLng,
      );

      // Eliminar ruta anterior
      if (this.rutaActual) {
        this.map.removeLayer(this.rutaActual);
      }

      // Dibujar nueva ruta
      this.rutaActual = L.polyline(coordenadas, {
        color: '#3388ff',
        weight: 5,
        opacity: 0.8,
      }).addTo(this.map);

      // Ajustar el mapa para mostrar toda la ruta
      this.map.fitBounds(this.rutaActual.getBounds(), {
        padding: [50, 50],
      });
    } catch (error) {
      console.error('Error trazando ruta:', error);
    }
  }
}
