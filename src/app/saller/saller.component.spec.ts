import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SallerComponent } from './saller.component';

describe('TeamComponent', () => {
  let component: SallerComponent;
  let fixture: ComponentFixture<SallerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SallerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SallerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
