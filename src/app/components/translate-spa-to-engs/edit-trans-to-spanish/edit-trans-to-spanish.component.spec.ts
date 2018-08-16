import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTransToSpanishComponent } from './edit-trans-to-spanish.component';

describe('EditTransToSpanishComponent', () => {
  let component: EditTransToSpanishComponent;
  let fixture: ComponentFixture<EditTransToSpanishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTransToSpanishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTransToSpanishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
