import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Diary } from '../models/diary';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class DiaryService {
  private apiUrl = environment.apiUrl + '/diary';

  constructor(private http: HttpClient) {}

  getDiaries(): Observable<{ data: Diary[] }> {
    return this.http.get<{ data: Diary[] }>(this.apiUrl);
  }

  createDiary(diary: Partial<Diary>): Observable<{ data: Diary }> {
    return this.http.post<{ data: Diary }>(this.apiUrl, diary);
  }

  deleteDiary(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
