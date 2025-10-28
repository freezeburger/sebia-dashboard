import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterUi } from './footer.ui';

describe('FooterUi', () => {
  let component: FooterUi;
  let fixture: ComponentFixture<FooterUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterUi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterUi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
