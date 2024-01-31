import {createSlice,nanoid} from '@reduxjs/toolkit';
const initialState = {
    user : { id :''}
}

const slice = createSlice({
    name:'id',
    initialState,
    reducers:{
        addId : (state,action)=>{
            state.user.id = action.payload ;
        }
    }
})

export const {addId} = slice.actions ;
export default slice.reducer ;