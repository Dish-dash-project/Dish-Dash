import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Search, AlertCircle, Navigation, Globe } from 'lucide-react';


const API_KEY = "AIzaSyB5gnUWjb84t6klt5vcPjMOQylhQRFB5Wc";

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

interface Coordinates {
  lat: number;
  lng: number;
}

interface Place {
  name: string;
  address: string;
  coordinates: Coordinates;
}

function HomePage() {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string>('');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Google Maps Script
    const loadGoogleMapsScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    };

    // Initialize map
    window.initMap = () => {
      if (!mapRef.current) return;

      const newMap = new window.google.maps.Map(mapRef.current, {
        center: { lat: 0, lng: 0 },
        zoom: 2,
        styles: [
          {
            featureType: "all",
            elementType: "labels.text.fill",
            stylers: [{ color: "#333333" }]
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#e9e9e9" }]
          },
          {
            featureType: "landscape",
            elementType: "geometry",
            stylers: [{ color: "#f5f5f5" }]
          }
        ]
      });

      setMap(newMap);

      if (searchInputRef.current) {
        const autocomplete = new window.google.maps.places.Autocomplete(searchInputRef.current, {
          types: ['country', 'locality', 'administrative_area_level_1'],
        });

        autocomplete.addListener('place_changed', () => {
          setIsLoading(true);
          const place = autocomplete.getPlace();
          
          if (!place.geometry) {
            setError('No details available for this place');
            setIsLoading(false);
            return;
          }

          const newLocation = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          };

          setSelectedPlace({
            name: place.name,
            address: place.formatted_address || '',
            coordinates: newLocation
          });

          // Smooth pan to location
          newMap.panTo(newLocation);
          
          const zoomLevel = place.types?.includes('country') ? 5 : 10;
          newMap.setZoom(zoomLevel);

          // Clear existing markers
          if (window.currentMarker) {
            window.currentMarker.setMap(null);
          }

          // Add new marker
          window.currentMarker = new window.google.maps.Marker({
            map: newMap,
            position: newLocation,
            title: place.name,
            animation: window.google.maps.Animation.DROP,
            icon: {
              url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
              scaledSize: new window.google.maps.Size(40, 40)
            }
          });

          setIsLoading(false);
        });
      }
    };

    loadGoogleMapsScript();

    return () => {
      // Cleanup
      window.initMap = () => {};
      const script = document.querySelector('script[src*="maps.googleapis.com/maps/api"]');
      if (script) {
        script.remove();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-800 flex items-center justify-center gap-3">
            <Globe className="text-yellow-500 h-8 w-8" />
            Location Explorer
          </h1>
          <p className="text-gray-600">Discover places around the world</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Search Panel */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
              {/* Search Input */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="text-yellow-500 h-6 w-6" />
                  <h2 className="text-xl font-semibold text-gray-800">Search Location</h2>
                </div>
                
                <div className="relative">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter a country or city name..."
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 pl-12 
                             focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 
                             transition-all duration-300"
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-red-400 mt-0.5" />
                    <p className="ml-3 text-sm text-red-700">{error}</p>
                  </div>
                </div>
              )}

              {/* Selected Place Info */}
              {selectedPlace && (
                <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                  <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    <Navigation className="h-5 w-5 text-yellow-500" />
                    Location Details
                  </h3>
                  <div className="space-y-2">
                    <p className="text-gray-700">
                      <span className="font-medium">Name:</span> {selectedPlace.name}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Address:</span> {selectedPlace.address}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <p className="text-gray-700">
                        <span className="font-medium">Latitude:</span>
                        <br />
                        {selectedPlace.coordinates.lat.toFixed(6)}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Longitude:</span>
                        <br />
                        {selectedPlace.coordinates.lng.toFixed(6)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Map Container */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div ref={mapRef} id="map" className="w-full h-[600px]" />
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-500"></div>
        </div>
      )}
    </div>
  );
}

export default HomePage;