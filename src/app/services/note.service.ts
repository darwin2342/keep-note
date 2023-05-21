// note.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Note } from '../models/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private url = 'http://localhost:3000/notes';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  addNoteSubject = new Subject<void>();

  constructor(private http: HttpClient) { }

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.url)
      .pipe(
        catchError(this.handleError)
      );
  }

  getNoteById(id: number): Observable<Note> {
    const url = `${this.url}/${id}`;
    return this.http.get<Note>(url);
  }

  addNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.url, note, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  editNoteById(note: Note): Observable<Note> {
    const url = `${this.url}/${note.id}`;
    return this.http.put<Note>(url, note, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteNoteById(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}
