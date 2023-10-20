export interface Product {
    id: string;
    name: string;
    description?: string | null;
    images: string[];
    price?: number | null;
    discount?: number | null;
    code?: number | null;
    stock?: number | null;
    salesCount: number;
    features?: string | null;
    tags: string;
    Manufacturer?: string | null;
    isFeatured: boolean;
    isArchived: boolean;
    createdAt: Date;
    updatedAt: Date;
    createdBy: Store;
    storeId: string;
    reviews: Review[];
    categories: Category[];
    cartItem?: CartItem | null;
    orderItem?: OrderItem | null;
    colors: Color[];
    sizes: Size[];
    eventId: string;
    events: SaleEvent;
}

export interface Color {
    id: string;
    name: string;
    value: string;
    availability?: boolean | null;
    price?: number | null;
    imageUrl?: string | null;
    description?: string | null;
    createdAt: Date;
    updatedAt: Date;
    products: Product[];
}

export interface Size {
    id: string;
    name: string;
    value: number;
    description?: string | null;
    availability?: boolean | null;
    price?: number | null;
    createdAt: Date;
    updatedAt: Date;
    products: Product[];
}

export interface Cart {
    id: string;
    status?: string | null;
    userId: string;
    user: User;
    createdAt: Date;
    cartItems: CartItem[];
}

export interface CartItem {
    id: string;
    cartId: string;
    cart: Cart;
    productId: string;
    product: Product;
    quantity: number;
}

export enum OrderStatus {
    PENDING = 'PENDING',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED',
}

export enum PaymentStatus {
    PENDING = 'PENDING',
    SUCCESS = 'SUCCESS',
    FAILED = 'FAILED',
    REFUNDED = 'REFUNDED',
}

export interface Order {
    id: string;
    storeId: string;
    store: Store;
    totalAmount: number;
    status: OrderStatus;
    orderDate: Date;
    orderItems: OrderItem[];
    payments: Payment[];
    shippingAddress?: Address | null;
}

export interface OrderItem {
    id: string;
    orderId: string;
    order: Order;
    productId: string;
    product: Product;
    quantity: number;
    price: number;
}

export interface Payment {
    id: string;
    amount: number;
    currency: string;
    status: PaymentStatus;
    createdAt: Date;
    updatedAt: Date;
    orderId: string;
    order: Order;
    paymentMethod: string;
}

export interface Category {
    id: string;
    name: string;
    products: Product[];
}

export interface Review {
    id: string;
    body: string;
    date: Date;
    rate: number;
    userId: string;
    productId: string;
    user: User;
    product: Product;
}

export interface SaleEvent {
    id: string;
    name: string;
    description?: string | null;
    category: string;
    startDate: Date;
    finishDate: Date;
    status?: string | null;
    tags?: string | null;
    discount: number;
    stock: number;
    images: string[];
    featured: boolean;
    storeId: string;
    store: Store;
    products: Product[];
    totalSales: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Store {
    id: string;
    name: string;
    description: string;
    logo: string;
    totalSales: number;
    ownerId: string;
    owner: User;
    address?: Address | null;
    products: Product[];
    events: SaleEvent[];
    order?: Order | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    emailVerified?: Date | null;
    role: Role;
    avatarUrl?: string | null;
    createdAt: Date;
    updatedAt: Date;
    reviews: Review[];
    cart?: Cart | null;
    profile?: Profile | null;
    address: Address[];
    store: Store;
}

export interface Address {
    id: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phoneNumber: string;
    store: Store;
    storeId: string;
    user: User;
    userId: string;
    order?: Order | null;
    orderId: string;
}

export interface Profile {
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    phoneNumber?: string | null;
    bio?: string | null;
    picture?: string | null;
    user: User;
    userId: string;
}

export enum Role {
    CUSTOMER = 'CUSTOMER',
    SUPPLIER = 'SUPPLIER',
}
