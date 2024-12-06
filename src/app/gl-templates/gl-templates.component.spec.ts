import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlTemplatesComponent } from './gl-templates.component';

describe('GlTemplatesComponent', () => {
  let component: GlTemplatesComponent;
  let fixture: ComponentFixture<GlTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlTemplatesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GlTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
