import Link from 'next/link';

const teachers = [
    { id: 'sara-hassan', name: 'Sara Hassan', subject: 'Mathematics', rating: '4.9' },
    { id: 'omar-nabil', name: 'Omar Nabil', subject: 'Physics', rating: '4.8' },
    { id: 'maya-khaled', name: 'Maya Khaled', subject: 'Programming', rating: '5.0' },
];

export default function TeachersPage() {
    return (
        <main className="min-h-screen px-6 py-20 text-white">
            <div className="mx-auto max-w-6xl space-y-10">
                <div className="space-y-3">
                    <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Our Teachers</p>
                    <h1 className="text-4xl font-semibold sm:text-5xl">Meet the mentors behind the experience</h1>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {teachers.map((teacher) => (
                        <Link
                            key={teacher.id}
                            href={`/teachers/${teacher.id}`}
                            className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6"
                        >
                            <p className="text-sm text-cyan-400">{teacher.subject}</p>
                            <h2 className="mt-3 text-2xl font-semibold">{teacher.name}</h2>
                            <p className="mt-3 text-slate-300">Rated {teacher.rating} by learners</p>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
