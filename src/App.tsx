import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import 'antd/dist/antd.css';
import {Divider} from 'antd';
import './App.css';
import {BrowserRouter as Router, Route, Routes, Link, useParams} from 'react-router-dom';
import Home from './components/Home';
import NoteList from './components/NoteList';
import { NoteStorage } from './service/NoteStorage';
import { Note } from './types/note';
import AddNote from './components/AddNote';





function App() {

  let [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    NoteStorage.getNotes()
      .then((notes) => {
        setNotes(notes)
      })
  },[])



  return (
    <Router>
      <div className="App">
        <Link to="/">Главная страница</Link>
        <Divider type="vertical"/>
        <Link to="/add-list">Добавление</Link>
        <Divider type="vertical"/>

        <Routes>
          <Route path='/' element={<NoteList notes={notes} onUpdate={(notes: Note[]) => {
            setNotes(notes)
          }}/>}/> 
          <Route path='/add-list' element={<AddNote notes={notes} onUpdate={(notes: Note[]) => {
            setNotes(notes)
          }}/>}/>
        </Routes>
      </div>  
    </Router>
  );
}

export default App;
