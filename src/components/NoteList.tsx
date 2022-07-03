import React, { useEffect, useState } from "react"
import { NoteStorage } from "../service/NoteStorage";
import { Note } from "../types/note";

interface ListNoteProps {
  notes: Note[];
  onUpdate: (notes: Note[]) => void 
}

function NoteList({notes, onUpdate}: ListNoteProps) {
    
    const [edit, setEdit] = useState<number | null>(null)
    const [value, setValue] = useState<string>('');
    const [valDate, setValYear] = useState<string>('');
    const [valPriority, setValPriority] = useState<string>('');


    return (
        <div>
             {notes.map((item: Note, index: number) => {
                return<div key={index} className={!item.status ? 'close' : 'card_style'} >
                {
                  edit === item.id ?
                   <div>
                     <input value={value} onChange={(e) => setValue(e.target.value)}/>
                     <input value={valDate} onChange={(e) => setValYear(e.target.value)}/>
                     <select value={valPriority} onChange={(e) => setValPriority(e.target.value)}>
                        <option value={'low'}>Низкий</option>
                        <option value={'middle'}>Средний</option>
                        <option value={'high'}>Высокий</option>
                    </select>
                   </div> :
                   <div> 
                     <h4>{item.nameNote}</h4>
                     <p>{item.tags}</p>
                     <p>{item.deadline}</p>
                     <p>{item.priority}</p>
                   </div>
                }
                {
                  edit === item.id ?
                  <div>
                    <button onClick={() => {
                      NoteStorage.saveNote(item.id,value,valDate,valPriority)
                       .then((res) => {
                         onUpdate(res)
                         setEdit(null)
                       })
                       
                    }}>Сохранить</button>
                  </div> :
                  
                  <div>
                     <button className="btn_remove" onClick={() => {
                       NoteStorage.removeNote(item.id)
                       .then((res) => {
                           onUpdate(res)
                       });
                   }}>Удалить</button>
                   <button onClick={() => {
                     NoteStorage.changeStatus(item.id)
                     .then((res) => {
                       onUpdate(res)
                     })
                   }}>Выдать</button>
                   <button className="btn_change" onClick={() => {
                     NoteStorage.editNote(item.id, item.nameNote, item.deadline, item.priority)
                     setEdit(item.id)
                     setValue(item.nameNote)
                     setValYear(item.deadline)
                     setValPriority(item.priority)
                   }}>Изменнить</button>

                  </div>
                }
              </div>
             })}
        </div>
    )
}
export default NoteList;