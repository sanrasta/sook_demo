import clsx from 'clsx';

interface ProductCardProps {
    className?: string;
    title?: string;
    price?: string;
    image?: string;
    onBuy?: () => void;
}

export default function ProductCard({
    className,
    title = "Limited Edition Hoodie",
    price = "$49.99",
    image,
    onBuy
}: ProductCardProps) {
    return (
        <div className={clsx(
            "bg-black/40 backdrop-blur-md border border-white/10 p-4 rounded-2xl text-white w-72 shadow-xl transition-all hover:scale-105",
            className
        )}>
            <div className="aspect-square bg-gray-800 rounded-xl mb-3 overflow-hidden relative">
                {image ? (
                    <img src={image} alt={title} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                        No Image
                    </div>
                )}
            </div>
            <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-lg leading-tight">{title}</h3>
                <span className="font-mono text-green-400 font-bold">{price}</span>
            </div>
            <p className="text-xs text-gray-400 mb-3">Only 3 left in stock!</p>
            <button
                onClick={onBuy}
                className="w-full bg-white text-black font-bold py-2.5 rounded-xl hover:bg-gray-200 transition active:scale-95"
            >
                Buy Now
            </button>
        </div>
    );
}
