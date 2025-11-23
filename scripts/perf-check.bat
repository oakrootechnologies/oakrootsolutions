@echo off
REM Performance Testing Script for Next.js Website (Windows)
REM Runs Lighthouse CI to measure Core Web Vitals and performance metrics
REM
REM Usage:
REM   scripts\perf-check.bat [url]
REM
REM Default URL: http://localhost:3000

setlocal

set URL=%1
if "%URL%"=="" set URL=http://localhost:3000

echo.
echo Performance Testing Script
echo ==============================
echo.
echo Testing URL: %URL%
echo.

REM Check if production server is running
echo Step 1: Checking if production server is running...
curl -s %URL% >nul 2>&1
if errorlevel 1 (
  echo Error: Production server is not running at %URL%
  echo.
  echo Please run:
  echo   npm run build
  echo   npm run start
  echo.
  echo Or start the server and run this script with a custom URL:
  echo   scripts\perf-check.bat http://localhost:3000
  exit /b 1
)

echo Server is running
echo.

REM Run Lighthouse CI
echo Step 2: Running Lighthouse CI...
echo.

npx @lhci/cli autorun ^
  --collect.url="%URL%" ^
  --collect.settings.emulatedFormFactor=mobile ^
  --collect.settings.throttling.cpuSlowdownMultiplier=4 ^
  --collect.settings.throttling.rttMs=150 ^
  --collect.settings.throttling.throughputKbps=1600 ^
  --collect.settings.screenEmulation.width=412 ^
  --collect.settings.screenEmulation.height=915 ^
  --collect.settings.screenEmulation.deviceScaleFactor=2.625 ^
  --collect.numberOfRuns=3 ^
  --upload.target=temporary-public-storage ^
  --assert.assertions.off=all ^
  --assert.assertions.presets=minimal

echo.
echo Lighthouse CI completed!
echo.
echo Target Metrics:
echo   - LCP (Largest Contentful Paint): ^< 2.5s
echo   - CLS (Cumulative Layout Shift): ^< 0.1
echo   - TBT (Total Blocking Time): ^< 150ms
echo   - FCP (First Contentful Paint): ^< 1.8s
echo.
echo Tips:
echo   - Check the Lighthouse report URL above for detailed metrics
echo   - Compare before/after scores to measure improvements
echo   - Run multiple times for consistent results
echo.

endlocal

