import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IPeople} from "../../interfaces/IPeople";
import {peopleService} from "../../services/peopleService";
 interface IState {
   people:IPeople[]
 }
const initialState:IState ={
    people: []
}
//
// const getById =createAsyncThunk<IPeople, {id}>(
//     'peopleSlice/getById',
//     async ({id}, {rejectWithValue})=>{
//         await peopleService.getById(id)
//     }
// )
const peopleSlice = createSlice({
    name: 'peopleSlice',
    initialState,
    reducers:{}
});

 const {reducer:peopleReducer, actions} = peopleSlice;
 const peopleActions = {...actions}
export {peopleReducer, peopleActions}
