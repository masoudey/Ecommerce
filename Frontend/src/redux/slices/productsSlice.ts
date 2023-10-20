import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '../../common.types';

export interface ProductsState {
    byId: Record<string, Product>;
}

const initialState: ProductsState = {
    byId: {},
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) => {
            const { id } = action.payload;
            state.byId[id] = action.payload;
        },
        updateProduct: (state, action: PayloadAction<Product>) => {
            const { id } = action.payload;
            if (state.byId[id]) {
                state.byId[id] = { ...state.byId[id], ...action.payload };
                state.byId[id].updatedAt = new Date(); // Update the updatedAt timestamp
            }
        },
        deleteProduct: (state, action: PayloadAction<string>) => {
            const idToDelete = action.payload;
            delete state.byId[idToDelete];
        },
        setProducts: (state, action: PayloadAction<Product[]>) => {
            action.payload.forEach((product) => {
                if (!state.byId[product.id]) {
                    state.byId[product.id] = product;
                }
            });
        },
    },
});

export const { addProduct, updateProduct, deleteProduct, setProducts } =
    productsSlice.actions;

export default productsSlice.reducer;
