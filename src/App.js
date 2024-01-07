import React, { useState, useEffect } from 'react';
import './App.css';
import Note from './Note';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { showInstruction } from './helper';

function App() {

  const [notes, setNotes] = useState(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    return savedNotes;
  });

  const [pinnedNotes, setPinnedNotes] = useState(() => {
    const savedPinnedNotes = JSON.parse(localStorage.getItem('pinnedNotes')) || [];
    return savedPinnedNotes;
  });

  const [draggedNoteId, setDraggedNoteId] = useState(null);
  const [showTooltip, setShowTooltip]=useState(false);
  const noteSize = { width: 200, height: 200 };


  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
    localStorage.setItem('pinnedNotes', JSON.stringify(pinnedNotes));
  }, [notes, pinnedNotes]);


  const addNote = () => {
    const maxAttempts = 500; 
    let attempts = 0;
    const generateRandomPosition = () => {
      const maxX = window.innerWidth - noteSize.width;

      const x = Math.random() * maxX;
      const maxY = window.innerHeight - noteSize.height;

      const y = Math.random() * maxY;

      return { x, y };
    };

    const newNote = {
      id: Date.now(),
      text: '',
      pinned: false,
      position: generateRandomPosition(),
    };
    
    while(checkOverlapWithPinnedNotes(newNote) && attempts<maxAttempts){
      newNote.position=generateRandomPosition();
      attempts++;
    }

    attempts<=500 && setNotes([...notes, newNote]);
  };

  const checkOverlapWithPinnedNotes = (newNote) => {
    const noteBounds = {
      left: newNote.position.x,
      right: newNote.position.x + noteSize.width,
      top: newNote.position.y,
      bottom: newNote.position.y + noteSize.height,
    };

    for (const pinnedNote of pinnedNotes) {
      const pinnedNoteBounds = {
        left: pinnedNote.position.x,
        right: pinnedNote.position.x + noteSize.width,
        top: pinnedNote.position.y,
        bottom: pinnedNote.position.y + noteSize.height,
      };

      if (
        noteBounds.left < pinnedNoteBounds.right &&
        noteBounds.right > pinnedNoteBounds.left &&
        noteBounds.top < pinnedNoteBounds.bottom &&
        noteBounds.bottom > pinnedNoteBounds.top
      ) {
        return true;
      }
    }

    return false;
  };


  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
    setPinnedNotes(pinnedNotes.filter((note)=>note.id!==id));
  };

  const handlePinToggle = (id) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, pinned: !note.pinned } : note
      )
  );

    setPinnedNotes((prevPinnedNotes) => {
      const existingNote = prevPinnedNotes.find((note) => note.id === id);

      if (existingNote) {
        return prevPinnedNotes.filter((note) => note.id !== id);
      } else {
        const noteToPin = notes.find((note) => note.id === id);
        return [...prevPinnedNotes, noteToPin];
      }
    });
  };

  const handleDragStart = (id) => {
    setDraggedNoteId(id);
  };

  const handleDragEnd = () => {
    setDraggedNoteId(null);
  };

  const handleDrop = (e) => {
    let offSetX=e.dataTransfer.getData('offSetX');
    let offSetY=e.dataTransfer.getData('offSetY');

    let position={x:e.clientX-offSetX,y:e.clientY-offSetY};

    const draggedNote = notes.find((note) => note.id === draggedNoteId);
  const overlappingPinnedNote = checkOverlapWithPinnedNotes({
    ...draggedNote,
    position: position,
  });

  if (overlappingPinnedNote) {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === draggedNoteId ? { ...note, position: draggedNote.position } : note
      )
    );
  } else {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === draggedNoteId ? { ...note, position } : note
      )
    );
  }
  };

  return (
    <div className="app" onDrop={handleDrop}  onDragOver={(e) => e.preventDefault()}>
      <div className="add-info-div">
      <button className="add-note-button" onClick={addNote}>
          <FontAwesomeIcon icon={faSquarePlus} />
      </button>

      <button className="add-note-button" onMouseEnter={()=>setShowTooltip(true)} onMouseLeave={()=>setShowTooltip(false)}>
          <FontAwesomeIcon icon={faCircleQuestion} />
      </button>
      </div>

      {showTooltip && showInstruction()}
      <div className="note-list">
        {notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            onDelete={deleteNote}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onPinToggle={handlePinToggle}
          />
        ))}
      </div>

      <div>
      </div>

    </div>
  );
};


export default App;

