@echo off
setlocal enabledelayedexpansion

REM Loop through all PNG files in the current directory
for %%f in (*.png) do (
  REM Convert each PNG to WEBP while preserving transparency
  magick "%%f" -define webp:lossless=true "%%~nf.webp"
)

echo Conversion complete.
pause