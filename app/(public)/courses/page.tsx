import Link from 'next/link';

const courses = [
    { id: 'physics-101', title: 'Physics 101', level: 'Beginner', duration: '6 weeks' },
    { id: 'math-masterclass', title: 'Math Masterclass', level: 'Intermediate', duration: '8 weeks' },
    { id: 'coding-bootcamp', title: 'Coding Bootcamp', level: 'Advanced', duration: '10 weeks' },
];

export default function CoursesPage() {
    return (
        <main className="min-h-screen px-6 py-20 text-white">
            <div className="mx-auto max-w-6xl space-y-10">
                <div className="space-y-3">
                    <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Explore Courses</p>
                    <h1 className="text-4xl font-semibold sm:text-5xl">Choose a course that fits your goals</h1>
                    <p className="max-w-2xl text-lg text-slate-300">
                        Browse interactive classes, recorded sessions, and guided practice paths for every stage of learning.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {courses.map((course) => (
                        <Link
                            key={course.id}
                            href={`/courses/${course.id}`}
                            className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg transition hover:border-cyan-400/60"
                        >
                            <p className="text-sm text-cyan-400">{course.level}</p>
                            <h2 className="mt-3 text-2xl font-semibold">{course.title}</h2>
                            <p className="mt-3 text-slate-300">{course.duration} • Live support • Certificate included</p>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
