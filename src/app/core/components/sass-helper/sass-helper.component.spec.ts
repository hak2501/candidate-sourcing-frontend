import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SassHelperComponent } from './sass-helper.component';

describe('SassHelperComponent', () => {
  let component: SassHelperComponent;
  let fixture: ComponentFixture<SassHelperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SassHelperComponent]
    });
    fixture = TestBed.createComponent(SassHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
