import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {By} from "@angular/platform-browser";
import {findComponent} from "../shared/utilities/element-spec-helper";
import {FakeCounterComponent} from "./home.component.fake-child.spec";
import {CounterComponent} from "../components/counter/counter.component";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders without errors', () => {
    expect(component).toBeTruthy();
  });

  describe('independent counter', () => {
    it('renders an independent counter', () => {
      const el = findComponent(fixture, 'app-counter');
      expect(el).toBeTruthy();
    });

    it('passes a start count', () => {
      const el = findComponent(fixture, 'app-counter');
      expect(el.properties['startCount']).toBe(5);
    });

    it('listens for count changes', () => {
      spyOn(console, 'log');
      const el = findComponent(fixture, 'app-counter');
      const count = 5;
      el.triggerEventHandler('countChange', 5);
      expect(console.log).toHaveBeenCalledWith(
          'countChange event from CounterComponent',
          count,
      );
    });
  });

  it('renders a service counter', () => {
    const serviceCounter = findComponent(fixture, 'app-service-counter');
    expect(serviceCounter).toBeTruthy();
  })

  // it('renders a NgRx counter', () => {
  //   const ngRxCounter = findComponent(fixture, 'app-ngrx-counter');
  //   expect(ngRxCounter).toBeTruthy();
  // })
});
