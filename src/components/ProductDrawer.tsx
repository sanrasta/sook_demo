import { useState } from 'react'
import { Product } from '../types'
import ProductCard from './ProductCard'
import Modal from './Modal'

// Hard-coded product data for demo
const DEMO_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 149.99,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
  },
  {
    id: '2',
    name: 'Smart Watch Series 5',
    price: 299.99,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
  },
  {
    id: '3',
    name: 'Leather Backpack',
    price: 89.99,
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
  },
  {
    id: '4',
    name: 'Portable Speaker',
    price: 79.99,
    imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
  },
]

interface ProductDrawerProps {
  selectedProduct?: Product | null
  onCloseModal?: () => void
}

/**
 * ProductDrawer displays a list of products with purchase modal
 * Can be controlled externally via props for flash deals
 */
function ProductDrawer({ selectedProduct: externalSelectedProduct, onCloseModal: externalOnCloseModal }: ProductDrawerProps = {}) {
  const [internalSelectedProduct, setInternalSelectedProduct] = useState<Product | null>(null)
  
  // Use external product if provided, otherwise use internal state
  const selectedProduct = externalSelectedProduct !== undefined ? externalSelectedProduct : internalSelectedProduct

  const handleBuyClick = (product: Product) => {
    if (externalSelectedProduct !== undefined) {
      // Externally controlled - this shouldn't happen but just in case
      return
    }
    setInternalSelectedProduct(product)
  }

  const handleConfirmPurchase = () => {
    console.log('Purchase confirmed for:', selectedProduct)
    if (externalOnCloseModal) {
      externalOnCloseModal()
    } else {
      setInternalSelectedProduct(null)
    }
  }

  const handleCloseModal = () => {
    if (externalOnCloseModal) {
      externalOnCloseModal()
    } else {
      setInternalSelectedProduct(null)
    }
  }

  return (
    <>
      <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-purple-500/20 rounded-lg overflow-hidden shadow-2xl">
        <div className="px-6 py-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200">
              Featured Products
            </h2>
            <div className="text-sm text-purple-300 bg-purple-900/30 px-3 py-1 rounded-full border border-purple-500/30">
              Live Deals
            </div>
          </div>
          
          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {DEMO_PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onBuyClick={() => handleBuyClick(product)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Purchase Confirmation Modal */}
      {selectedProduct && (
        <Modal onClose={handleCloseModal}>
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 max-w-md w-full mx-4 border-2 border-purple-500/30 shadow-2xl">
            <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200 mb-6">
              Confirm Purchase
            </h3>
            
            {/* Product Summary */}
            <div className="flex gap-4 mb-6 bg-slate-700/50 p-4 rounded-xl border border-purple-500/20">
              <img
                src={selectedProduct.imageUrl}
                alt={selectedProduct.name}
                className="w-24 h-24 object-cover rounded-lg shadow-lg"
              />
              <div className="flex-1">
                <h4 className="font-bold text-white mb-2 text-lg">
                  {selectedProduct.name}
                </h4>
                <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  ${selectedProduct.price.toFixed(2)}
                </p>
              </div>
            </div>

            <p className="text-purple-200 text-sm mb-6 text-center">
              This is a demo. No real payment will be processed.
            </p>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleConfirmPurchase}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-purple-500/50 transform hover:scale-105"
              >
                Confirm Purchase
              </button>
              <button
                onClick={handleCloseModal}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-4 rounded-xl transition-all duration-200 border border-slate-600 hover:border-slate-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}

export default ProductDrawer

