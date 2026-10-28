@echo off
title Learning Analytics Dashboard - Tapi Diploma Engineering College
echo ====================================================================
echo Starting Learning Analytics Dashboard
echo ====================================================================

:: Open http://localhost:5000 in your browser
start "" "http://localhost:5000/"

:: Fallback direct file opening if server is stopped
if errorlevel 1 (
  start "" "%~dp0index.html"
)

echo Dashboard opened in browser: http://localhost:5000/
