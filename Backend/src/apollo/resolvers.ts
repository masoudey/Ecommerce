import bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';
import { Prisma } from '@prisma/client';
import { GraphQLContext } from '../index';
import jwt from 'jsonwebtoken';
import { APP_SECRET } from '../auth.js';
import { getLoginSession, setLoginSession } from '../lib/auth.js';
import { removeTokenCookie } from '../lib/auth-cookies.js';
import { inspect } from 'util';

const { sign } = jwt;

export const resolvers = {
    Query: {
        async users(
            _parent: any,
            args: any,
            context: GraphQLContext,
            info: any
        ) {
            try {
                const users = await context.prisma.user.findMany({
                    where: args?.where,
                    orderBy: args?.orderBy,
                    take: args?.take,
                    skip: args?.skip,
                });
                return users;
            } catch (error) {
                throw new GraphQLError(
                    'Authentication token is invalid, please log in',
                    {
                        extensions: {
                            code: 'UNAUTHENTICATED',
                        },
                    }
                );
            }
        },
        async user(
            _parent: any,
            args: any,
            context: GraphQLContext,
            info: any
        ) {
            try {
                const users = await context.prisma.user.findUnique({
                    where: {
                        id: args.id,
                    },
                });
                return users;
            } catch (error) {
                throw new GraphQLError(
                    'Authentication token is invalid, please log in',
                    {
                        extensions: {
                            code: 'UNAUTHENTICATED',
                        },
                    }
                );
            }
        },
        async productSearch(
            _parent: any,
            args: any,
            context: GraphQLContext,
            info: any
        ) {
            console.log(
                'session from context',
                context.session,
                Math.random() * 10
            );
            console.log(inspect(args?.where, { depth: null }));
            try {
                const products = await context.prisma.product.findMany({
                    where: args?.where,
                    orderBy: args?.orderBy,
                    take: args?.take,
                    skip: args?.skip,
                    include: {
                        categories: true,
                    },
                });
                const tottal = await context.prisma.product.count();
                // console.log('product', products);

                return { tottal, products };
            } catch (error) {
                throw new GraphQLError('Failed fetching products');
            }
        },
        async product(
            _parent: any,
            args: any,
            context: GraphQLContext,
            info: any
        ) {
            try {
                const product = await context.prisma.product.findUnique({
                    where: {
                        id: args.id,
                    },
                    include: { colors: true, categories: true },
                });

                return product;
            } catch (error) {
                throw new GraphQLError('Failed fetching products');
            }
        },
        async categories(
            _parent: any,
            args: any,
            context: GraphQLContext,
            info: any
        ) {
            try {
                const categories = await context.prisma.category.findMany();
                return categories;
            } catch (error) {
                throw new GraphQLError('there is no category');
            }
        },
    },
    Product: {
        createdBy: async (
            parent: any,
            args: any,
            context: GraphQLContext,
            info: any
        ) => {
            try {
                const user = await context.prisma.store.findUnique({
                    where: { id: parent.storeId },
                });
                // console.log('user....', user);
                return user;
            } catch (error) {
                throw new GraphQLError('Failed fetching user');
            }
        },
        reviews: async (
            parent: any,
            args: any,
            context: GraphQLContext,
            info: any
        ) => {
            try {
                const reviews = await context.prisma.reviews.findMany({
                    where: { productId: parent.id },
                });
                return reviews;
            } catch (error) {
                throw new GraphQLError('Failed fetching user');
            }
        },
        colors: async (
            parent: any,
            args: any,
            context: GraphQLContext,
            info: any
        ) => {
            try {
                const colors = await context.prisma.color.findMany({
                    include: { products: true },
                });
                return colors;
            } catch (error) {
                throw new GraphQLError('Failed fetching color');
            }
        },
        sizes: async (
            parent: any,
            args: any,
            context: GraphQLContext,
            info: any
        ) => {
            try {
                const sizes = await context.prisma.size.findMany({
                    include: { products: true },
                });
                return sizes;
            } catch (error) {
                throw new GraphQLError('Failed fetching size');
            }
        },
    },
    Store: {
        products: async (
            parent: any,
            args: any,
            context: GraphQLContext,
            info: any
        ) => {
            try {
                const products = await context.prisma.product.findMany({
                    where: { storeId: parent.id },
                });

                return products;
            } catch (error) {
                throw new GraphQLError('Failed fetching products');
            }
        },
        address: async (
            parent: any,
            args: any,
            context: GraphQLContext,
            info: any
        ) => {
            try {
                const address = await context.prisma.address.findUnique({
                    where: { storeId: parent.id },
                });

                return address;
            } catch (error) {
                throw new GraphQLError('Failed fetching products');
            }
        },
    },
    User: {
        profile: async (
            parent: any,
            args: any,
            context: GraphQLContext,
            info: any
        ) => {
            try {
                const profile = await context.prisma.profile.findUnique({
                    where: { userId: parent.id },
                });

                return profile;
            } catch (error) {
                throw new GraphQLError('Failed fetching profile');
            }
        },
        cart: async (
            parent: any,
            args: any,
            context: GraphQLContext,
            info: any
        ) => {
            try {
                const cart = await context.prisma.cart.findUnique({
                    where: { userId: parent.id },
                });
                return cart;
            } catch (error) {
                throw new GraphQLError('failed to fetch cart');
            }
        },
    },
    Reviews: {
        user: async (
            parent: any,
            args: any,
            context: GraphQLContext,
            info: any
        ) => {
            try {
                const profile = await context.prisma.user.findUnique({
                    where: { id: parent.userId },
                });

                return profile;
            } catch (error) {
                throw new GraphQLError('Failed fetching profile');
            }
        },
    },
    Mutation: {
        signUp: async (
            _parent: any,
            args: any,
            context: GraphQLContext,
            info: any
        ) => {
            let userInput: Prisma.UserCreateInput;

            const userExist = await context.prisma.user.findUnique({
                where: {
                    email: args?.input?.email,
                },
            });

            if (userExist) {
                throw new GraphQLError('email is already in use, try to login');
            }
            const hashedPassword = await bcrypt.hash(args?.input?.password, 10);

            userInput = {
                username: args?.input?.username as string,
                email: args?.input?.email as string,
                password: hashedPassword as string,
                avatarUrl: '',
            };

            const user = await context.prisma.user.create({ data: userInput });

            const token = sign({ userId: user.id }, APP_SECRET);

            return { user, token };
        },
        signIn: async (
            parent: unknown,
            args: any,
            context: GraphQLContext,
            info: any
        ) => {
            const user = await context.prisma.user.findUnique({
                where: { email: args?.input?.email },
            });
            if (!user) {
                throw new GraphQLError('No such user found');
            }

            const valid = await bcrypt.compare(
                args?.input?.password,
                user.password
            );
            if (!valid) {
                throw new GraphQLError('Invalid password');
            }
            const session = {
                id: user.id,
                email: user.email,
            };
            const token = sign({ userId: user.id }, APP_SECRET);
            await setLoginSession(context.res, session);

            return {
                token,
                user,
            };
        },
        async signOut(_parent, _args, context, _info) {
            removeTokenCookie(context.res);
            return true;
        },
        async createProfile(
            _parent: any,
            args: any,
            context: GraphQLContext,
            info: any
        ) {
            const { profile } = args;
            const { userId, ...filteredInput } = profile;
            const { session } = context;
            if (!session) {
                // 1
                throw new Error('Cannot create user without logging in.');
            }
            try {
                const pf = await context.prisma.profile.create({
                    data: {
                        ...filteredInput,
                        user: {
                            connect: {
                                id: userId,
                            },
                        },
                    },
                });

                return pf;
            } catch (error) {
                throw new GraphQLError(
                    'Failed creating profile',
                    error.message
                );
            }
        },
        async createStore(
            _parent: any,
            args: any,
            context: GraphQLContext,
            info: any
        ) {
            const { store } = args;
            const { ownerId, address, ...filteredInput } = store;
            let storeData: Prisma.StoreCreateInput;
            storeData = {
                ...filteredInput,
                owner: {
                    connect: {
                        id: ownerId,
                    },
                },
                address: {
                    create: { ...address },
                },
            };
            try {
                // Create a new event
                const newStore = await context.prisma.store.create({
                    data: storeData,
                });
                console.log(
                    'Store and associated address created successfully'
                );
                return newStore;
            } catch (error) {
                console.error('Error creating event with products:', error);
            }
        },
        async productCreate(
            _parent: any,
            args: any,
            context: GraphQLContext,
            info: any
        ) {
            const { input } = args;
            let productInput: Prisma.ProductCreateInput;
            const { colors, storeId, sizes, categories, ...filteredInput } =
                input;

            const connectOrCreateColors = colors.map((color) => ({
                where: { id: color.id }, // Check if the color exists by name
                create: color, // Create the color if it doesn't exist
            }));
            const connectOrCreateCategories = categories.map((category) => ({
                where: { id: category.id }, // Check if the color exists by name
                create: category, // Create the color if it doesn't exist
            }));
            const connectOrCreateSizes = sizes.map((size) => ({
                where: { id: size.id }, // Check if the color exists by name
                create: size, // Create the color if it doesn't exist
            }));
            console.log(
                'filteredInput',
                filteredInput,
                'categories',
                connectOrCreateCategories,
                'colors',
                connectOrCreateColors
            );

            productInput = {
                // name: input?.name,
                // description: input?.description,
                // image: input?.image,
                ...filteredInput,
                createdBy: {
                    connect: {
                        id: storeId,
                    },
                },
                colors: {
                    connectOrCreate: connectOrCreateColors,
                },
                sizes: {
                    create: sizes,
                },
                categories: {
                    connectOrCreate: connectOrCreateCategories,
                },
            };
            const { session } = context;
            // const session = await getLoginSession(context.req);
            console.log('session:.', session);
            console.log(
                'productInput',
                productInput,
                'colors',
                colors,
                'catego',
                categories
            );

            // if (!session) {
            //     // 1
            //     throw new Error('Cannot create without logging in.');
            // }

            try {
                const product = await context.prisma.product.create({
                    data: productInput,
                    include: {
                        colors: true,
                        sizes: true,
                        categories: true,
                    },
                });

                return { product };
            } catch (error) {
                throw new GraphQLError(
                    'Failed creating product',
                    error.message
                );
            }
        },
        async productUpdate(
            _parent: any,
            args: any,
            context: GraphQLContext,
            info: any
        ) {
            const { input } = args;
            let productInput: Prisma.ProductUpdateInput;
            productInput = {
                name: input?.name,
                description: input?.description,
                images: input?.images,
                createdBy: {
                    connect: {
                        id: args?.input?.userId,
                    },
                },
                colors: {
                    set: input?.colors,
                },
            };

            try {
                const product = await context.prisma.product.update({
                    where: {
                        id: args?.by?.id,
                    },
                    data: productInput,
                    include: { colors: true },
                });

                return { product };
            } catch (error) {
                throw new GraphQLError('Failed updating product');
            }
        },

        async createSaleEvent(
            _parent: any,
            args: any,
            context: GraphQLContext,
            info: any
        ) {
            const { saleevent } = args;
            const { storeId, productsId, ...filteredInput } = saleevent;
            let eventData: Prisma.SaleEventCreateInput;
            eventData = {
                ...filteredInput,
                store: {
                    connect: {
                        id: storeId,
                    },
                },
                products: {
                    connect: productsId.map((productId) => ({ id: productId })),
                },
            };
            try {
                // Create a new event
                const newEvent = await context.prisma.saleEvent.create({
                    data: eventData,
                });

                return { newEvent };

                console.log(
                    'Event and associated products created successfully'
                );
            } catch (error) {
                console.error('Error creating event with products:', error);
            }
        },
    },
};
