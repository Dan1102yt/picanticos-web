@echo off
cd /d "%~dp0"
echo Instalando dependencias...
call npm install --no-audit --no-fund || (echo. & echo ERROR instalando dependencias. & pause & exit /b 1)
echo Compilando la web...
call npm run build || (echo. & echo ERROR en el build: no se publico nada. & pause & exit /b 1)
git add -A
set /p MSG=Describe el cambio (Enter = "actualizacion web"): 
if "%MSG%"=="" set MSG=actualizacion web
git commit -m "%MSG%"
git push || (echo. & echo ERROR al subir a GitHub. & pause & exit /b 1)
echo.
echo Listo. La web se actualiza en unos 2 minutos (recarga con Ctrl+F5).
pause
