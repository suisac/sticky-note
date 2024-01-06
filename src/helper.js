import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack, faPenToSquare , faTrash, faFloppyDisk} from '@fortawesome/free-solid-svg-icons';

export const showInstruction=()=>{
    return(
        <div className="tooltip">
            <h3>Instructions</h3>
            <ul>
                <li>
                    Click on + button to add new sticky note.
                </li>
                <li>
                    Click on <FontAwesomeIcon icon={faThumbtack}/> to pin. Pinned notes will have a black header.
                </li>
                <li>
                    If you try to overlap a pinned note, the dragged note will return to its original position.
                </li>
                <li>
                    Click on the note or <FontAwesomeIcon icon={faPenToSquare}/> to edit.
                </li>
                <li>
                    Click on <FontAwesomeIcon icon={faFloppyDisk}/> or anywhere outside the note to save.
                </li>
                <li>
                    Click on <FontAwesomeIcon icon={faTrash}/> to delete the note
                </li>
            </ul>
        </div>
    )
}

export  const checkOverlapWithPinnedNotes = (newNote,noteSize,pinnedNotes) => {
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