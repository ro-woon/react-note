import { RiInboxUnarchiveFill } from 'react-icons/ri';
import { FaEdit, FaTrash, FaTrashRestore } from "react-icons/fa";
import { Note } from "../types/note";
import { Dispatch } from "@reduxjs/toolkit";
import { toggleCreateNoteModal } from "../store/modal/modalSlice";
import { deleteNote, restoreNote, setArchiveNotes, setEditNote, setTrashNotes, unArchiveNote } from "../store/notesList/notesListSlice";
import { NotesIconBox } from '../styles/styles';

// 버튼에 관한 내용을 관리하는 코드, 모달 생성과, 이미 생선된 노트를 archived와 trash로 보내는 작업을 진행

const getRelevantBtns = (type: string, note: Note, dispatch: Dispatch) => {

    const clickHandler = () => {
        dispatch(toggleCreateNoteModal(true));
        dispatch(setEditNote(note))
    } 

    if (type === "archive") {
        return (
            <>
                <NotesIconBox
                    onClick={() => dispatch(unArchiveNote(note))}
                    data-info="Unarchive"
                >
                    <RiInboxUnarchiveFill style={{ fontSize: '1rem' }} />
                </NotesIconBox>
                <NotesIconBox
                    onClick={() => dispatch(setTrashNotes(note))}
                    data-info="Delete"
                >
                    <FaTrash />
                </NotesIconBox>
            </>
        )
    } else if (type === "trash") {
        return (
            <>
                <NotesIconBox
                    onClick={() => dispatch(restoreNote(note))}
                    data-info="Restore"
                >
                    <FaTrashRestore style={{ fontSize: '1rem' }} />
                </NotesIconBox>
                <NotesIconBox
                    onClick={() => dispatch(deleteNote(note))}
                    data-info="Delete"
                >
                    <FaTrash />
                </NotesIconBox>
            </>
        )
    } else {
        return (
            <>
                <NotesIconBox
                    onClick={clickHandler}
                    data-info="Edit"
                >
                    <FaEdit style={{ fontSize: '1rem' }} />
                </NotesIconBox>
                <NotesIconBox
                    onClick={() => dispatch(setArchiveNotes(note))}
                    data-info="Archive"
                >
                    <FaTrashRestore style={{ fontSize: '1rem' }} />
                </NotesIconBox>
                <NotesIconBox
                    onClick={() => dispatch(setTrashNotes(note))}
                    data-info="Delete"
                >
                    <FaTrash />
                </NotesIconBox>
            </>
        )
    }
}

export default getRelevantBtns;