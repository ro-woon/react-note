import React from 'react'
import { NotesIconBox } from '../../styles/styles';
import { Card, ContentBox, FooterBox, TagsBox, TopBox } from './NoteCard.styles';
import { BsFillPinFill } from 'react-icons/bs';
import { Note } from '../../types/note';
import { useAppDispatch } from '../../hooks/redux';
import getRelevantBtns from '../../utils/getRelevantBtns';
import { readNote, setPinnedNotes } from '../../store/notesList/notesListSlice';
import parse from 'html-react-parser';
import ReadNoteModal from '../Modal/ReadNoteModal/ReadNoteModal';

//ts를 위한 interface 생성
interface NoteCardProps {
  note: Note,
  type: string
}

// props 타입 지정
const NoteCard = ({ note, type }: NoteCardProps) => {
  const dispatch = useAppDispatch();
  const { title, content, tags, color, priority, date, isPinned, isRead, id } = note; // 구조 분해 할당

  const func = () => {

    const imgContent = content.includes("img")

    if (imgContent) {
      return content;
    } else {
      return content.length > 75 ? content.slice(0, 75) + "..." : content;
    }


  }

  console.log(note, type)

  return ( // 실제 노트를 생성하기 위한 코드, 위에서 받아온 노트의 정보들을 이용해서 노트를 구성하여 화면에 띄워준다.
    <>
      {isRead && <ReadNoteModal type={type} note={note} />}
      <Card style={{ background: color }}>
        <TopBox>
          <div
            className='noteCard__title'
          >
            {title.length > 10 ? title.slice(0, 10) + '...' : title}
          </div>
          <div className='noteCard__top-options'>
            <span className='noteCard__priority'>
              {priority}
            </span>

            {type !== "archive" && type !== "trash" && (
              <NotesIconBox
                className='noteCard__pin'
                onClick={() => dispatch(setPinnedNotes({ id }))}
              >
                <BsFillPinFill
                  style={{ color: isPinned ? "red" : "" }}
                />
              </NotesIconBox>
            )}
          </div>
        </TopBox>
        <ContentBox onClick={() => dispatch(readNote({ type, id }))}>
          {parse(func())}
        </ContentBox>
        <TagsBox>
          {tags.map(({ tag, id }) => (
            <span key={id}>{tag}</span> /* 태그 들을 나열하기 위한 map 메서드*/
          ))}
        </TagsBox>

        <FooterBox>
          <div className='noteCard__date'>{date}</div>
          <div>{getRelevantBtns(type, note, dispatch)}</div>
        </FooterBox>
      </Card>
    </>
  )
}

export default NoteCard