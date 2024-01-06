import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack, faPenToSquare , faTrash, faFloppyDisk} from '@fortawesome/free-solid-svg-icons';

const Note = ({ note, onDelete, onDragStart, onDragEnd, onPinToggle }) => {

  let divStyle={position:'fixed',left:`${note.position.x}px`, top:`${note.position.y}px`, zIndex: note.pinned ? 1 : 0};
  const [dragging, setDragging] = useState(false);
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(note.text);

  const textRef=useRef(null);

  const handleDragStart = (e) => {
    if (!note.pinned) {
        setDragging(true);
        onDragStart(note.id);

        const offsetX = e.clientX - e.target.getBoundingClientRect().left;
        const offsetY = e.clientY - e.target.getBoundingClientRect().top;

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', e.target.parentNode);
        e.dataTransfer.setData('offSetX', offsetX);
        e.dataTransfer.setData('offSetY',offsetY);
      }
  };

  const handleDragEnd = (e) => {
    e.preventDefault();
    setDragging(false);
    onDragEnd();
  };

  const handlePinToggle = () => {
    onPinToggle(note.id);
  };


  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleSave = () => {
    if(textRef.current){
        textRef.current.blur();
        setEditing(false);
        note.text = text;
    }
  };


  const handleEdit=()=>{
        textRef.current.scrollTop=0;
        textRef.current.setSelectionRange(0, 0);
        textRef.current.focus();
        setEditing(true);
  };

  const handleBlur=()=>{
        textRef.current.scrollTop=0;
        setEditing(false); 
        note.text = text;
  }

  return (
    <div
      className={`note ${dragging ? 'dragging' : ''} ${note.pinned ? 'pinned' : ''}`}
      style={divStyle}
      draggable={!note.pinned}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
    
      <div className='note-header'>
        <button className="pin-button" style={{color:note.pinned?'black':'white'}} onClick={handlePinToggle}>
            <FontAwesomeIcon icon={faThumbtack} />
        </button>
        <div>

                <button className="note-button" style={{display:editing?'none':'inline-block'}} onClick={() => handleEdit()}>
                    <FontAwesomeIcon icon={faPenToSquare}/>
                </button>

                <button className="note-button" style={{display:editing?'inline-block':'none'}} onClick={() => handleSave()}>
                    <FontAwesomeIcon icon={faFloppyDisk}/>
                </button>

            <button className="note-button" onClick={() => onDelete(note.id)}>
                <FontAwesomeIcon  icon={faTrash}/>
            </button>
        </div>
        
      </div>

        

        <textarea
          type="text"
          value={text}
          ref={textRef}
          onChange={handleInputChange}
          onClick={()=>setEditing(true)}
          onBlur={handleBlur}
          placeholder="Enter text here"
          className='notes-text'
        />


    </div>
  );
};

export default Note;
