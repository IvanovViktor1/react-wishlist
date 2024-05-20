@echo off
for %%f in (*.webp) do magick "%%f" -resize 150x150 "%%f"
@REM изменение размера