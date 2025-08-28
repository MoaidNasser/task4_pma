export type Category = 'Electronics' | 'Clothing' | 'Grocery' | 'Other';

export interface Product {
    id: string;
    name: string;
    price: number;
    discontinued: boolean;
    UnitsInStock: number;
    createdAt: string;
    category: Category | null;
    SupplierID: number;
    description: string;
    updatedAt: string;
}

