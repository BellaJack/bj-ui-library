import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BjUiLibrary } from './bj-ui-library';

describe('BjUiLibrary', () => {
  let component: BjUiLibrary;
  let fixture: ComponentFixture<BjUiLibrary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BjUiLibrary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BjUiLibrary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
