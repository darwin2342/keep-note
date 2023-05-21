import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Note } from '../models/note';
import { NoteService } from '../services/note.service';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent implements OnInit {
  noteId!: number;
  note!: Note;

  constructor(
    private noteService: NoteService,
    private navigationService: NavigationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.noteId = params['id'];
      this.getNote();
    });
  }

  goToNotesView(): void {
    this.navigationService.navigateToNotes();
  }
  
  getNote(): void {
    this.noteService.getNoteById(this.noteId).subscribe(note => {
      this.note = note;
    });
  }

  updateNote(): void {
    this.noteService.editNoteById(this.note).subscribe(updatedNote => {
      alert('Note updated successfully!');
      this.navigationService.navigateToNotes();
    }, error => {
      // Handle error
    });
  }
}