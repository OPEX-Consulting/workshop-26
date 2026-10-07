# OPEX Executive Workshop & Summit 2026

A premium executive workshop and summit website built for the **OPEX Executive Workshop & Summit 2026**.

The website provides event information, programme details, sessions, invitee information, venue location, FAQs, registration links and contact information in a responsive and professional interface.

## Event

**OPEX Executive Workshop & Summit 2026**

- **Date:** Wednesday, 21 October 2026
- **Venue:** The Wheatbaker, Ikoyi, Lagos
- **Audience:** Finance, Technology, Risk, Compliance and Audit leaders
- **Registration:** External OPEX registration platform

## Technologies Used

- **Next.js** — React framework for the website
- **React** — Component-based user interface
- **TypeScript** — Type-safe development
- **Styled Components** — Component-level styling
- **Leaflet** — Interactive map functionality
- **React Leaflet** — React integration for Leaflet
- **OpenStreetMap** — Map data and tiles
- **Next.js Image** — Image optimization
- **Vercel** — Deployment and hosting
- **Git & GitHub** — Version control and source code management

## Main Features

- Responsive desktop and mobile design
- Premium executive-focused UI
- Hero section with event information
- Event programme and agenda
- Finance Executive Workshop information
- C-Level Summit information
- Invitee/organization section
- Interactive OpenStreetMap venue map
- FAQ accordion
- QR code registration
- Registration CTAs
- Clickable phone and email links
- Google Maps directions
- Responsive navigation and mobile menu
- Accessibility improvements
- Reduced-motion support
- Next.js image optimization

## Project Structure

```text
app/
├── components/
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Result.tsx
│   ├── Sessions.tsx
│   ├── Agenda.tsx
│   ├── Invitee.component.tsx
│   ├── Venue.tsx
│   ├── VenueMap.tsx
│   ├── VenueMapClient.tsx
│   ├── Faq.tsx
│   ├── Marquee.component.tsx
│   └── Footer.tsx
│
├── page.tsx
└── globals.css

public/
└── images/
```

## OpenStreetMap Integration

The venue section uses **OpenStreetMap** with **Leaflet** and **React Leaflet**.

The map provides:

- The Wheatbaker location
- Custom venue marker
- Zoom controls
- Location popup
- Responsive map layout
- OpenStreetMap attribution

The Leaflet map is loaded as a client-side component to prevent server-side `window is undefined` errors during Next.js rendering.

## Installation

Clone the repository and install the dependencies:

```bash
npm install
```

Install the map dependencies:

```bash
npm install leaflet react-leaflet
```

Install Leaflet types:

```bash
npm install -D @types/leaflet
```

## Development

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Production Build

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Deployment

The website is deployed using **Vercel**.

Deployment process:

1. Push the project to GitHub.
2. Connect the GitHub repository to Vercel.
3. Configure the project settings.
4. Deploy the application.
5. Vercel automatically builds and hosts the website.

### Environment variables

| Name | Purpose |
| --- | --- |
| `REGISTRATION_SHEET_ENDPOINT` | Apps Script web-app URL that receives registrations (see `.env.example`). Read at build time and inlined by `next.config.ts`; the form refuses to submit without it. `NEXT_PUBLIC_REGISTRATION_SHEET_ENDPOINT` also works and takes precedence. |

The Apps Script source is `AppsScript-Code.gs`; setup and Workspace migration notes are in `AppsScript-Workspace-Migration-README.md`.

### Rollback

The previous Vite site is tagged `legacy-vite-v1`. To roll back, use Vercel's Instant Rollback to the last pre-cutover deployment, or revert the cutover merge.

## Performance

Performance improvements include:

- Next.js optimized images
- Priority loading for the main Hero image
- Responsive image sizing
- Server-rendered page content
- Optimized client-side map loading
- Reduced unnecessary animations
- Reduced-motion support

## Accessibility

The website includes:

- Semantic HTML
- Descriptive image alt text
- Accessible navigation
- Keyboard focus states
- FAQ ARIA attributes
- Responsive layouts
- Improved text/background contrast
- Reduced-motion support

## License

This project was developed for **OPEX Consulting** and is intended for the OPEX Executive Workshop & Summit 2026.
