
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-7xl px-6">

      {/* HERO SECTION */}
      <section className="flex min-h-[75vh] flex-col items-center justify-center gap-8 py-16 text-center">

        <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
          Tecnología para tu día a día
        </span>

        <div className="max-w-3xl space-y-5">

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-6xl">
            Descubre la tecnología
            <span className="block text-blue-600">
              que conecta contigo.
            </span>
          </h1>

          <p className="mx-auto max-w-xl text-base leading-7 text-gray-500 md:text-lg">
            Explora nuestra selección de productos tecnológicos
            y encuentra lo que necesitas para tu día a día.
          </p>

        </div>

        {/* BOTÓN AL CATÁLOGO */}
        <Link
          href="/productos"
          className="rounded-lg bg-blue-600 px-8 py-4 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Explorar productos
        </Link>

      </section>

      {/* MENSAJE INFERIOR */}
      <section className="border-t border-gray-200 py-10 text-center">

        <h2 className="text-lg font-semibold text-gray-900">
          Tecnología. Diseño. Experiencia.
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Bienvenido a Liss Store.
        </p>

      </section>

    </main>
  );
}
