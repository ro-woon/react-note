import React, { useState } from 'react'
import { FiltersModal } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { toggleFiltersModal } from '../../store/modal/modalSlice';
import { ButtonOutline, Container, EmptyMsgBox } from '../../styles/styles';
import getAllNotes from '../../utils/getAllNotes';
import { Box, InputBox, TopBox } from './AllNotes.styles';

const AllNotes = () => {
  const dispatch = useAppDispatch();
  const { mainNotes } = useAppSelector((state) => state.notesList); //redux에서 요소 가져오기
  const { viewFiltersModal } = useAppSelector((state) => state.modal); //redux에서 요소 가져오기
  const [filter, setFilter] = useState(''); // 현재 컴포넌트에서만 사용하는 state
  const [searchInput, setSearchInput] = useState(''); // 현재 컴포넌트에서만 사용하는 state

  // 필터 설정
  const filterHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  }

  // 필터 해제
  const clearHandler = () => {
    setFilter("");
  }

  // 모든 노트를 보여주는 페이지를 설정한다.
  return (
    <Container>
      {viewFiltersModal && (
        <FiltersModal
          handleFilter={filterHandler}
          handleClear={clearHandler}
          filter={filter}
        />
      )}

      {mainNotes.length === 0 ? (
        <EmptyMsgBox>
          노트가 없습니다.
        </EmptyMsgBox>
      ) : (
        <>
          <TopBox>
            <InputBox>
              <input
                type={"text"}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="노트의 제목을 입력해주세요."
              />
            </InputBox>

            <div className='notes__filter-btn'>
              <ButtonOutline
                onClick={() => dispatch(toggleFiltersModal(true))}
                className="nav__btn"
              >
                <span>정렬</span>
              </ButtonOutline>
            </div>
          </TopBox>

          <Box>
            {/* Notes */}
            {getAllNotes(mainNotes, filter)}
          </Box>
        </>
      )}
    </Container>
  )
}

export default AllNotes