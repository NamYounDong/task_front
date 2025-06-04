// REDUX TOOLKIT 

// combineReducers: 여러 리듀서를 하나로 합쳐주는 함수
// configureStore: 스토어를 생성하는 함수
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import apiReducer from './slices/apiSlices';
import modalReducer from './slices/modalSlices';

// 리덕스 툴킷으로 스토어 생성
const store = configureStore({
    reducer: combineReducers({
        auth : authReducer,
        api : apiReducer,
        modal : modalReducer
    })
});

export default store; // 다른데서 import해서 가져다 쓸라면 export 필수