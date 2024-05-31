import React from 'react'
import { FaTimes } from 'react-icons/fa';
import { useAppDispatch } from '../../../hooks/redux';
import { readNote } from '../../../store/notesList/notesListSlice';
import { Note } from '../../../types/note'
import { DeleteBox, FixedContainer } from '../Modal.styles';
import { Box } from './ReadNoteModal.styles';
import parse from 'html-react-parser';

// ts를 위한 interface
interface ReadNoteModalProps {
  note: Note;
  type: string
}

// props의 타입을 지정해주고, 노트를 생성
const ReadNoteModal = ({ note, type }: ReadNoteModalProps) => {
  const dispatch = useAppDispatch();

  return (
    <FixedContainer>
      <Box style={{ backgroundColor: note.color }}>
        <DeleteBox
          onClick={() => dispatch(readNote({ type, id: note.id }))}
          className="readNote__close-btn"
        >
          <FaTimes />
        </DeleteBox>
        <div className='readNote__title'>{note.title}</div>
        <div className='readNote__content'>{parse(note.content)}</div>
      </Box>
    </FixedContainer>
  )
}

export default ReadNoteModal