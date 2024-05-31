import { createSlice } from "@reduxjs/toolkit";

// 각 슬라이스를 통해 reducer들을 정의한다.

interface MenuState {
    isOpen: boolean;
}

const initialState: MenuState = {
    isOpen: false
}

// 슬라이스 생성, action.payload에 값이 담겨져 들어온다.
const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        toggleMenu: (state, action) => {
            state.isOpen = action.payload
        }
    }
})


export const { toggleMenu } = menuSlice.actions;
export default menuSlice.reducer;