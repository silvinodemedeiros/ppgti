import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlHeaderComponent } from './gl-header.component';

describe('GlHeaderComponent', () => {
  let component: GlHeaderComponent;
  let fixture: ComponentFixture<GlHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GlHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
