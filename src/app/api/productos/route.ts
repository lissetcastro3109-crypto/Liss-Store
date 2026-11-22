
import { Product } from "@/app/types/product";

export async function GET() {
    try {
        // 1. Obtener la URL desde las variables de entorno
        const API_URL = process.env.FAKE_STORE_API_URL;

        // 2. Verificar que exista la variable
        if (!API_URL) {
            return Response.json(
                { error: "La URL de Fake Store API no está configurada" },
                { status: 500 }
            );
        }

        // 3. Consultar únicamente los productos electrónicos
        const response = await fetch(
            `${API_URL}/products/category/electronics`,
            { cache: "no-store" }
        );

        // 4. Verificar la respuesta de la API externa
        if (!response.ok) {
            return Response.json(
                { error: "No fue posible obtener los productos" },
                { status: 502 }
            );
        }

        // 5. Convertir la respuesta a JSON
        const products: Product[] = await response.json();

        // 6. Devolver los productos
        return Response.json(products, { status: 200 });

    } catch (error) {
        // 7. Capturar errores inesperados
        console.error("Error en API de productos:", error);

        return Response.json(
            { error: "Error interno al consultar los productos" },
            { status: 500 }
        );
    }
}
