export type Category = 'Electronics' | 'Clothing' | 'Grocery' | 'Other';

export interface Product {
    id : string ;
    name : string;
    price : number;
    category : Category;
    createAt : string;
    updatedAt: string;
}
