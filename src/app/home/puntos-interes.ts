export interface PuntoInteres {
  nombre: string;
  tipo: 'cafeteria' | 'biblioteca' | 'parque' | 'universidad' |'universidadN' |'universidadD';
  lat: number;
  lng: number;
}

export const PUNTOS: PuntoInteres[] = [
  {//1
    nombre: 'Café Pasaje',
    tipo: 'cafeteria',
    lat: 4.60105, 
    lng: -74.07271,
  },
  {//16
    nombre: 'San Moritz Café',
    tipo: 'cafeteria',
    lat: 4.60241, 
    lng: -74.07056,
  },
  {//17
    nombre: 'Café Ibáñez',
    tipo: 'cafeteria',
    lat: 4.59547,
    lng: -74.07278,
  },
  {//2
    nombre: 'El Tintal',
    tipo: 'biblioteca',
    lat: 4.64325,
    lng: -74.15515,
  },
  {//3
    nombre: 'BOSA',
    tipo: 'biblioteca',
    lat: 4.63254,
    lng: -74.20079,
  },
  {//4
    nombre: 'Lago Timiza',
    tipo: 'biblioteca',
    lat: 4.60964, 
    lng: -74.1581,
  },
  {//5
    nombre: 'Venecia',
    tipo: 'biblioteca',
    lat: 4.59281,
    lng: -74.14093,
  },
  {//6
    nombre: 'Carlos E.Restrepo',
    tipo: 'biblioteca',
    lat: 4.58439,
    lng: -74.10305,
  },
  {//7
    nombre: 'La Peña',
    tipo: 'biblioteca',
    lat: 4.58779,
    lng: -74.06676,
  },
  {//8
    nombre: 'La Victoria',
    tipo: 'biblioteca',
    lat: 4.55382, 
    lng: -74.09462,
  },
  {//9
    nombre: 'Néstor Forero Alcalá',
    tipo: 'biblioteca',
    lat: 4.60598,
    lng: -74.10329,
  },
  {//10
    nombre: 'Julio Mario Santo Domingo',
    tipo: 'biblioteca',
    lat: 4.75672, 
    lng: -74.06235,
  },
  {//11
    nombre: 'Virgilio Barco',
    tipo: 'biblioteca',
    lat: 4.65740,
    lng: -74.08811,
  },
  {//12
    nombre: 'Simón Bolívar',
    tipo: 'parque',
    lat: 4.65931, 
    lng: -74.09272,
  },
  {//13
    nombre: 'Mundo Aventura',
    tipo: 'parque',
    lat: 4.62111, 
    lng: -74.13459,
  },
  {//14
    nombre: 'Parque de los Novios',
    tipo: 'parque',
    lat: 4.65535, 
    lng: -74.08113,
  },
  {//15
    nombre: 'ETITC',
    tipo: 'universidad',
    lat: 4.60601,
    lng: -74.08152,
  },
  {//18
    nombre: 'ETITC sede tintal',
    tipo: 'universidad',
    lat: 4.65481,
    lng: -74.16214,
  },
  {//19
    nombre: 'Nacional',
    tipo: 'universidadN',
    lat: 4.63717,
    lng: -74.07966,
  },
  {//20
    nombre: 'Distrital Centro',
    tipo: 'universidadD',
    lat: 4.62792, 
    lng: -74.06594,
  },
];