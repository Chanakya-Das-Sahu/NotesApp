// import {createSlice,nanoid} from '@reduxjs/toolkit';
// const initialState = {
//     user : { userId :'' , userEmail:'', noteId:''}
// }

// const slice = createSlice({
//     name:'id',
//     initialState,
//     reducers:{
//         addUserId : (state,action)=>{
//             state.user.userId = action.payload ;
//         },
//         addUserEmail : (state,action)=>{
//            state.user.userEmail = action.payload ;
//         },
//         addNoteId : (state,action)=>{
//            state.user.noteId = action.payload ;
//         }
//     }
// })

// export const {addUserId , addNoteId} = slice.actions ;
// export default slice.reducer ;

import {createSlice , nanoid} from '@reduxjs/toolkit';

const initialState = {
    detail : { userEmail:'', userId:'',noteId:'' }
}

const slice = createSlice({
    name : 'Details' ,
    initialState ,
    reducers : {
        addUserEmail : (state,action) =>{
          state.detail.userEmail = action.payload ;
        },
        addUserId : (state,action) =>{
            state.detail.userId = action.payload ;
        },
        addNoteId : (state,action)=>{
          state.detail.noteId = action.payload ;
        },
        flush : (state,action)=>{
          return initialState ;
        }
    }
})

export const {addUserEmail , addUserId , addNoteId  , flush} = slice.actions ;
export default slice.reducer ;

