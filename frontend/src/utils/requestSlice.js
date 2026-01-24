import { createSlice } from '@reduxjs/toolkit'

const requestSlice = createSlice({
    name:"requests",
    initialState:[],
    reducers:{
        addRequests:(state,action)=>action.payload,
        removeRequests:()=>null,
        removeoneRequest:(state,action)=>{
            const newArray=state.filter((r)=>r._id!=action.payload);
            return newArray;
        }
    }
})

export default requestSlice.reducer;

export const{addRequests,removeRequests,removeoneRequest}=requestSlice.actions;