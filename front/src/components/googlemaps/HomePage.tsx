import React, { useState, useEffect, useCallback } from 'react';

declare global {
  interface Window {
    google: any;
  }
}
import { MapPin, Navigation, AlertCircle } from 'lucide-react';

interface Coordinates {
  lat: number;
  lng: number;
}

function App() {
  const [origin, setOrigin] = useState<Coordinates>({ lat: 40.7128, lng: -74.0060 });
  const [destination, setDestination] = useState<Coordinates>({ lat: 34.0522, lng: -118.2437 });
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const initMap = () => {
      if (!window.google) {
        setTimeout(initMap, 100);
        return;
      }

      const mapElement = document.getElementById('map');
      if (!mapElement) return;

      const newMap = new google.maps.Map(mapElement, {
        center: { lat: 39.8283, lng: -98.5795 },
        zoom: 4,
        styles: [
          {
            featureType: "all",
            elementType: "labels.text.fill",
            stylers: [{ color: "#333333" }]
          }
        ]
      });

      const renderer = new google.maps.DirectionsRenderer({
        map: newMap,
        suppressMarkers: false,
        preserveViewport: false
      });

      setMap(newMap);
      setDirectionsRenderer(renderer);
    };

    initMap();
  }, []);

  const calculateRoute = useCallback(() => {
    if (!map || !directionsRenderer) return;

    setError('');

    if (!isValidCoordinate(origin.lat, origin.lng) || !isValidCoordinate(destination.lat, destination.lng)) {
      setError('Please enter valid coordinates. Latitude must be between -90 and 90, longitude between -180 and 180.');
      return;
    }

    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
        optimizeWaypoints: true,
        provideRouteAlternatives: true,
        drivingOptions: {
          departureTime: new Date(),
          trafficModel: google.maps.TrafficModel.BEST_GUESS
        }
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          directionsRenderer.setDirections(result);
        } else {
          let errorMessage = 'An error occurred while calculating the route.';
          
          switch (status) {
            case google.maps.DirectionsStatus.ZERO_RESULTS:
              errorMessage = 'No driving route found between these points. Please ensure both locations are accessible by road and not separated by water bodies.';
              break;
            case google.maps.DirectionsStatus.NOT_FOUND:
              errorMessage = 'One or both locations could not be found. Please verify the coordinates.';
              break;
            case google.maps.DirectionsStatus.OVER_QUERY_LIMIT:
              errorMessage = 'Too many requests. Please try again later.';
              break;
            case google.maps.DirectionsStatus.REQUEST_DENIED:
              errorMessage = 'Route request was denied. Please verify the coordinates are on land and accessible by road.';
              break;
            case google.maps.DirectionsStatus.INVALID_REQUEST:
              errorMessage = 'Invalid route request. Please check your coordinates.';
              break;
          }
          
          setError(errorMessage);
          console.error('Error calculating route:', status);
        }
      }
    );
  }, [map, directionsRenderer, origin, destination]);

  const isValidCoordinate = (lat: number, lng: number): boolean => {
    return !isNaN(lat) && !isNaN(lng) && 
           lat >= -90 && lat <= 90 && 
           lng >= -180 && lng <= 180;
  };

  const handleCoordinateChange = (
    type: 'origin' | 'destination',
    coord: 'lat' | 'lng',
    value: string
  ) => {
    const numValue = parseFloat(value);
    if (type === 'origin') {
      setOrigin(prev => ({ ...prev, [coord]: numValue }));
    } else {
      setDestination(prev => ({ ...prev, [coord]: numValue }));
    }
    setError('');
  };

  const CoordinateInput = ({ 
    label, 
    icon, 
    coordinates, 
    type 
  }: { 
    label: string; 
    icon: React.ReactNode; 
    coordinates: Coordinates; 
    type: 'origin' | 'destination' 
  }) => (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        {icon}
        <h2 className="text-lg md:text-xl font-semibold">{label}</h2>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="relative">
          <input
            type="number"
            step="any"
            value={coordinates.lat}
            onChange={(e) => handleCoordinateChange(type, 'lat', e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pl-24"
            placeholder="-90 to 90"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
            Latitude:
          </span>
        </div>
        <div className="relative">
          <input
            type="number"
            step="any"
            value={coordinates.lng}
            onChange={(e) => handleCoordinateChange(type, 'lng', e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pl-24"
            placeholder="-180 to 180"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
            Longitude:
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Google Maps Navigation</h1>
        
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-6 bg-white p-4 md:p-6 rounded-lg shadow-md">
            <CoordinateInput
              label="Starting Point"
              icon={<MapPin className="text-blue-500" />}
              coordinates={origin}
              type="origin"
            />

            <CoordinateInput
              label="Destination"
              icon={<Navigation className="text-red-500" />}
              coordinates={destination}
              type="destination"
            />

            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-400 mt-0.5" />
                  <p className="ml-3 text-sm text-red-700">{error}</p>
                </div>
              </div>
            )}

            <button
              onClick={calculateRoute}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Calculate Route
            </button>
          </div>

          <div className="h-[400px] md:h-[600px] bg-white rounded-lg shadow-md overflow-hidden">
            <div id="map" className="w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;