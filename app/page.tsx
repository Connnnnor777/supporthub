export default function Home() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
            <div className="text-center">
                <h1 className="text-6xl font-bold">
                    SupportHub
                </h1>

                <p className="mt-4 text-xl text-slate-400">
                    AI-Powered Obsidian Knowledge Platform
                </p>

                <div className="mt-8 flex justify-center gap-4">
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