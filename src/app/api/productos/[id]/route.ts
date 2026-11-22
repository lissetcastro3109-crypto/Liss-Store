
import type { Product } from "@/app/types/product";

interface RouteContext {
    params: Promise<{ id: string }>;
}

export async function GET(
    request: Request,
    { params }: RouteContext
) {
    try {
        const { id } = await params;

        // Validar el ID
        if (!/^\d+$/.test(id) || Number(id) < 1) {
            return Response.json(
                { error: "Identificador de producto inválido" },
                { status: 400 }
            );
        }

        // Obtener la URL de la API
        const API_URL = process.env.FAKE_STORE_API_URL;

        if (!API_URL) {
            return Response.json(
                { error: "La API no está configurada" },
                { status: 500 }
            );
        }

        // Consultar el producto individual
        const response = await fetch(
            `${API_URL}/products/${id}`,
            { cache: "no-store" }
        );

        if (response.status === 404) {
            return Response.json(
                { error: "Producto no encontrado" },
                { status: 404 }
            );
        }

        if (!response.ok) {
            return Response.json(
                { error: "Error al consultar el producto" },
                { status: 502 }
            );
        }

        const product: Product = await response.json();

        return Response.json(product, { status: 200 });

    } catch (error) {
        console.error("Error al consultar producto:", error);

        return Response.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}
