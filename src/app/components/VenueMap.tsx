"use client";
import dynamic from "next/dynamic";
import Spinner from "./Spinner.component";

const VenueMapClient = dynamic(() => import("./VenueMapClient"), {
  ssr: false,

  loading: () => (
    <div className="venue-map-loading">
      <Spinner size={30} thickness={2} />
    </div>
  ),
});

export default function VenueMap() {
  return (
    <>
      <VenueMapClient />

      <style jsx>{`
        .venue-map-loading {
          width: 100%;
          height: 500px;

          display: flex;
          align-items: center;
          justify-content: center;

          border: 1px solid #c6e3fb;
          border-radius: 24px;

          background: radial-gradient(
              circle at 50% 35%,
              rgba(0, 103, 212, 0.08),
              transparent 38%
            ),
            #f7faff;
        }

        @media (max-width: 850px) {
          .venue-map-loading {
            height: 430px;
          }
        }

        @media (max-width: 600px) {
          .venue-map-loading {
            height: 350px;
            border-radius: 20px;
          }
        }
      `}</style>
    </>
  );
}
