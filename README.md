# OceanGuard Eye

Ocean water quality monitoring web application for the Gulf of Thailand. Built for PTTEP Teenergy project.

## About

OceanGuard Eye monitors water quality across 5 zones in the Gulf of Thailand, tracking key environmental indicators including dissolved oxygen, pH levels, temperature, chlorophyll, turbidity, and E. coli bacteria levels.

## Features

- Interactive satellite map with real-time zone markers
- Dashboard overview with zone status and alerts
- Notifications page with search and severity filtering
- Water quality metrics visualization
- Real/Chlorophyll view modes

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- Leaflet (maps)
- React Router

## Getting Started

```bash
git clone https://github.com/OceanGuard-Eye/oceanguard-frontend.git
cd oceanguard-frontend
npm install
npm run dev
```

Open http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
  components/     TargetCard, TargetDetail, SearchBar, FilterChip, etc.
  layouts/        RootLayout (app shell)
  pages/          MapPage, TargetPage, NotificationsPage
  routes/         AppRouter
  utils/          formatters
```

## Routes

- /map - Dashboard overview
- /target - Interactive satellite map
- /notifications - Alert list with filters

## License

MIT
