"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getProducts } from "@/services/product/product.service";
import { orderProduct } from "@/services/order/order.service";
import { Product } from "@/types/product";
import { Order } from "@/types/order";

export default function Home() {
  const { data: session } = useSession();
  const [products, setProducts] = useState<Product[]>([]);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderFailed, setOrderFailed] = useState(false);
  const [quantityIsNull, setQuantityIsNull] = useState(false);
  const [quantities, setQuantities] = useState<Record<string, string>>({});

  const isAuthenticated = !!session?.user;

  useEffect(() => {
    if (isAuthenticated) {
      getProducts()
        .then((products) => {
          setProducts(products);
          const initialQuantities = Object.fromEntries(
            products.map((p) => [p.id ?? p.name ?? `product-${p.name}`, ""])
          );
          setQuantities(initialQuantities);
        })
        .catch(() => setProducts([]));
    }
  }, [isAuthenticated]);

  const handleOrder = async (product: Product) => {
    const key = product.id ?? product.name ?? `product-${product.name}`;
    const quantity = quantities[key];
    setOrderSuccess(false);
    setOrderFailed(false);
    setQuantityIsNull(false);

    if (!quantity) {
      setQuantityIsNull(true);
      setOrderFailed(true);
      return;
    }

    const order: Order = {
      skuCode: product.name,
      price: product.price,
      quantity: Number(quantity),
      userDetails: {
        email: session?.user?.email || "",
        firstName: (session?.user as any)?.firstName || "",
        lastName: (session?.user as any)?.lastName || "",
      },
    };

    try {
      await orderProduct(order);
      setOrderSuccess(true);
    } catch (error) {
      setOrderFailed(true);
    }
  };

  return (
    <main className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Products ({products.length})</h1>
        {isAuthenticated && (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 ml-4"
            onClick={() => (window.location.href = "/add-product")}
          >
            Create Product
          </button>
        )}
      </div>

      {products.length > 0 ? (
        <>
          {orderSuccess && (
            <h4 className="text-green-500 font-bold">Order Placed Successfully</h4>
          )}
          {orderFailed && (
            <>
              <h4 className="text-red-500 font-bold">Order Failed, please try again later</h4>
              {quantityIsNull && (
                <h4 className="text-red-500 font-bold">Quantity cannot be null</h4>
              )}
            </>
          )}
          <ul className="list-disc list-inside">
            {products.map((product) => {
              const key = product.id ?? product.name ?? `product-${product.name}`;
              return (
                <li
                  key={key}
                  className="mb-2 p-4 bg-gray-100 rounded-lg shadow-sm flex justify-between items-center"
                >
                  <div>
                    <span className="font-semibold">{product.name}</span> -
                    <span className="text-gray-600"> Price: {product.price}</span>
                    <br />
                    <span>
                      Quantity:
                      <input
                        type="number"
                        className="ml-2 px-2 py-1 border rounded"
                        value={quantities[key] || ""}
                        onChange={(e) =>
                          setQuantities({
                            ...quantities,
                            [key]: e.target.value,
                          })
                        }
                      />
                    </span>
                  </div>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 ml-4"
                    onClick={() => handleOrder(product)}
                  >
                    Order Now
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <p className="text-red-500 font-semibold">No products found!</p>
      )}
    </main>
  );
}