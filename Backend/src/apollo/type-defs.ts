export const typeDefs = `#graphql
    scalar DateTime


    type Mutation {
        """
        Create a User

        """
        signUp(input: SignUpInput!): AuthPayload!
        signIn(input: SignInInput!): AuthPayload!
        signOut: Boolean!
        """
        Update a User
        """
        userUpdate(by: UserByInput!, input: UserUpdateInput!): UserUpdatePayload

        """
        Delete a User by ID or unique field
        """
        userDelete(by: UserByInput!): UserDeletePayload

        """
        Create a Product
        """
        productCreate(input: ProductCreateInput!): ProductCreatePayload

        """
        Update a Product
        """
        productUpdate(
            by: ProductByInput!
            input: ProductUpdateInput!
        ): Product

        """
        Delete a Product by ID or unique field
        """
        deleteProduct(id: ID!): Product
        createColor(color: ColorCreateInput!): Color
        updateColor(color: ColorUpdateInput!): Color
        deleteColor(id: ID!): Color
        createSize(size: SizeCreateInput!): Size
        updateSize(size: SizeUpdateInput!): Size
        deleteSize(id: ID!): Size
        createCart(cart: CartCreateInput!): Cart
        updateCart(cart: CartUpdateInput!): Cart
        deleteCart(id: ID!): Cart
        createCartItem(cartitem: CartItemCreateInput!): CartItem
        updateCartItem(cartitem: CartItemUpdateInput!): CartItem
        deleteCartItem(id: ID!): CartItem
        createOrder(order: OrderCreateInput!): Order
        updateOrder(order: OrderUpdateInput!): Order
        deleteOrder(id: ID!): Order
        createOrderItem(orderitem: OrderItemCreateInput!): OrderItem
        updateOrderItem(orderitem: OrderItemUpdateInput!): OrderItem
        deleteOrderItem(id: ID!): OrderItem
        createPayment(payment: PaymentCreateInput!): Payment
        updatePayment(payment: PaymentUpdateInput!): Payment
        deletePayment(id: ID!): Payment
        createCategory(category: CategoryCreateInput!): Category
        updateCategory(category: CategoryUpdateInput!): Category
        deleteCategory(id: ID!): Category
        createReviews(reviews: ReviewsCreateInput!): Reviews
        updateReviews(reviews: ReviewsUpdateInput!): Reviews
        deleteReviews(id: ID!): Reviews
        createSaleEvent(saleevent: SaleEventCreateInput!): SaleEvent
        updateSaleEvent(saleevent: SaleEventUpdateInput!): SaleEvent
        deleteSaleEvent(id: ID!): SaleEvent
        createStore(store: StoreCreateInput!): Store
        updateStore(store: StoreUpdateInput!): Store
        deleteStore(id: ID!): Store
        createAddress(address: AddressCreateInput!): Address
        updateAddress(address: AddressUpdateInput!): Address
        deleteAddress(id: ID!): Address
        createProfile(profile: ProfileCreateInput!): Profile
        updateProfile(profile: ProfileUpdateInput!): Profile
        deleteProfile(id: ID!): Profile
    }

    enum OrderByDirection {
        ASC
        DESC
    }

    input SignUpInput {
        username: String!
        email: String!
        password: String!
    }

    input SignInInput {
        email: String!
        password: String!
    }


    
    type AuthPayload {
        token: String
        user: User
    }

    enum OrderStatus {
      PENDING
      SHIPPED
      DELIVERED
      CANCELLED
    }

    enum PaymentStatus {
      PENDING
      SUCCESS
      FAILED
      REFUNDED
    }

    enum Role {
      Customer
      Supplier
    }

    type Product {
        id: ID!
        name: String!
        description: String
        images: [String]
        price: Float
        discount: Float
        code: Int
        stock: Int
        salesCount: Int
        features: String
        tags: String
        Manufacturer: String
        isFeatured: Boolean
        isArchived: Boolean
        createdAt: DateTime
        updatedAt: DateTime
        createdBy: Store!
        storeId: String!
        reviews: [Reviews]
        categories: [Category]
        cartItem: CartItem
        orderItem: OrderItem
        colors: [Color]
        sizes: [Size]
        events: SaleEvent
        eventId:String
    }

type Color {
  id: ID!
  name: String!
  value: String!
  availability: Boolean
  price: Float
  imageUrl: String
  description: String
  createdAt: DateTime
  updatedAt: DateTime
  products: [Product]
}

type Size {
  id: ID!
  name: String!
  value: Float!
  description: String
  availability: Boolean
  price: Float
  createdAt: DateTime
  updatedAt: DateTime
  products: [Product]
}

type Cart {
  id: ID!
  status: String
  user: User!
  userId:String
  createdAt: DateTime!
  cartItems: [CartItem]
}

type CartItem {
  id: ID!
  cart: Cart!
  cartId:String
  product: Product!
  productId:String
  quantity: Int!
}

type Order {
  id: ID!
  store: Store!
  storeId:String
  totalAmount: Float!
  status: OrderStatus!
  orderDate: DateTime!
  orderItems: [OrderItem]
  payments: [Payment]
  shippingAddress: Address
}

type OrderItem {
  id: ID!
  order: Order!
  orderId:String
  product: Product!
  productId:String
  quantity: Int!
  price: Float!
}

type Payment {
  id: ID!
  amount: Float!
  currency: String!
  status: PaymentStatus!
  createdAt: DateTime!
  updatedAt: DateTime!
  order: Order!
  orderId:String
  paymentMethod: String!
}

type Category {
  id: ID!
  name: String!
  products: [Product]
}

type Reviews {
  id: ID!
  body: String!
  date: DateTime!
  rate: Int!
  user: User!
  userId:String!
  product: Product!
  productId:String
}

type SaleEvent {
  id: ID!
  name: String!
  description: String
  category: String!
  startDate: DateTime!
  finishDate: DateTime!
  status: String
  tags: String
  discount: Float!
  stock: Int!
  images: [String]
  featured: Boolean
  store: Store!
  storeId:String
  products: [Product]
  totalSales: Int
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Store {
  id: ID!
  name: String!
  description: String
  logo: String
  totalSales: Int
  owner: User
  ownerId:String!
  address: Address
  products: [Product]
  events: [SaleEvent]
  order: Order
  createdAt: DateTime
  updatedAt: DateTime
}

type User {
  id: ID!
  username: String!
  email: String!
  password: String!
  emailVerified: DateTime
  role: Role!
  avatarUrl: String
  createdAt: DateTime!
  updatedAt: DateTime!
  reviews: [Reviews]
  cart: Cart
  profile: Profile
  address: [Address]
  store: Store
}

type Address {
  id: ID!
  street: String!
  city: String!
  state: String!
  postalCode: String!
  country: String!
  phoneNumber: String!
  store: Store
  storeId:String
  user: User
  userId:String
  order: Order
  orderId:String
}

type Profile {
  id: ID!
  firstName: String
  lastName: String
  phoneNumber: String
  bio: String
  picture: String
  user: User!
  userId:String
}    

    input ProductByInput {
        id: ID
    }

      

    type ProductCreatePayload {
        product: Product
    }

    type ProductDeletePayload {
        deletedId: ID!
    }

    input ProductOrderByInput {
        createdAt: OrderByDirection
    }

    input ProductCreateInput {
      name: String!
      description: String
      images: [String]
      price: Float
      discount: Float
      code: Int
      stock: Int
      salesCount: Int
      features: String
      tags: String!
      Manufacturer: String
      isFeatured: Boolean!
      isArchived: Boolean!
      storeId: String!
      categories: [CategoryCreateInput]
      colors: [ColorCreateInput]
      sizes: [SizeCreateInput]
      eventId: String
    }

    input ProductUpdateInput {
      id: ID!
      name: String!
      description: String
      images: [String]
      price: Float
      discount: Float
      code: Int
      stock: Int
      salesCount: Int!
      features: String
      tags: String!
      Manufacturer: String
      isFeatured: Boolean!
      isArchived: Boolean!
      storeId: String!
      categories: [CategoryCreateInput]
      colors: [ColorCreateInput]
      sizes: [SizeCreateInput]
      eventId: String
    }

    input ColorCreateInput {
      name: String!
      value: String!
      availability: Boolean
      price: Float
      imageUrl: String
      description: String
    }
   

    input ColorUpdateInput {
      id: ID!
      name: String
      value: String
      availability: Boolean
      price: Float
      imageUrl: String
      description: String
    }

    input SizeCreateInput {
      name: String!
      value: Float!
      description: String
      availability: Boolean
      price: Float
    }

    input SizeUpdateInput {
      id: ID!
      name: String
      value: Float
      description: String
      availability: Boolean
      price: Float
    }

    input CartCreateInput {
      status: String
      userId: String!
      cartItems: [CartItemCreateInput!]
    }

    input CartUpdateInput {
      id: ID!
      status: String
      userId: String!
      cartItems: [CartItemUpdateInput!]
    }

    input CartItemCreateInput {
      cartId: String!
      productId: String!
      quantity: Int!
    }

    input CartItemUpdateInput {
      id: ID!
      cartId: String!
      productId: String!
      quantity: Int
    }

    input OrderCreateInput {
      userId: String!
      totalAmount: Float!
      status: OrderStatus!
      orderItems: [OrderItemCreateInput!]
      payments: [PaymentCreateInput!]
      shippingAddress: AddressCreateInput
    }

    input OrderUpdateInput {
      userId: String!
      totalAmount: Float
      status: OrderStatus
      orderItems: [OrderItemUpdateInput!]
      payments: [PaymentUpdateInput!]
      shippingAddress: AddressUpdateInput
    }

    input OrderItemCreateInput {
      orderId: String!
      productId: String!
      quantity: Int!
      price: Float!
    }

    input OrderItemUpdateInput {
      orderId: String!
      productId: String!
      quantity: Int
      price: Float
    }

    input PaymentCreateInput {
      amount: Float!
      currency: String!
      status: PaymentStatus!
      orderId: String!
      paymentMethod: String!
    }

    input PaymentUpdateInput {
      id: ID!
      amount: Float
      currency: String
      status: PaymentStatus
      orderId: String!
      paymentMethod: String
    }

    input CategoryCreateInput {
      name: String!
    }

    input CategoryUpdateInput {
      id: ID!
      name: String
    }

    input ReviewsCreateInput {
      body: String!
      date: DateTime!
      rate: Int!
      userId: String!
      productId: String!
    }

    input ReviewsUpdateInput {
      body: String
      date: DateTime
      rate: Int
      userId: String!
      productId: String!
    }

    input SaleEventCreateInput {
      name: String!
      description: String
      category: String!
      startDate: DateTime!
      finishDate: DateTime!
      status: String
      tags: String
      discount: Float
      stock: Int
      images: [String]
      featured: Boolean
      storeId: String!
      productsId: [String]
      totalSales: Int
    }

    input SaleEventUpdateInput {
      id: ID!
      name: String!
      description: String
      category: String!
      startDate: DateTime!
      finishDate: DateTime!
      status: String
      tags: String
      discount: Float
      stock: Int
      images: [String]
      featured: Boolean
      storeId: String
      productsId: [String]
      totalSales: Int
    }

    input StoreCreateInput {
      name: String!
      description: String!
      logo: String
      totalSales: Int
      ownerId: String!
      address: AddressCreateInput
    }

    input StoreUpdateInput {
      id: ID!
      name: String!
      description: String!
      logo: String
      totalSales: Int
      address: AddressCreateInput
    }

    input UserUpdateInput {
      id: ID!
      email: String
      password: String
      emailVerified: DateTime
      avatarUrl: String
      profile: ProfileCreateInput
    }

    input AddressCreateInput {
      street: String!
      city: String!
      state: String!
      postalCode: String!
      country: String!
      phoneNumber: String!
      userId: String
      storeId: String
      orderId: String
    }

    input AddressUpdateInput {
      id: ID!
      street: String
      city: String
      state: String
      postalCode: String
      country: String
      phoneNumber: String
    }

    input ProfileCreateInput {
      firstName: String
      lastName: String
      phoneNumber: String
      bio: String
      picture: String
      userId: String!
    }

    input ProfileUpdateInput {
      id: ID!
      firstName: String
      lastName: String
      phoneNumber: String
      bio: String
      picture: String
    }



    type Query {
        """
        Query a single User by an ID or a unique field
        """
        user(
            """
            The field and value by which to query the User
            """
            id: ID!
        ): User

        """
        Paginated query to fetch the whole list of user
        """
        users(
            skip: Int
            take: Int
            where: String
            orderBy: UserOrderByInput
        ): [User]

        """
        Query a single Product by an ID or a unique field
        """
        product(
            """
            The field and value by which to query the Product
            """
            id: ID!
        ): Product

        """
        Paginated query to fetch the whole list of Product.
        """
        productSearch(
            skip: Int
            take: Int
            where: FilterInput
            orderBy: ProductOrderByInput
        ): ProductsPayload

        categories: [Category]

        color(id: ID!): Color
        colors: [Color!]!
        size(id: ID!): Size
        sizes: [Size!]!
        cart(id: ID!): Cart
        carts: [Cart!]!
        cartitem(id: ID!): CartItem
        cartitems: [CartItem!]!
        order(id: ID!): Order
        orders: [Order!]!
        orderitem(id: ID!): OrderItem
        orderitems: [OrderItem!]!
        payment(id: ID!): Payment
        payments: [Payment!]!
        category(id: ID!): Category
        reviews(id: ID!): Reviews
        reviewss: [Reviews!]!
        saleevent(id: ID!): SaleEvent
        saleevents: [SaleEvent!]!
        store(id: ID!): Store
        stores: [Store!]!
        address(id: ID!): Address
        addresss: [Address!]!
        profile(id: ID!): Profile
        profiles: [Profile!]!
     
    }

    type ProductsPayload {
        tottal: Int
        products: [Product]
    }

    input StringOrNullSearchFilterInput {
        search: String
        equals: String
        contains: String
        startsWith: String
        endsWith: String
        not: String
        gt: String
        gte: String
        lte: String
        lt: String
        in: [String!]
        notIn: [String!]
        some: FilterInput
    }

    # union customTypes = String | Int

    input FilterInput {
        every: [FilterInput!]
        OR: [FilterInput!]
        AND: [FilterInput!]
        NOT: FilterInput
        name: StringOrNullSearchFilterInput
        description: StringOrNullSearchFilterInput
        image: StringOrNullSearchFilterInput
        price: StringOrNullSearchFilterInput
        stock: StringOrNullSearchFilterInput
        color: StringOrNullSearchFilterInput
        features: StringOrNullSearchFilterInput
        Manufacturer: StringOrNullSearchFilterInput
        categories: StringOrNullSearchFilterInput
    }

    """
    An URL as defined by RFC1738. For example,
    """
    scalar URL


    input UserByInput {
        id: ID
        email: String
    }

    """
    Input to create a User

    """
    type UserDeletePayload {
        deletedId: ID!
    }

    input UserOrderByInput {
        createdAt: OrderByDirection
    }

    """
    Input to update a User
    """
    input UserUpdateInput {
        name: String
        email: String
        avatarUrl: String
    }

    type UserUpdatePayload {
        user: User
    }
`;
