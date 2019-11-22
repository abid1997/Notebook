import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesMainComponent } from './notes-main.component';

describe('NotesMainComponent', () => {
  let component: NotesMainComponent;
  let fixture: ComponentFixture<NotesMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
