import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTransToEnglishComponent } from './edit-trans-to-english.component';

describe('EditTransToEnglishComponent', () => {
  let component: EditTransToEnglishComponent;
  let fixture: ComponentFixture<EditTransToEnglishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTransToEnglishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTransToEnglishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
