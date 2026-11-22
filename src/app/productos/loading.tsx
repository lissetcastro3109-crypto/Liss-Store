
export default function Loading() {
    return (
        <section className="mx-auto min-h-screen max-w-7xl px-6 py-12">

            <div className="mb-10 space-y-3">
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                <div className="h-10 w-64 animate-pulse rounded bg-gray-200" />
                <div className="h-5 w-80 animate-pulse rounded bg-gray-200" />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                    <div
                        key={item}
                        className="animate-pulse rounded-xl border border-gray-200 p-4"
                    >
                        <div className="h-52 rounded-lg bg-gray-200" />

                        <div className="mt-5 h-4 w-24 rounded bg-gray-200" />

                        <div className="mt-3 h-5 w-full rounded bg-gray-200" />

                        <div className="mt-3 h-5 w-20 rounded bg-gray-200" />

                        <div className="mt-5 h-11 w-full rounded-lg bg-gray-200" />
                    </div>
                ))}

            </div>
        </section>
    );
}
