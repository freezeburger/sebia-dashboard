import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationFeature } from './navigation.feature';

describe('NavigationFeature', () => {
  let component: NavigationFeature;
  let fixture: ComponentFixture<NavigationFeature>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationFeature]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationFeature);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
