# Start HTTP server on port 5000
$serverProcess = Start-Process -NoNewWindow -FilePath "npx" -ArgumentList "http-server src -p 5000" -PassThru

# Wait for server to start
Start-Sleep -Seconds 3

try {
    # Run Cypress tests
    cd "c:\Users\hasan\Downloads\Intelligent Registration System + Automation"
    npx cypress run --spec "cypress/e2e/registration.cy.js"
} finally {
    # Stop the server
    Stop-Process -Id $serverProcess.Id -Force -ErrorAction SilentlyContinue
}
