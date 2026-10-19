$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot
if (-not (Test-Path '.env')) { Copy-Item '.env.example' '.env' }
if (-not (Test-Path 'node_modules')) { npm install }
Write-Host 'Starting SmartTwin Cloud frontend at http://localhost:5173' -ForegroundColor Green
npm run dev -- --host 127.0.0.1
