import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Note } from '../models/note';
import { NoteService } from '../services/note.service';
import { Router } from '@angular/router';
import { AddNoteComponent } from '../add-note/add-note.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  notes: Note[] = [];
  searchText: string = '';
  dialogRef: any;
  constructor(private noteService: NoteService, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes(): void {
    this.noteService.getNotes()
      .subscribe(notes => this.notes = notes);
  }

  onAddNoteClicked(): void {
    this.dialogRef = this.dialog.open(AddNoteComponent, {
      width: '500px',
      panelClass: 'add-note-dialog'
    });

    this.dialogRef.afterClosed().subscribe(() => {
      this.getNotes();
    });
  }

  onNoteAdded(note: Note): void {
    this.notes.push(note);
    this.dialogRef.close();
  }

  editNote(noteId: number): void {
    this.router.navigate(['/edit-note', noteId]);
  }
  
  deleteNoteById(noteId: number): void {
    this.noteService.deleteNoteById(noteId)
      .subscribe(() => {
        this.notes = this.notes.filter(note => note.id !== noteId);
        alert('Note deleted successfully!');
      }, error => {
        console.log('Error deleting note:', error);
      });
  }

  onSearchTextChanged(): void {
    if (this.searchText.trim() !== '') {
      this.noteService.getNotes()
        .subscribe(notes => this.notes = notes.filter(note => note.title.toLowerCase().includes(this.searchText.trim().toLowerCase())));
    } else {
      this.getNotes();
    }
  }
}