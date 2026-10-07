"use client";
import { MapContainer, Marker, TileLayer, ZoomControl } from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

const position: [number, number] = [6.45363, 3.44568];

const DIRECTIONS_URL =
  "https://www.google.com/maps/search/?api=1&query=The+Wheatbaker+Ikoyi+Lagos";

const wheatbakerIcon = L.divIcon({
  className: "wheatbaker-marker",
  html: `
    <div class="marker-wrap">
      <div class="marker-pulse"></div>
      <div class="marker-pulse marker-pulse-delay"></div>

      <div class="marker-core">
        <div class="marker-dot"></div>
      </div>
    </div>
  `,
  iconSize: [54, 54],
  iconAnchor: [27, 27],
});

export default function VenueMapClient() {
  return (
    <div className="venue-map">
      <MapContainer
        center={position}
        zoom={16}
        scrollWheelZoom={false}
        zoomControl={false}
        dragging={true}
        doubleClickZoom={true}
        touchZoom={true}
        className="leaflet-map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ZoomControl position="bottomright" />

        <Marker position={position} icon={wheatbakerIcon} />
      </MapContainer>

      <div className="map-top">
        <div className="location-status">
          <span className="status-dot" />
          <span>IKOYI · LAGOS</span>
        </div>
      </div>

      <a
        href={DIRECTIONS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="directions-button"
      >
        <span>Get directions</span>

        <span className="arrow">↗</span>
      </a>

      <div className="map-credit">© OpenStreetMap contributors</div>

      <style jsx global>{`
        .venue-map {
          position: relative;
          width: 100%;
          height: 500px;
          overflow: hidden;
          border-radius: 24px;
          background: #eef5fa;
          box-shadow: 0 30px 70px rgba(8, 54, 114, 0.1),
            0 5px 15px rgba(8, 54, 114, 0.04);
        }

        .leaflet-map {
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .leaflet-tile-pane {
          filter: saturate(0.72) contrast(0.96);
        }

        .leaflet-control-zoom {
          border: none !important;
          box-shadow: 0 8px 25px rgba(8, 54, 114, 0.14) !important;
          overflow: hidden;
          border-radius: 10px !important;
          margin-right: 18px !important;
          margin-bottom: 18px !important;
        }

        .leaflet-control-zoom a {
          width: 34px !important;
          height: 34px !important;
          line-height: 34px !important;
          border: none !important;
          background: #ffffff !important;
          color: #083672 !important;
          font-family: "Mont", sans-serif !important;
          font-size: 18px !important;
          font-weight: 200 !important;
          transition: background 0.25s ease, color 0.25s ease;
        }

        .leaflet-control-zoom a:hover {
          background: #c6e3fb !important;
          color: #0067d4 !important;
        }

        .leaflet-control-zoom a:first-child {
          border-radius: 10px 10px 0 0 !important;
        }

        .leaflet-control-zoom a:last-child {
          border-radius: 0 0 10px 10px !important;
        }

        .wheatbaker-marker {
          background: transparent !important;
          border: none !important;
        }

        .marker-wrap {
          position: relative;
          width: 54px;
          height: 54px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .marker-pulse {
          position: absolute;
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: rgba(0, 103, 212, 0.2);
          animation: venueMarkerPulse 2.5s ease-out infinite;
        }

        .marker-pulse-delay {
          animation-delay: 1.25s;
        }

        .marker-core {
          position: relative;
          z-index: 3;
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #083672;
          border: 3px solid #ffffff;
          box-shadow: 0 6px 18px rgba(8, 54, 114, 0.3),
            0 0 0 5px rgba(198, 227, 251, 0.55);
        }

        .marker-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #c6e3fb;
        }

        .map-top {
          position: absolute;
          z-index: 500;
          top: 20px;
          left: 20px;
        }

        .location-status {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 9px 13px;
          border-radius: 100px;
          background: #083672;
          box-shadow: 0 10px 25px rgba(8, 54, 114, 0.2);
        }

        .location-status span:last-child {
          color: #ffffff;
          font-family: "Chillen", sans-serif;
          font-size: 9px;
          font-weight: 400;
          letter-spacing: 0.12em;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #c6e3fb;
          box-shadow: 0 0 0 4px rgba(198, 227, 251, 0.16);
        }

        .directions-button {
          position: absolute;
          z-index: 500;
          right: 20px;
          bottom: 20px;

          display: flex;
          align-items: center;
          gap: 14px;

          min-height: 48px;
          padding: 0 8px 0 18px;

          border-radius: 100px;
          background: #ffffff;
          color: #083672;

          font-family: "Chillen", sans-serif;
          font-size: 12px;
          font-weight: 400;

          text-decoration: none;

          box-shadow: 0 14px 35px rgba(8, 54, 114, 0.18);

          transition: background 0.25s ease, color 0.25s ease,
            transform 0.25s ease, box-shadow 0.25s ease;
        }

        .directions-button:hover {
          background: #c6e3fb;
          color: #083672;
          transform: translateY(-3px);
          box-shadow: 0 18px 40px rgba(8, 54, 114, 0.22);
        }

        .arrow {
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #0067d4;
          color: #ffffff;
          font-family: Arial, sans-serif;
          font-size: 16px;
          transition: transform 0.25s ease;
        }

        .directions-button:hover .arrow {
          transform: translate(2px, -2px);
        }

        .map-credit {
          position: absolute;
          z-index: 500;
          left: 10px;
          bottom: 8px;

          padding: 3px 6px;

          border-radius: 4px;
          background: rgba(255, 255, 255, 0.8);

          color: #555555;
          font-family: "Mont", sans-serif;
          font-size: 8px;
          font-weight: 200;
        }

        @keyframes venueMarkerPulse {
          0% {
            transform: scale(0.3);
            opacity: 0.75;
          }

          70% {
            transform: scale(1.15);
            opacity: 0;
          }

          100% {
            transform: scale(1.15);
            opacity: 0;
          }
        }

        @media (max-width: 850px) {
          .venue-map {
            height: 430px;
          }
        }

        @media (max-width: 600px) {
          .venue-map {
            height: 350px;
            border-radius: 20px;
          }

          .map-top {
            top: 16px;
            left: 16px;
          }

          .directions-button {
            right: 16px;
            bottom: 16px;
          }

          .leaflet-control-zoom {
            margin-right: 14px !important;
            margin-bottom: 14px !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .marker-pulse {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
