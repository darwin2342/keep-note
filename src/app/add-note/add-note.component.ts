import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NoteService } from '../services/note.service';
import { Note } from '../models/note';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent {
  note: Note = {
    id: 0,
    title: '',
    content: '',
    category: '',
    priority: '',
    reminderDate: ''
  };

  @Output() noteAdded: EventEmitter<Note> = new EventEmitter<Note>();
  constructor(private notesService:  NoteService, private _snackBar: MatSnackBar) { }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.notesService.addNote(this.note).subscribe((newNote) => {
        this._snackBar.open('Note Added successfully','success', { duration: 3000 });
        this.noteAdded.emit(newNote);
      });
    }
  }
}