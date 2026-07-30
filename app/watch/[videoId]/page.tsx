type WatchPageProps = {
    params: Promise<{ videoId: string }>;
};

export default async function WatchPage({ params }: WatchPageProps) {
    const { videoId } = await params;

    return (
        <main className="min-h-screen px-6 py-20 text-white">
            <div className="mx-auto max-w-5xl rounded-3xl border border-slate-800 bg-slate-900/70 p-10">
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Watch</p>
                <h1 className="mt-3 text-4xl font-semibold">Video: {videoId}</h1>
                <p className="mt-4 text-lg text-slate-300">Embed the player and related content here.</p>
            </div>
        </main>
    );
}
