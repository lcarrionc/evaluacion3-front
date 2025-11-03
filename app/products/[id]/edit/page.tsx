"use client";

import { useEffect, useState } from "react";
import { getProductById, updateProduct } from "@/services/productService";
import { useRouter } from "next/navigation";

type Params = { id: string };

export default function EditProduct({ params }: { params: Promise<Params> }) {
  const router = useRouter();

  const [id, setId] = useState<string>("");
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
  });

  useEffect(() => {
    async function unwrap() {
      const p = await params;
      setId(p.id);
    }
    unwrap();
  }, [params]);

  useEffect(() => {
    if (!id) return;

    async function loadProduct() {
      const product = await getProductById(id);
      setForm({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
      });
    }

    loadProduct();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProduct(Number(id), form);
    router.push(`/products/${id}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2">
            Editar Videojuego
          </h1>
          <p className="text-gray-400">Modifica la información del producto</p>
        </div>

        {!id ? (
          /* Estado de carga */
          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-12">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
              </div>
              <p className="text-xl text-gray-400 font-semibold">Cargando datos...</p>
            </div>
          </div>
        ) : (
          /* Formulario */
          <form 
            className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 shadow-2xl shadow-purple-500/10"
            onSubmit={handleSubmit}
          >
            <div className="space-y-6">
              {/* Nombre */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Nombre del videojuego
                </label>
                <input
                  type="text"
                  className="w-full bg-slate-900/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Ej: The Legend of Zelda"
                  required
                />
              </div>

              {/* Descripción */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                  Descripción
                </label>
                <textarea
                  rows={4}
                  className="w-full bg-slate-900/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Descripción detallada del videojuego..."
                  required
                />
              </div>

              {/* Precio y Stock en grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Precio */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Precio
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400 font-bold text-lg">$</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      className="w-full bg-slate-900/50 border border-emerald-500/30 rounded-lg pl-8 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: +e.target.value })}
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>

                {/* Stock */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    Stock disponible
                  </label>
                  <input
                    type="number"
                    min="0"
                    className="w-full bg-slate-900/50 border border-blue-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: +e.target.value })}
                    placeholder="0"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-4 mt-8 pt-6 border-t border-purple-500/20">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 px-6 py-3 bg-slate-700/50 text-gray-300 font-semibold rounded-lg border border-slate-600/50 hover:bg-slate-700 hover:text-white transition-all duration-300"
              >
                Cancelar
              </button>
              
              <button
                type="submit"
                className="flex-1 group relative px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Guardar Cambios
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}