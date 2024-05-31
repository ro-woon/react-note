import React from 'react'
import { MainWrapper } from '../../components';
import { useAppSelector } from '../../hooks/redux'
import { Container, EmptyMsgBox } from '../../styles/styles';

// 노트가 아무것도 없을 때 보여주는 화면을 정의하는 컴포넌트
const ArchiveNotes = () => {

  const { archiveNotes } = useAppSelector((state) => state.notesList);

  return (
    <Container>
      {archiveNotes.length === 0 ?
        <EmptyMsgBox>노트가 없습니다.</EmptyMsgBox>
        :
        <MainWrapper notes={archiveNotes} type="archive" />
      }
    </Container>
  )
}

export default ArchiveNotes