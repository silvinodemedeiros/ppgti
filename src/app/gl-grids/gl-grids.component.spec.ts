import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlGridsComponent } from './gl-grids.component';

describe('GlGridsComponent', () => {
  let component: GlGridsComponent;
  let fixture: ComponentFixture<GlGridsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlGridsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GlGridsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
