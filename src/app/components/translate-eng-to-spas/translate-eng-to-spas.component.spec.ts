import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateEngToSpasComponent } from './translate-eng-to-spas.component';

describe('TranslateEngToSpasComponent', () => {
  let component: TranslateEngToSpasComponent;
  let fixture: ComponentFixture<TranslateEngToSpasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslateEngToSpasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslateEngToSpasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
