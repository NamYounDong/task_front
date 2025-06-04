import { createSlice } from "@reduxjs/toolkit";


// 초기 값 설정( 저장될 데이터 )
const initState = {
    authData : JSON.parse(localStorage.getItem("authData")) || null,
}

const authSlice = createSlice({
    name : "auth",
    initialState : initState,
    reducers : {
        login : (state, action) => {
            state.authData = action.payload;
            // 차후 여기에 backend session에 저장하면 될까? => 이것도 좀 이싱한데? redux가 클라이언트에서 어디까지 접근이 가능할까?
            localStorage.setItem("authData", JSON.stringify(action.payload));
        },
        logout : (state, action) => {
            state.authData = null;
            localStorage.removeItem("authData");
        }
    }
})


export const { login, logout } = authSlice.actions;
export default authSlice.reducer;