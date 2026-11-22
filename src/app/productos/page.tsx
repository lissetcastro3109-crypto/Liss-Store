
import ProductCatalog from "@/components/products/ProductCatalog";

export default function ProductosPage() {
    return (
        <main className="mx-auto min-h-screen max-w-7xl px-6 py-12">

            {/* ENCABEZADO */}
            <section className="mb-10">

                <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                    Liss Store
                </p>

                <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                    Nuestros productos
                </h1>

                <p className="mt-3 max-w-2xl text-gray-500">
                    Descubre nuestra selección de productos tecnológicos.
                    Encuentra lo que necesitas en Liss Store.
                </p>

            </section>

            {/* CATÁLOGO */}
            <ProductCatalog />

        </main>
    );
}
