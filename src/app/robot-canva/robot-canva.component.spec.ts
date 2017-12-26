import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotCanvaComponent } from './robot-canva.component';

describe('RobotCanvaComponent', () => {
  let component: RobotCanvaComponent;
  let fixture: ComponentFixture<RobotCanvaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RobotCanvaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RobotCanvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
