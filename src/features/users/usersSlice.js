import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// AsyncThunk para buscar usuario
export const fetchUserName = createAsyncThunk('users/fetchUserName', async (username) => {
    const response = await api.post('/userName', {username : username});
    return response.data;
});

// Slice de usuarios
const usersSlice = createSlice({
    name: 'users',
    initialState: {
        user: null, // Para almacenar el usuario encontrado
        status: 'idle', // Estado de la consulta (idle, loading, succeeded, failed)
        error: null, // Mensaje de error si ocurre
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserName.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchUserName.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload.result || action.payload;
            })
            .addCase(fetchUserName.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.result || action.payload;
            });
    },
});

export default usersSlice.reducer;
