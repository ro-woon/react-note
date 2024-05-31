import React, { useState } from 'react'
import { FaMinus, FaPlus, FaTimes } from 'react-icons/fa';
import { v4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { toggleTagsModal } from '../../../store/modal/modalSlice';
import { removeTags } from '../../../store/notesList/notesListSlice';
import { addTags, deleteTags } from '../../../store/tags/tagsSlice';
import { Tag } from '../../../types/tag';
import getStandardName from '../../../utils/getStandardName';
import { DeleteBox, FixedContainer } from '../Modal.styles';
import { Box, StyledInput, TagsBox } from './TagModal.styles';

// interface 생성, props를 위함
interface TagsModalProps {
  type: string;
  addedTags?: Tag[];
  handleTags?: (tag: string, type: string) => void
}

// props의 타입 지정
const TagsModal = ({ type, addedTags, handleTags }: TagsModalProps) => {
  const dispatch = useAppDispatch();
  const { tagsList } = useAppSelector((state) => state.tags); // redux 가져오기
  const [inputText, setInputText] = useState(''); // 해당 컴포에서만 쓸 state 지정

  // event의 타입 지정, form event이기 때문에 아래와 같이 작성
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // submit이 되면 refresh되기 때문에 생성

    if (!inputText) { // input 값이 없으면 종료
      return;
    }

    dispatch(addTags({ tag: inputText.toLocaleLowerCase(), id: v4() })); // 있다면 내용을 tag의 lowercase로 추가, lowercase를 사용하여 값 비교를 용이하게 함
    setInputText(''); // state 초기화
  }

  // tag 삭제를 위해 action dispatch
  const deleteTagsHandler = (tag: string, id: string) => {
    dispatch(deleteTags(id));
    dispatch(removeTags({ tag }));
  }

  return (
    <FixedContainer>
      <Box>
        <div className='editTags__header'>
          <div className='editTags__title'>
            {type === "add" ? "ADD" : "Edit"} Tags
          </div>
          <DeleteBox
            className='editTags__close'
            onClick={() => dispatch(toggleTagsModal({ type, view: false }))}
          >
            <FaTimes />
          </DeleteBox>
        </div>

        <form onSubmit={submitHandler}>
          <StyledInput
            type="text"
            value={inputText}
            placeholder="new tag..."
            onChange={(e) => setInputText(e.target.value)}
          />
        </form>
        <TagsBox>
          {tagsList.map(({ tag, id }) => (
            <li key={id}>
              <div className='editTags__tag'>
                {getStandardName(tag)}
              </div>
              {type === "edit" ? (
                <DeleteBox onClick={() => deleteTagsHandler(tag, id)}>
                  <FaTimes />
                </DeleteBox>
              ) : (
                <DeleteBox>
                  {addedTags?.find(
                    (addedTag: Tag) => addedTag.tag === tag.toLowerCase()
                  ) ? (
                    <FaMinus onClick={() => handleTags!(tag, "remove")} />
                  ) :
                    (
                      <FaPlus onClick={() => handleTags!(tag, "add")} />
                    )
                  }
                </DeleteBox>
              )}
            </li>
          ))}
        </TagsBox>
      </Box>
    </FixedContainer>
  )
}

export default TagsModal