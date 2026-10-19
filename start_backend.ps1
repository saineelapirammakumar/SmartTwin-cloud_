$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot
if (-not (Test-Path '.venv')) { python -m venv .venv }
& .\.venv\Scripts\python.exe -m pip install --upgrade pip
& .\.venv\Scripts\python.exe -m pip install -r requirements.txt
if (-not (Test-Path '.env')) { Copy-Item '.env.example' '.env' }
Write-Host 'Initialising database and sample data...' -ForegroundColor Cyan
& .\.venv\Scripts\python.exe -m app.init_db
if ($LASTEXITCODE -ne 0) { throw 'Database initialisation failed. Check the output above.' }
Write-Host 'Starting SmartTwin Cloud API at http://127.0.0.1:8000' -ForegroundColor Green
& .\.venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
