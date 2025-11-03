import { getProductById, deleteProduct } from "@/services/productService";
import { redirect } from "next/navigation";
import Link from "next/link";

type Props = { params: Promise<{ id: string }> };

export default async function ProductDetail({ params }: Props) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
        <div className="text-center p-12 bg-slate-800/50 backdrop-blur-sm border border-red-500/30 rounded-xl">
          <svg className="w-24 h-24 mx-auto text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-2xl font-bold text-red-400">Producto no encontrado</p>
        </div>
      </main>
    );
  }

  async function handleDelete() {
    "use server";
    await deleteProduct(Number(id));
    redirect("/products");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Botón de regreso */}
        <Link 
          href="/products"
          className="inline-flex items-center gap-2 mb-6 text-cyan-400 hover:text-cyan-300 transition-colors duration-300 group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="font-semibold">Volver a la lista</span>
        </Link>

        {/* Contenedor principal */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/20">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            
            {/* Columna izquierda - Imagen */}
            <div className="relative group">
              <div className="relative overflow-hidden rounded-xl border-2 border-purple-500/30 group-hover:border-purple-500/60 transition-all duration-300">
                <img 
                  src={product.image_url} 
                  alt={product.name}
                  className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                
                {/* Efecto de brillo */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-cyan-500/10 via-purple-500/10 to-pink-500/10"></div>
              </div>
              
              {/* Badge decorativo */}
              <div className="absolute top-4 right-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg shadow-lg backdrop-blur-sm">
                <svg className="w-5 h-5 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Premium
              </div>
            </div>

            {/* Columna derecha - Información */}
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-4 leading-tight">
                  {product.name}
                </h1>
                
                <p className="text-gray-300 text-lg leading-relaxed mb-6 border-l-4 border-purple-500/50 pl-4">
                  {product.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {/* Precio */}
                  <div className="bg-gradient-to-br from-emerald-900/40 to-emerald-800/20 border border-emerald-500/30 rounded-xl p-4">
                    <p className="text-emerald-400/70 text-sm font-semibold mb-1">Precio</p>
                    <p className="text-3xl font-bold text-emerald-400">${product.price}</p>
                  </div>

                  {/* Stock */}
                  <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 border border-blue-500/30 rounded-xl p-4">
                    <p className="text-blue-400/70 text-sm font-semibold mb-1">Stock disponible</p>
                    <p className="text-3xl font-bold text-blue-400">{product.stock}</p>
                  </div>
                </div>

                {/* Indicador de disponibilidad */}
                <div className="flex items-center gap-2 mb-6">
                  <div className={`w-3 h-3 rounded-full ${product.stock > 0 ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`}></div>
                  <span className={`text-sm font-semibold ${product.stock > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {product.stock > 0 ? 'Disponible ahora' : 'Agotado'}
                  </span>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex gap-4">
                <Link
                  href={`/products/${product.id}/edit`}
                  className="flex-1 group relative px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-lg shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Editar
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>

                <form action={handleDelete} className="flex-1">
                  <button
                    type="submit"
                    className="w-full group relative px-6 py-3 bg-gradient-to-r from-red-600 to-rose-700 text-white font-semibold rounded-lg shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:scale-105 transition-all duration-300 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Eliminar
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-rose-700 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}