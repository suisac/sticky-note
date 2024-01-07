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
