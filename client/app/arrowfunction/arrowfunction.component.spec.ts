import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrowfunctionComponent } from './arrowfunction.component';

describe('ArrowfunctionComponent', () => {
  let component: ArrowfunctionComponent;
  let fixture: ComponentFixture<ArrowfunctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrowfunctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrowfunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
