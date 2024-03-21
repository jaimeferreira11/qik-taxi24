
Tengo un proyecto para crear APIS para la industria del transporte, como uber. Me ayudas a modelor los datos y a confeccionar las urls para cada API requerida. Usando typescrip

Conductores
    - Obtener una lista de todos los conductores
    - Obtener una lista de todos los conductores disponibles
    - Obtener una lista de toodos los conductores disponibles en un radio de 3 km para una ubicacion especifica
    - Obtener un conductor especifico por ID

Viajes
    - Crear una nueva solicitud de "Viaje" asignando un conductor a un piloto
    - Completar un viaje
    - Obtener una lista de todos los viajes activos

Pasajeros
    - Obtener una lista de todos los pasajeros
    - Obtener un pasajero especifico por su ID
    - Para un pasajero solicitando un viaje, obtener una lista de los 3 conductores msa cercanos al punto de partida.



typescript
```
interface Driver {
    id: number;
    name: string;
    available: boolean;
    location: { latitude: number, longitude: number };
}

interface Trip {
    id: number;
    driverId: number;
    passengerId: number;
    status: 'pending' | 'in_progress' | 'completed';
}

interface Passenger {
    id: number;
    name: string;
    currentLocation: { latitude: number, longitude: number };
}

const URLs = {
    conductores: {
        obtenerTodos: '/api/conductores', // GET
        obtenerDisponibles: '/api/conductores/disponibles', // GET
        obtenerCercanos: '/api/conductores/cercanos', // GET
        obtenerPorId: (id: number) => `/api/conductores/${id}` // GET
    },
    viajes: {
        crear: '/api/viajes', // POST
        completar: (id: number) => `/api/viajes/${id}/completar`, // PUT
        obtenerActivos: '/api/viajes/activos' // GET
    },
    pasajeros: {
        obtenerTodos: '/api/pasajeros', // GET
        obtenerPorId: (id: number) => `/api/pasajeros/${id}`, // GET
        obtenerConductoresCercanosAlPuntoDePartida: '/api/pasajeros/conductores-cercanos' // GET
    }
};

// En ingles
const URLs = {
    drivers: {
        getAll: '/api/drivers',
        getAvailable: '/api/drivers/available',
        getNearby: '/api/drivers/nearby',
        getById: (id: number) => `/api/drivers/${id}`
    },
    trips: {
        create: '/api/trips',
        complete: (id: number) => `/api/trips/${id}/complete`,
        getActive: '/api/trips/active'
    },
    passengers: {
        getAll: '/api/passengers',
        getById: (id: number) => `/api/passengers/${id}`,
        getDriversNearStartingPoint: '/api/passengers/drivers-near-starting-point'
    }
};
```