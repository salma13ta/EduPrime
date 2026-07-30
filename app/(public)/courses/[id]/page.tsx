type CourseDetailPageProps = {
    params: Promise<{ id: string }>;
};

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
    const { id } = await params;

    return (
        <main className="min-h-screen px-6 py-20 text-white">
            <div className="mx-auto max-w-4xl rounded-3xl border border-slate-800 bg-slate-900/70 p-10">
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Course Preview</p>
                <h1 className="mt-3 text-4xl font-semibold">Course: {id}</h1>
                <p className="mt-4 text-lg text-slate-300">
                    This dynamic course page is ready for deeper content, curriculum details, and enrollment actions.
                </p>
            </div>
        </main>
    );
}
