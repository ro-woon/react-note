import { configureStore } from "@reduxjs/toolkit";
import menuReducer from './menu/menuSlice';
import modalReducer from './modal/modalSlice';
import notesListReducer from './notesList/notesListSlice';
import tagsReducer from './tags/tagsSlice';

// reducer 설정, 세부 reducer 정의, reducer는 slice를 통해 생성
export const store = configureStore({
    reducer: {
        menu: menuReducer,
        modal: modalReducer,
        tags: tagsReducer,
        notesList: notesListReducer
    }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;