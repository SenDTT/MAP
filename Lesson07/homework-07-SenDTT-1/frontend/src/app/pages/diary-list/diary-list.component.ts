import { Component, OnInit } from '@angular/core';
import { DiaryService } from '../../services/diary.service';
import { Diary } from '../../models/diary';
import { RouterLink } from '@angular/router';
import { CommonModule, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-diary-list',
  standalone: true,
  imports: [RouterLink, SlicePipe, CommonModule],
  templateUrl: './diary-list.component.html',
})
export class DiaryListComponent implements OnInit {
  diaries: Diary[] = [];

  constructor(private diaryService: DiaryService) {}

  ngOnInit() {
    this.diaryService
      .getDiaries()
      .subscribe((res) => (this.diaries = res.data));
  }
}
