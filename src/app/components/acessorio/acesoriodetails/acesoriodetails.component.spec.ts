import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcesoriodetailsComponent } from './acesoriodetails.component';

describe('AcesoriodetailsComponent', () => {
  let component: AcesoriodetailsComponent;
  let fixture: ComponentFixture<AcesoriodetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcesoriodetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcesoriodetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
