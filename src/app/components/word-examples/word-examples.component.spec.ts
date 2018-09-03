import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordExamplesComponent } from './word-examples.component';

describe('WordExamplesComponent', () => {
  let component: WordExamplesComponent;
  let fixture: ComponentFixture<WordExamplesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordExamplesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
