@echo off
rem Maven Wrapper for Windows

setlocal

set MAVEN_OPTS=-Xmx1024m -XX:MaxPermSize=256m

set MAVEN_HOME=%~dp0\.mvn\wrapper\maven-3.8.1
set MAVEN_BIN=%MAVEN_HOME%\bin

if not exist "%MAVEN_BIN%\mvn" (
    echo "Maven not found. Please run mvnw to download Maven."
    exit /b 1
)

"%MAVEN_BIN%\mvn" %* 

endlocal