export type Category = 'Electronics' | 'Clothing' | 'Grocery' | 'Other';

export interface Product {
    id : string ;
    name : string;
    price : number;
    discontinued: boolean;
    UnitsInStock : number;
    createdAt: Date;
    category : Category;
}
