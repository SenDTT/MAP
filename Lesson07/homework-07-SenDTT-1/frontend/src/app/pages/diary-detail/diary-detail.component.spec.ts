import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaryDetailComponent } from './diary-detail.component';

describe('DiaryDetailComponent', () => {
  let component: DiaryDetailComponent;
  let fixture: ComponentFixture<DiaryDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiaryDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiaryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
