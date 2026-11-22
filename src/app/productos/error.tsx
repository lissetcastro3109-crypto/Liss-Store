
"use client";

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function ProductosError({
    error,
    reset,
}: ErrorProps) {
    return (
        <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">

            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-3xl">
                !
            </div>

            <h2 className="text-2xl font-bold text-gray-900">
                No pudimos cargar esta sección
            </h2>

            <p className="mt-3 max-w-md text-gray-500">
                Ocurrió un problema inesperado al mostrar los productos.
                Puedes intentarlo nuevamente.
            </p>

            <button
                onClick={() => reset()}
                className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
                Intentar nuevamente
            </button>

            <p className="mt-4 text-xs text-gray-400">
                {error.digest ? `Código de error: ${error.digest}` : ""}
            </p>

        </section>
    );
}
