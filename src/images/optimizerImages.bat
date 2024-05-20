@echo off
setlocal enabledelayedexpansion

REM Loop through all WEBP files in the current directory
for %%f in (*.webp) do (
  REM Optimize each WEBP image
  magick "%%f" -resize 150x150^> -define webp:method=6 "optimized_%%f"
)

echo Optimization complete.
pause