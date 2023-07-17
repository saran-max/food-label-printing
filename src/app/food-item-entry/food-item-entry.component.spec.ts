import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodItemEntryComponent } from './food-item-entry.component';

describe('FoodItemEntryComponent', () => {
  let component: FoodItemEntryComponent;
  let fixture: ComponentFixture<FoodItemEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodItemEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodItemEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
