import {ComponentFixture, TestBed} from "@angular/core/testing";
import {HomeComponent} from "./home.component";
import {CounterComponent} from "../components/counter/counter.component";
import {MockComponent} from "ng-mocks";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('HomeComponent with ng-mocks', () => {
	let fixture: ComponentFixture<HomeComponent>;
	let component: HomeComponent;
	//Original type!
	let counter: CounterComponent;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [HomeComponent, MockComponent(CounterComponent)],
			schemas: [NO_ERRORS_SCHEMA]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(HomeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	})

	beforeEach(() => {
		const counterEl = fixture.debugElement.query(
			By.directive(CounterComponent)
		);
		counter = counterEl.componentInstance;
	});

	it('renders an independent counter', () => {
		expect(counter).toBeTruthy();
	})

	it('passes a start count',  () => {
		expect(counter.startCount).toBe(5);
	});

	it('listens for count changes',  () => {
		spyOn(console, 'log');
		const count = 5;
		counter.countChange.emit(5);
		expect(console.log).toHaveBeenCalledWith(
			'countChange event from CounterComponent',
			count
		)
	});
})
