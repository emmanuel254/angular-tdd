import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCounterComponent } from './service-counter.component';
import {CounterService} from "../../shared/services/counter.service";
import {click, expectText, setFieldValue} from "../../shared/utilities/element-spec-helper";
import {BehaviorSubject, Observable, of} from "rxjs";

const currentCount = 123;

describe('ServiceCounterComponent: integration test', () => {
  let component: ServiceCounterComponent;
  let fixture: ComponentFixture<ServiceCounterComponent>;

  function expectCount(count: number){
    expectText(fixture, 'count', String(count))
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceCounterComponent ],
      providers: [CounterService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows the start count', () => {
    expectText(fixture, 'count', "0")
  });

  it('increments the count',  () => {
    click(fixture, 'increment-button');
    fixture.detectChanges();
    expectText(fixture, 'count', '1')
  });

  it('decrements the count', () => {
    click(fixture, 'decrement-button');
    fixture.detectChanges();
    expectText(fixture, 'count', '-1');
  });

  it('resets the count',  () => {
    const newCount = 456;
    setFieldValue(fixture, 'reset-input', String(newCount));
    click(fixture, 'reset-button');
    fixture.detectChanges()
    expectText(fixture, 'count', String(newCount))
  });
});

describe('ServiceCounterComponent: unit-test', () => {

  let component: ServiceCounterComponent;
  let fixture: ComponentFixture<ServiceCounterComponent>;
  //Declare the shared variable
  let fakeCounterService: CounterService;

  beforeEach(async () => {
    //Create a fake
    fakeCounterService = jasmine.createSpyObj<CounterService>(
        'CounterService',
        {
          getCount: of(currentCount),
          increment: undefined,
          decrement: undefined,
          reset: undefined
        })

    await TestBed.configureTestingModule({
      declarations: [ServiceCounterComponent],
      // Use fake instead of original
      providers: [
        { provide: CounterService, useValue: fakeCounterService }
      ]
    }).compileComponents()
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('shows the count', () => {
    expectText(fixture, 'count', String(currentCount));
    expect(fakeCounterService.getCount).toHaveBeenCalled()
  });

  it('increments the count', () => {
    click(fixture, 'increment-button');
    expect(fakeCounterService.increment).toHaveBeenCalled();
  })

  it('decrements the count', () => {
    click(fixture, 'decrement-button')
    expect(fakeCounterService.decrement).toHaveBeenCalled();
  })

  it('resets the count', () => {
    const newCount = 456;
    setFieldValue(fixture, 'reset-input', String(newCount));
    click(fixture, 'reset-button');
    expect(fakeCounterService.reset).toHaveBeenCalledWith(newCount);
  });
});

describe('ServiceCounterComponent: unit test with minimal service logic', () => {
  const newCount = 456;

  let component: ServiceCounterComponent;
  let fixture: ComponentFixture<ServiceCounterComponent>;

  let fakeCount$: BehaviorSubject<number>;
  let fakeCounterService: Pick<CounterService, keyof CounterService>;

  beforeEach(async () => {
    fakeCount$ = new BehaviorSubject<number>(0);

    fakeCounterService = {
      getCount(): Observable<number> {
        return fakeCount$;
      },
      increment() {
        fakeCount$.next(1);
      },
      decrement() {
        fakeCount$.next(-1);
      },
      reset() {
        fakeCount$.next(Number(newCount))
      }
    };

    spyOn(fakeCounterService, 'getCount').and.callThrough();
    spyOn(fakeCounterService, 'increment').and.callThrough();
    spyOn(fakeCounterService, 'decrement').and.callThrough();
    spyOn(fakeCounterService, 'reset').and.callThrough();

    await TestBed.configureTestingModule({
      declarations: [ServiceCounterComponent],
      providers: [
        { provide: CounterService, useValue: fakeCounterService}
      ]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('shows the start count', () => {
    expectText(fixture, 'count', '0');
    expect(fakeCounterService.getCount).toHaveBeenCalled();
  });

  it('increments the count', () => {
    click(fixture, 'increment-button');
    fakeCount$.next(1);
    fixture.detectChanges();

    expectText(fixture, 'count', '1');
    expect(fakeCounterService.increment).toHaveBeenCalled();
  });

  it('decrements the count', () => {
    click(fixture, 'decrement-button');
    fakeCount$.next(-1);
    fixture.detectChanges();

    expectText(fixture, 'count', '-1');
    expect(fakeCounterService.decrement).toHaveBeenCalled();
  });

  it('resets the count', () => {
    setFieldValue(fixture, 'reset-input', String(newCount));
    click(fixture, 'reset-button');
    fixture.detectChanges();

    expectText(fixture, 'count', String(newCount));
    expect(fakeCounterService.reset).toHaveBeenCalledWith(newCount);
  });
})
