@echo off
cd /d "%~dp0"

echo Starting Vite preview...
start "" cmd /k "npm run preview"

timeout /t 3 >nul
start "Backend" "java" -jar "D:\IdeaProjects\dg-backend\target\dg-backend-0.0.1-SNAPSHOT.jar"

timeout /t 3 >nul

echo Starting Cloudflared tunnel...
start "" cmd /k "D:\IdeaProjects\cloudflared-windows-amd64.exe tunnel --config C:\Users\MAleksandr\.cloudflared\config.yml run"
