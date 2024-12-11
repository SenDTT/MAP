import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaryFormComponent } from './diary-form.component';

describe('DiaryFormComponent', () => {
  let component: DiaryFormComponent;
  let fixture: ComponentFixture<DiaryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiaryFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiaryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
