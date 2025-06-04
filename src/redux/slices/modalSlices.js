import { createSlice } from '@reduxjs/toolkit';

const initState = {
    isModalOpen: false,
    modalType : 'detail'
}

const modalSlice = createSlice({
    name : 'modal',
    initialState : initState,
    reducers : {
        // 토글로 하면 꼬일 것 같음.
        openModal : (state) => {
            state.isModalOpen = true;
        },
        closeModal : (state) => {
            state.isModalOpen = false;
        },
        setModalType : (state, action) => {
            state.modalType = action.payload;
        }
        
    }
});

export const { openModal, closeModal, setModalType } = modalSlice.actions;
export default modalSlice.reducer;
