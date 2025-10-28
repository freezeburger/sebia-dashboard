import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderUi } from './header.ui';

describe('HeaderUi', () => {
  let component: HeaderUi;
  let fixture: ComponentFixture<HeaderUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderUi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderUi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
