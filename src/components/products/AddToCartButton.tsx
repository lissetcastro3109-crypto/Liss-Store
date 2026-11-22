
"use client";

import { useState } from "react";
import type { Product } from "@/types/product";

interface AddToCartButtonProps {
    product: Product;
}

interface CartItem {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
}

export default function AddToCartButton({
    product,
}: AddToCartButtonProps) {
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        try {
            const savedCart = localStorage.getItem("liss-store-cart");

            const cart: CartItem[] = savedCart
                ? JSON.parse(savedCart)
                : [];

            const existingProduct = cart.find(
                (item) => item.id === product.id
            );

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                    quantity: 1,
                });
            }

            localStorage.setItem(
                "liss-store-cart",
                JSON.stringify(cart)
            );

            window.dispatchEvent(new Event("cart-updated"));

            setAdded(true);

            setTimeout(() => {
                setAdded(false);
            }, 1500);

        } catch (error) {
            console.error("Error al agregar al carrito:", error);
        }
    };

    return (
        <button
            onClick={handleAddToCart}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
            {added ? "¡Agregado!" : "Agregar al carrito"}
        </button>
    );
}
