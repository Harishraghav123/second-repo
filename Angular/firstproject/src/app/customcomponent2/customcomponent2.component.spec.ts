import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Customcomponent2Component } from './customcomponent2.component';

describe('Customcomponent2Component', () => {
  let component: Customcomponent2Component;
  let fixture: ComponentFixture<Customcomponent2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Customcomponent2Component]
    });
    fixture = TestBed.createComponent(Customcomponent2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
