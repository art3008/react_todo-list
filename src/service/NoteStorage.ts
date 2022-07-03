import { Note } from "../types/note";

export class NoteStorage {
    public static async getNotes(): Promise<Note[]> {
      return JSON.parse(localStorage.getItem('notes') ?? '[]');
    }
  
    public  static async addNote(note: Note): Promise<Note[]> {
      let notes = await this.getNotes();
      notes.push(note);
      await this.setNotes(notes);
      return this.getNotes()
    }
  
    public  static async setNotes(notes: Note[]): Promise<void> {
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  
    public static async removeNote(id: number) : Promise<Note[]> {
        let notes = await this.getNotes();
        notes = notes.filter(item => item.id !== id)
        await this.setNotes(notes);
        return this.getNotes()
    }
  
    public static async changeStatus(id: number) : Promise<Note[]> {

        let notes = await this.getNotes();
  
        notes = notes.filter(item => {
          if(item.id === id) {
            item.status = !item.status
          }
          return item
        })
  
        await this.setNotes(notes)
        return this.getNotes()
    }
  
      public static async editNote(id: number, nameNote: string, deadline: string, priority: string) : Promise<Note[]> {
  
        let notes = await this.getNotes();
        await this.setNotes(notes)
        return this.getNotes()
    }
  
      public static async saveNote(id: number, nameNote: string, deadline: string, priority: string) : Promise<Note[]> {
        let notes = await this.getNotes()
        notes = notes.map(item => {
          if(item.id === id) {
            item.nameNote = nameNote
            item.deadline = deadline
            item.priority = priority 
          }
          return item
        })
             
        await this.setNotes(notes)
        return this.getNotes()
   
      }
  
  }
  