import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Reviews } from '../../common.types';

// Define the initial state for reviews
interface ReviewsState {
    byId: Record<string, Reviews>;
    allIds: string[];
}

const initialState: ReviewsState = {
    byId: {},
    allIds: [],
};

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        addReview: (state, action: PayloadAction<Reviews>) => {
            const { id } = action.payload;
            state.byId[id] = action.payload;
            state.allIds.push(id);
        },
        updateReview: (state, action: PayloadAction<Reviews>) => {
            const { id } = action.payload;
            if (state.byId[id]) {
                state.byId[id] = { ...state.byId[id], ...action.payload };
            }
        },
        deleteReview: (state, action: PayloadAction<string>) => {
            const idToDelete = action.payload;
            delete state.byId[idToDelete];
            state.allIds = state.allIds.filter((id) => id !== idToDelete);
        },
    },
});

export const { addReview, updateReview, deleteReview } = reviewsSlice.actions;

export default reviewsSlice.reducer;
