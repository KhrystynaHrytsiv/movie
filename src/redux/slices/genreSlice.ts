import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IGenre} from "../../interfaces/IGenre";
import {genreService} from "../../services/genreService";

interface IState{
    genres:IGenre[],
};

const initialState:IState ={
    genres:[]
};

const getAll = createAsyncThunk<IGenre[], void>(
    'genreSlice/getAll',
    async (_, {rejectWithValue}) =>{
        try {
            const {data} = await genreService.getAll();
            return data
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)

const genreSlice = createSlice({
    name: 'genreSlice',
    initialState,
    reducers:{},
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action)=>{
                state.genres = action.payload
            })

});
const {reducer:genreReducer, actions} = genreSlice;
const genreActions = {...actions, getAll}

export {genreReducer, genreActions}

