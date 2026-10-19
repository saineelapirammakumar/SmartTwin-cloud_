# SmartTwin Cloud - Frontend (React + Vite)

React dashboard for **SmartTwin Cloud: A Smart City Monitoring Platform for Tamil Nadu**.
Every page loads its data from the FastAPI backend - nothing is hardcoded. Sensor readings shown are **simulated demo data**, and the dashboard says so on every page.

## Pages
| Page | What it shows |
|---|---|
| Overview | Statewide totals, online/offline sensors, air/water/waste/traffic conditions, all 38 districts, open alerts; button to generate new simulated readings |
| Locations | Browse District → City/Town → Zone; add cities, zones and sensors |
| Sensors | Searchable, filterable list; click a sensor for details, a 24-hour chart and a test-reading form |
| Alerts | Open/resolved alerts, resolve button, editable alert limits |
| Monitoring charts | Hourly charts for air, water, waste and traffic (Recharts) |
| Image upload | Upload to the backend (stored in S3), view and delete files |
| Cloud status | Live backend, PostgreSQL, S3 and EC2 checks, and an S3 upload/download test |

The District / City / Zone selector at the top of most pages applies everywhere.

## Run on Windows
1. Install [Node.js LTS](https://nodejs.org/) (version 18 or newer) and VS Code.
2. Extract the ZIP, open the folder in VS Code and open a terminal.
3. Install and configure:
```powershell
npm install
copy .env.example .env
```
4. Start the **backend first** (see the backend README), then:
```powershell
npm run dev
```
Open http://localhost:5173.

## Connect to the backend
Edit `.env`:
```
VITE_API_BASE_URL=http://localhost:8000          # backend on your PC
VITE_API_BASE_URL=http://YOUR_EC2_PUBLIC_IP      # backend on AWS EC2
```
Restart `npm run dev` after changing `.env`. The current address is shown at the bottom of the left menu and on the Cloud status page.

If the page says *Cannot reach the backend*, check that the backend is running and that the address is right. If the browser console shows a CORS error, add this frontend's address to `CORS_ORIGINS` in the backend `.env` and restart the backend.

## Production build
```powershell
npm run build
```
Creates the `dist` folder. (Hosting the built frontend is not part of this project; if you host it on an `https://` address, the backend must also be served over `https://`.)

## Project layout
```
src/
├── main.jsx, App.jsx        Start-up, menu and page routes
├── api.js                   All backend calls + the useFetch hook (reads VITE_API_BASE_URL)
├── LocationContext.jsx      Remembers the selected district/city/zone
├── format.js                Date, size and colour helpers
├── components/              LocationFilter, small UI pieces
├── pages/                   One file per page
└── styles.css
```
There are no AWS keys in the frontend. All AWS access happens in the backend through the EC2 IAM role.

## Verification status of this delivery
| Item | Status |
|---|---|
| JSX/JavaScript syntax of all source files; every import resolves | Checked |
| `npm install`, `npm run build`, running in a browser | **Not run by the author** - the build environment had no internet access. Run `npm run build` on your PC; if it reports an error, send it for a fix. |
| Dashboard receiving real backend data | **Not tested end to end** (backend could not be started in the build environment) |
