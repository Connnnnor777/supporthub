##############################################################
# SupportHub Bootstrap
##############################################################

$Project = "C:\CUSTOM\supporthub"

if (!(Test-Path $Project)) {
    Write-Host "Project not found: $Project" -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "Bootstrapping SupportHub..."
Write-Host ""

##############################################################
# Create folders
##############################################################

$Folders = @(
"app\dashboard",
"app\products",
"app\customers",
"app\knowledge",
"app\sops",
"app\reports",
"app\settings",

"components\layout",
"components\navigation",
"components\dashboard",
"components\search",
"components\providers",

"hooks",

"lib\vault",
"lib\search",
"lib\ai",

"types",

"scripts",

"docs"
)

foreach ($Folder in $Folders) {

    $Path = Join-Path $Project $Folder

    if (!(Test-Path $Path)) {
        New-Item -ItemType Directory -Force -Path $Path | Out-Null
        Write-Host "Created $Folder"
    }
}

##############################################################
# Function to create placeholder page
##############################################################

function New-Page {

param(
[string]$Folder,
[string]$Title
)

$File = Join-Path $Project "app\$Folder\page.tsx"

if (!(Test-Path $File)) {

@"
export default function Page() {
    return (
        <main className="p-10">
            <h1 className="text-4xl font-bold">$Title</h1>
        </main>
    )
}
"@ | Set-Content $File

Write-Host "Created $Folder page"

}

}

##############################################################
# Pages
##############################################################

New-Page "dashboard" "Dashboard"

New-Page "products" "Products"

New-Page "customers" "Customers"

New-Page "knowledge" "Knowledge Base"

New-Page "sops" "Standard Operating Procedures"

New-Page "reports" "Reports"

New-Page "settings" "Settings"

##############################################################
# Replace Home Page
##############################################################

$HomePage = @"
export default function Home() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">

            <div className="text-center">

                <h1 className="text-6xl font-bold">
                    SupportHub
                </h1>

                <p className="mt-4 text-slate-400 text-xl">
                    AI-Powered Obsidian Knowledge Platform
                </p>

                <div className="mt-8 flex gap-4 justify-center">

                    <a
                        href="/dashboard"
                        className="rounded-lg bg-blue-600 px-6 py-3 hover:bg-blue-700"
                    >
                        Dashboard
                    </a>

                    <a
                        href="/knowledge"
                        className="rounded-lg border border-slate-700 px-6 py-3 hover:bg-slate-800"
                    >
                        Knowledge Base
                    </a>

                </div>

            </div>

        </main>
    )
}
"@

$HomePage | Set-Content "$Project\app\page.tsx"

##############################################################
# README
##############################################################

$Readme = @"
# SupportHub

## Pages

/dashboard

/products

/customers

/knowledge

/sops

/reports

/settings

## Next Step

Build the application shell:

- Sidebar
- Header
- Search
- Dashboard Widgets
- Obsidian Vault Indexer
"@

$Readme | Set-Content "$Project\README.md"

##############################################################
# VS Code Settings
##############################################################

if (!(Test-Path "$Project\.vscode")) {
    New-Item -ItemType Directory "$Project\.vscode" | Out-Null
}

@"
{
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
        "source.fixAll": "always"
    }
}
"@ | Set-Content "$Project\.vscode\settings.json"

##############################################################

Write-Host ""
Write-Host "======================================" -ForegroundColor Green
Write-Host "SupportHub Bootstrap Complete!" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Green
Write-Host ""

Write-Host "Run:"
Write-Host ""
Write-Host "    cd $Project"
Write-Host "    npm run dev"
Write-Host ""

Write-Host "Then visit:"
Write-Host "http://localhost:3000"