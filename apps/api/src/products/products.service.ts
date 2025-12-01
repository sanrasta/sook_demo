import { Injectable } from '@nestjs/common';

export interface Product {
    id: string;
    title: string;
    price: string;
    image: string;
    talkingPoints: string[];
}

@Injectable()
export class ProductsService {
    private products: Product[] = [
        {
            id: 'prod_1',
            title: 'Limited Edition Hoodie',
            price: '$49.99',
            image: 'https://images.unsplash.com/photo-1556906781-9a412961d28c?q=80&w=2000&auto=format&fit=crop',
            talkingPoints: [
                'Hand-stitched in Italy.',
                'Made from 100% organic cotton.',
                'Only 50 units available worldwide.',
                'Machine washable and durable.',
            ],
        },
        {
            id: 'prod_2',
            title: 'Vintage Denim Jacket',
            price: '$89.99',
            image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=2000&auto=format&fit=crop',
            talkingPoints: [
                'Authentic 90s vintage.',
                'Perfectly distressed look.',
                'Unisex fit.',
                'Pairs well with the hoodie.',
            ],
        },
        {
            id: 'prod_3',
            title: 'Urban Cargo Pants',
            price: '$65.00',
            image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=2000&auto=format&fit=crop',
            talkingPoints: [
                'Multiple functional pockets.',
                'Water-resistant fabric.',
                'Adjustable waistband.',
                'Great for skating or hiking.',
            ],
        },
    ];

    getAllProducts(): Product[] {
        return this.products;
    }

    getProductById(id: string): Product | undefined {
        return this.products.find((p) => p.id === id);
    }
}
