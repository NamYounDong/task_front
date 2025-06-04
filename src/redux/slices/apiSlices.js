import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../../utils/requests";
import { GET_TASKS_API_URL, GET_TASK_API_URL, INSERT_TASK_API_URL, UPDATE_TASK_API_URL, DELETE_TASK_API_URL, GET_MSRSTN_LIST_API, GET_LAT_LNG_ADDR_API_URL } from "../../utils/apiUrl";
import '../../utils/utils';


// 이거 좀 이해가 안간다.....
// getTasks 에서 파라미터들 받아서 처리하려고 했더니 ... 안되더라....
// return을 줘도 type 못찾는다고 야랄한다...
// createAsyncThunk(actionType, async (options, 그래서 요기에 인자 더 때려 박을수 있나 했더니) => {
// 그것도 안되더라... options밖에 못받는 놈인가보다... 아님 내가 뭔가 실수헀나?
// options에 때려 박아서 쓰는 더러운 방법을 써야하나...? 이건 되는거 같다... 그지같네....
// 이거 미리 세팅되어 있야해서 함수로 묶어서 처리하면 안되는건가?
const createFetchTunnk = (actionType, url) => {
    return createAsyncThunk(actionType, async (options) => {
        return await request(url, options);
    })
}

export const getTasks = createFetchTunnk("getTasks", GET_TASKS_API_URL);

export const getTask = createFetchTunnk("getTask", GET_TASK_API_URL);

export const insertTask = createFetchTunnk('insertTask', INSERT_TASK_API_URL);

export const updateTask = createFetchTunnk('updateTask', UPDATE_TASK_API_URL);

export const deleteTask = createFetchTunnk('deleteTask', DELETE_TASK_API_URL);

export const getMsrstnInfoInqireSvc = createFetchTunnk('msrstnInfoInqireSvc', GET_MSRSTN_LIST_API);

export const getLatLngAddr = createFetchTunnk('getLatLngAddr', GET_LAT_LNG_ADDR_API_URL);



// export const getTasks = (params) => {
//     return createFetchTunnk('getTasks', 'post', GET_TASKS_API_URL, params);
// };



const handleFullfilled = (stateKey) => (state, action) => {
    state[stateKey] = action.payload;
}

const handleRejected = (state, action) => {
    console.log('Error : ', state);
    console.log('Error : ', action);
}


export const initTaskData = {
    id : null,
    userId : null,
    title: null,
    date : new Date().format('yyyy-MM-dd'),
    description : null,
    isCompleted: false,
    isImportant: false
}


const apiSlices = createSlice({
    name:"api",
    initialState : {
        getItemsData : [],
        insertTaskData : null,
        updateTaskData : null,
        deleteTaskData : null,
        taskData : initTaskData,
        msrstnInfoInqireSvcData: [],
        latLngAddr : null
    },
    reducers : {
        setItemsData : (state, action) => {
            state.getItemsData = action.payload;
        },
        setTaskData : (state, action) => {
            state.taskData = action.payload;
        }
    },
    extraReducers : (builder) => {
        builder
            .addCase(getTasks.fulfilled, handleFullfilled('getItemsData'))
            .addCase(getTasks.rejected, handleRejected())

            .addCase(getTask.fulfilled, handleFullfilled('taskData'))
            .addCase(getTask.rejected, handleRejected())

            .addCase(insertTask.fulfilled, handleFullfilled('insertTaskData'))
            .addCase(insertTask.rejected, handleRejected())

            .addCase(updateTask.fulfilled, handleFullfilled('updateTaskData'))
            .addCase(updateTask.rejected, handleRejected())

            .addCase(deleteTask.fulfilled, handleFullfilled('deleteTaskData'))
            .addCase(deleteTask.rejected, handleRejected())  

            .addCase(getMsrstnInfoInqireSvc.fulfilled, handleFullfilled('msrstnInfoInqireSvcData'))
            .addCase(getMsrstnInfoInqireSvc.rejected, handleRejected()) 

            .addCase(getLatLngAddr.fulfilled, handleFullfilled('latLngAddr'))
            .addCase(getLatLngAddr.rejected, handleRejected())  
            
    }
});

export const { setItemsData, setTaskData } = apiSlices.actions;
export default apiSlices.reducer;
