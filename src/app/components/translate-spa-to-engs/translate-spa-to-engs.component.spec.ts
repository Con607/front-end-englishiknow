import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateSpaToEngsComponent } from './translate-spa-to-engs.component';

describe('TranslateSpaToEngsComponent', () => {
  let component: TranslateSpaToEngsComponent;
  let fixture: ComponentFixture<TranslateSpaToEngsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslateSpaToEngsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslateSpaToEngsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
