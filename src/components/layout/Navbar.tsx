
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const updateCartCount = () => {
            try {
                const savedCart = localStorage.getItem("liss-store-cart");

                if (!savedCart) {
                    setCartCount(0);
                    return;
                }

                const cart = JSON.parse(savedCart);

                const total = Array.isArray(cart)
                    ? cart.reduce(
                        (sum, item) => sum + (Number(item.quantity) || 0),
                        0
                    )
                    : 0;

                setCartCount(total);
            } catch (error) {
                console.error("Error al leer el carrito:", error);
                setCartCount(0);
            }
        };

        updateCartCount();

        window.addEventListener("storage", updateCartCount);
        window.addEventListener("cart-updated", updateCartCount);

        return () => {
            window.removeEventListener("storage", updateCartCount);
            window.removeEventListener("cart-updated", updateCartCount);
        };
    }, []);

    return (
        <header className="w-full border-b border-gray-200 bg-white">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

                {/* LOGO */}
                <Link
                    href="/"
                    className="text-2xl font-bold tracking-tight text-gray-900"
                >
                    LISS STORE<span className="text-blue-600">.</span>
                </Link>

                {/* ENLACES */}
                <div className="flex items-center gap-6">

                    <Link
                        href="/"
                        className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
                    >
                        Inicio
                    </Link>

                    <Link
                        href="/productos"
                        className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
                    >
                        Productos
                    </Link>

                    <Link
                        href="/carrito"
                        className="flex items-center gap-2 text-sm font-medium text-gray-700 transition hover:text-blue-600"
                    >
                        <span>Carrito</span>

                        <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-blue-600 px-2 text-xs font-semibold text-white">
                            {cartCount}
                        </span>
                    </Link>

                </div>
            </nav>
        </header>
    );
}
