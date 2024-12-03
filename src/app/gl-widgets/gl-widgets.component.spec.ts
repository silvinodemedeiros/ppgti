import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlWidgetsComponent } from './gl-widgets.component';

describe('GlWidgetsComponent', () => {
  let component: GlWidgetsComponent;
  let fixture: ComponentFixture<GlWidgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlWidgetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GlWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
