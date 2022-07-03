import React, { useEffect, useState } from "react"
import { NoteStorage } from "../service/NoteStorage";
import { Note } from "../types/note";

interface ListNoteProps {
  notes: Note[];
  onUpdate: (notes: Note[]) => void 
}


function AddNote({notes, onUpdate}: ListNoteProps) {

    const [value, setValue] = useState('');
    const [valDate, setValDate] = useState('');
    const [valTag, setValTag] = useState('');
    const [valPriority, setValPriority] = useState('')
    return (
        <div>   
            <h3>Создание заметки</h3>
            <input placeholder='Заголовок' value={value} onChange={(e)=>setValue(e.target.value)}/>
            <input placeholder='Название' value={valTag} onChange={(e)=>setValTag(e.target.value)}/>
            <input type={'date'} placeholder='Деад лайн' value={valDate} onChange={(e)=> setValDate(e.target.value)}/>
            <select value={valPriority} onChange={(e) => setValPriority(e.target.value)}>
                <option value={'low'}>Низкий</option>
                <option value={'middle'}>Средний</option>
                <option value={'high'}>Высокий</option>
            </select>
            <button onClick={() =>  {
                NoteStorage.addNote({
                  id: uuidv4(), 
                  nameNote: value, 
                  deadline: valDate,
                  tags: valTag, 
                  priority: valPriority,
                  status: true})
                    .then((res) => {
                        onUpdate(res)
                        
                    });
                  setValDate('')
                  setValTag('')
                  setValue('')
                  setValPriority('')
            }}>Сохранить</button>
        </div>
    )
}


export default AddNote

function uuidv4() {
   return Math.random() * 1000
}

// useAjax(url, method)