import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifcationPage } from './notifcation.page';

describe('NotifcationPage', () => {
  let component: NotifcationPage;
  let fixture: ComponentFixture<NotifcationPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotifcationPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotifcationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
