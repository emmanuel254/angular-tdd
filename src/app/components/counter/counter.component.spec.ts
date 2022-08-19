import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterComponent } from './counter.component';
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {click, expectText, findElement, setFieldValue} from "../../shared/utilities/element-spec-helper";
import {take, toArray} from "rxjs";

const startCount = 123;
const newCount = 456;

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;

  function expectCount(count: number){
    expectText(fixture, 'count', String(count))
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    component.startCount = startCount;
    component.ngOnChanges();
    fixture.detectChanges();
  });

  it('show the start count', () => {
    expectCount(startCount);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('increments the count', () => {
    //Act
    click(fixture, 'increment-button')
    // Re-render the Component
    fixture.detectChanges();

    //Assert
    expectCount(startCount + 1)
  });

  it('decrements the count',  () => {
    click(fixture, 'decrement-button');
    fixture.detectChanges();
    expectCount(startCount - 1)
  });

  it('resets the count', () => {
    setFieldValue(fixture, 'reset-input', String(newCount));
    click(fixture, 'reset-button');
    fixture.detectChanges();
    expectCount(newCount)
  });

  it('does not reset if value is not a number', () => {
    const value = 'not a number';

    setFieldValue(fixture, 'reset-input', value);
    click(fixture, 'reset-button');
    fixture.detectChanges()

    expectCount(startCount);
  });

  it('emits countChange events', () => {
    let actualCounts: number[] | undefined;

    //Transform the observable then subscribe
    component.countChange.pipe(
      //Close the observable after 3 values
      take(3),
      toArray()
    ).subscribe((counts) => {
      actualCounts = counts;
    });

    //Act
    click(fixture, 'increment-button');
    click(fixture, 'decrement-button');
    setFieldValue(fixture, 'reset-input', String(0));
    click(fixture, 'reset-button');

    expect(actualCounts).toEqual([124, 123, 0])

  });
});
