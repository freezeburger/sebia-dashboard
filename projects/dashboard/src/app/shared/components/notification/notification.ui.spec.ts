import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationUi } from './notification.ui';

describe('NotificationUi', () => {
  let component: NotificationUi;
  let fixture: ComponentFixture<NotificationUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationUi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationUi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
