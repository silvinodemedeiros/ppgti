import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlMenuComponent } from './gl-menu.component';

describe('GlMenuComponent', () => {
  let component: GlMenuComponent;
  let fixture: ComponentFixture<GlMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GlMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
