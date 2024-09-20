import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcesoriolistComponent } from './acesoriolist.component';

describe('AcesoriolistComponent', () => {
  let component: AcesoriolistComponent;
  let fixture: ComponentFixture<AcesoriolistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcesoriolistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcesoriolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
