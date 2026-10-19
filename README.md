# SmartTwin Cloud - Backend (FastAPI + PostgreSQL + Amazon S3)

Backend for **SmartTwin Cloud: A Smart City Monitoring Platform for Tamil Nadu**.
It covers all 38 districts (Tamil Nadu → District → City/Town → Zone → Sensor) and provides the API used by the React dashboard.

> **All sensor readings are SIMULATED demo data.** The database marks every generated reading `is_simulated = true`, and the dashboard says so on every page.

## What is inside

```
SmartTwin_Cloud_Backend/
├── app/
│   ├── main.py            FastAPI app, CORS, connects the route files
│   ├── config.py          Settings from .env
│   ├── database.py        PostgreSQL connection
│   ├── models.py          Database tables
│   ├── schemas.py         Request bodies
│   ├── seed_data.py       38 districts + extra cities/towns + zone/sensor templates
│   ├── init_db.py         Creates tables and loads sample data
│   ├── simulator.py       Makes fake sensor values (no database code)
│   ├── services.py        Saves readings, creates alerts
│   ├── queries.py         Shared SQL helpers
│   ├── s3_storage.py      Amazon S3 (boto3) or local-folder storage
│   └── routes/            dashboard, locations, sensors, alerts, files, system
├── scripts/smoke_test.py  Tests the main endpoints against a running server
├── deploy/                systemd + nginx + IAM policy files for EC2
├── docs/AWS_EC2_S3_GUIDE.md   Step-by-step AWS Console guide (read the costs section first)
├── requirements.txt
└── .env.example
```

Sample data created by `init_db`: 38 districts, 83 cities/towns, 249 zones, 996 sensors (4 per zone: air, water, waste, traffic), and 24 hours of simulated readings. About 8% of sensors start offline.
District names are the 38 districts of Tamil Nadu. **Coordinates are approximate** (for display only) - verify against an official source before real-world use.

## Run on your Windows PC

### 1. Install
- [Python 3.12](https://www.python.org/downloads/) - tick **Add python.exe to PATH** in the installer.
- [PostgreSQL](https://www.postgresql.org/download/windows/) - remember the password you set for the `postgres` user.
- [VS Code](https://code.visualstudio.com/).

### 2. Create the database
Open **SQL Shell (psql)** from the Start menu (press Enter for the defaults, then type your password) and run:
```sql
CREATE DATABASE smarttwin;
```
(Or create a database named `smarttwin` in pgAdmin.)

### 3. Set up the project
Extract the ZIP, open the folder in VS Code, open a terminal (**Terminal > New Terminal**) and run:
```powershell
python -m venv venv
venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy .env.example .env
```
If PowerShell refuses to activate: run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once, then try again.

Open `.env` and set your database password in `DATABASE_URL`. Keep `STORAGE_MODE=local` for now.

### 4. Create tables and sample data
```powershell
python -m app.init_db
```
(`python -m app.init_db --reset` deletes everything and starts again.)

### 5. Start the API
```powershell
uvicorn app.main:app --reload
```
- Health check: http://localhost:8000/health
- Interactive API docs: http://localhost:8000/docs

### 6. Test it
In a second terminal (with the venv activated):
```powershell
python scripts/smoke_test.py
```
It prints PASS/FAIL for every endpoint, an image upload, retrieval, and delete.

## Where uploaded files go
| `STORAGE_MODE` | Files are stored in | Use for |
|---|---|---|
| `local` | the `local_uploads` folder on your PC | developing without AWS |
| `s3` | your **private** Amazon S3 bucket | the real deployment |

The Cloud status page and every uploaded file show which mode is active, so local mode can never be mistaken for S3.
In S3 mode: the bucket stays private, files are encrypted (SSE-S3), the database stores only the file's details, and the dashboard receives a **temporary 15-minute link** to view a file. AWS permissions come from the **EC2 IAM role**; there are no AWS keys in the code, `.env` or frontend.

## Deploy to AWS
Follow **`docs/AWS_EC2_S3_GUIDE.md`**. It starts with the expected charges, then walks through the budget alert, S3 bucket, IAM role, EC2 launch, PostgreSQL install, systemd service, nginx, tests, logs and clean-up.

Quick reference once deployed (on the server):
```bash
sudo systemctl status smarttwin --no-pager     # is it running?
sudo systemctl restart smarttwin               # restart
sudo journalctl -u smarttwin -f                # live logs
curl http://localhost/health                   # health check
```

## API summary (full details at /docs)
| Area | Endpoints |
|---|---|
| Health | `GET /health`, `GET /api/cloud/status`, `POST /api/cloud/s3-test` |
| Dashboard | `GET /api/dashboard/summary`, `GET /api/dashboard/districts`, `POST /api/simulate` |
| Locations | `GET /api/districts`, `GET/POST /api/cities`, `GET/POST /api/zones` |
| Sensors | `GET/POST /api/sensors`, `GET /api/sensors/{id}`, `PATCH /api/sensors/{id}/status` |
| Readings | `GET/POST /api/sensors/{id}/readings`, `GET /api/history` |
| Alerts | `GET /api/alerts`, `POST /api/alerts/{id}/resolve`, `GET/PUT /api/thresholds` |
| Files | `POST /api/files/upload`, `GET /api/files`, `GET /api/files/{id}`, `GET /api/files/{id}/url`, `DELETE /api/files/{id}` |

Most list endpoints accept `district_id`, `city_id` and `zone_id` filters.

### Adding more places and sensors
Use the dashboard's **Locations** page, or the API (PowerShell example):
```powershell
Invoke-RestMethod -Method Post -Uri http://localhost:8000/api/cities -ContentType "application/json" `
  -Body '{"district_id": 36, "name": "Pernambut", "kind": "Town"}'
```
Cities, zones and sensors you add are stored in PostgreSQL like the sample data. To change the starting data itself, edit `app/seed_data.py` and run `python -m app.init_db --reset`.

## Security notes
- `.env` is never committed or zipped; `.env.example` contains no secrets.
- Uploads accept only JPG/PNG/WebP/GIF/PDF, up to 5 MB, and the file's first bytes must match its type.
- On EC2 only ports 22 (your IP only) and 80 are open; PostgreSQL and the API port are private.
- This is a student demo: there is **no user login**. Do not put real private data in it, and add authentication before any public use.

## Verification status of this delivery
Be honest in your report and presentation about what was and was not tested:

| Item | Status |
|---|---|
| Python syntax of every backend file | Checked (compiles) |
| 38 unique district names, seed-data integrity, simulator value ranges | Checked by running the seed and simulator code |
| FastAPI server start, API endpoints, PostgreSQL connection, `init_db` | **Not run by the author** - the build environment had no internet, PostgreSQL or Python packages. Run `scripts/smoke_test.py` on your PC to verify. |
| S3 upload/retrieval, EC2 deployment | **Not tested** - no AWS account access was available. Implemented as described; verify with the guide's Part 9. |

If a smoke-test line fails, the error message printed beside it says what went wrong.
