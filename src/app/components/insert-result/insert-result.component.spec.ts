import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertResultComponent } from './insert-result.component';

describe('InsertResultComponent', () => {
  let component: InsertResultComponent;
  let fixture: ComponentFixture<InsertResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertResultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsertResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
