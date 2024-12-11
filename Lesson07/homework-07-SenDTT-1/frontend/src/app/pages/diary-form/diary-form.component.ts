import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DiaryService } from '../../services/diary.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-diary-form',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './diary-form.component.html',
})
export class DiaryFormComponent {
  title = '';
  description = '';
  content = '';

  constructor(private diaryService: DiaryService, private router: Router) {}

  saveDiary() {
    const newDiary = {
      title: this.title,
      description: this.description,
      content: this.content,
    };
    this.diaryService.createDiary(newDiary).subscribe(() => {
      this.router.navigate(['/diaries']);
    });
  }
}
