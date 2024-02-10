import {createSlice,nanoid} from '@reduxjs/toolkit';
const initialState = {
    user : { userId :'' , noteId:''}
}

const slice = createSlice({
    name:'id',
    initialState,
    reducers:{
        addUserId : (state,action)=>{
            state.user.userId = action.payload ;
        },
        addNoteId : (state,action)=>{
           state.user.noteId = action.payload ;
        }
    }
})

export const {addUserId , addNoteId} = slice.actions ;
export default slice.reducer ;