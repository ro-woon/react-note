import React from 'react'
import { MainWrapper } from '../../components';
import { useAppSelector } from '../../hooks/redux'
import { Container, EmptyMsgBox } from '../../styles/styles';

// 휴지통의 노트를 보여주는 페이지
const TrashNotes = () => {
  const { trashNotes } = useAppSelector((state) => state.notesList);

  return (
    <Container>
      {trashNotes.length === 0 ? (
        <EmptyMsgBox>노트가 없습니다.</EmptyMsgBox>
      ) :
        (
          <MainWrapper notes={trashNotes} type="trash" />
        )
      }
    </Container>
  )
}

export default TrashNotes