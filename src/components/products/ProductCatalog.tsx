
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Product } from "@/types/product";
import AddToCartButton from "./AddToCartButton";

export default function ProductCatalog() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const getProducts = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch("/api/productos");

                if (!response.ok) {
                    throw new Error("No se pudieron obtener los productos");
                }

                const data: Product[] = await response.json();

                setProducts(data);

            } catch (error) {
                console.error("Error al cargar productos:", error);

                setError(
                    "No pudimos cargar los productos. Intenta nuevamente."
                );

            } finally {
                setLoading(false);
            }
        };

        getProducts();
    }, []);

    // ESTADO DE CARGA
    if (loading) {
        return (
            <div className="py-20 text-center">
                <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />

                <p className="mt-4 text-gray-500">
                    Cargando productos...
                </p>
            </div>
        );
    }

    // ESTADO DE ERROR
    if (error) {
        return (
            <div className="py-20 text-center">
                <p className="text-lg font-semibold text-gray-900">
                    ¡Ups! Algo salió mal.
                </p>

                <p className="mt-2 text-gray-500">
                    {error}
                </p>

                <button
                    onClick={() => window.location.reload()}
                    className="mt-5 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                >
                    Intentar nuevamente
                </button>
            </div>
        );
    }

    // CATÁLOGO VACÍO
    if (products.length === 0) {
        return (
            <div className="py-20 text-center">
                <p className="text-gray-500">
                    No hay productos disponibles actualmente.
                </p>
            </div>
        );
    }

    // LISTADO DE PRODUCTOS
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {products.map((product) => (
                <article
                    key={product.id}
                    className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white p-4 transition hover:-translate-y-1 hover:shadow-lg"
                >

                    {/* IMAGEN */}
                    <Link href={`/productos/${product.id}`}>
                        <div className="flex h-52 items-center justify-center bg-white p-4">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="h-full w-full object-contain"
                            />
                        </div>
                    </Link>

                    {/* INFORMACIÓN */}
                    <div className="flex flex-1 flex-col pt-4">

                        <p className="text-xs font-medium uppercase tracking-wide text-blue-600">
                            {product.category}
                        </p>

                        <Link href={`/productos/${product.id}`}>
                            <h2 className="mt-2 line-clamp-2 min-h-12 font-semibold text-gray-900 hover:text-blue-600">
                                {product.title}
                            </h2>
                        </Link>

                        <p className="mt-3 text-xl font-bold text-gray-900">
                            ${product.price.toFixed(2)}
                        </p>

                        <p className="mt-2 text-sm text-gray-500">
                            ⭐ {product.rating.rate} ({product.rating.count} opiniones)
                        </p>

                        <div className="mt-auto pt-5">
                            <AddToCartButton product={product} />
                        </div>

                    </div>
                </article>
            ))}

        </div>
    );
}
