import {CounterComponent} from "../components/counter/counter.component";
import {Component, EventEmitter, Input, NO_ERRORS_SCHEMA, Output} from "@angular/core";
import {HomeComponent} from "./home.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {findComponent} from "../shared/utilities/element-spec-helper";

@Component({
	selector: 'app-counter',
	template: ''
})
export class FakeCounterComponent implements Partial<CounterComponent>{
	@Input()
	public startCount = 0;

	@Output()
	public countChange = new EventEmitter<number>()
}
describe('HomeComponent (faking a child component)', () => {
	let component: HomeComponent;
	let counter: FakeCounterComponent
	let fixture: ComponentFixture<HomeComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ HomeComponent, FakeCounterComponent ],
			schemas: [NO_ERRORS_SCHEMA]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(HomeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	beforeEach(() => {
		const counterEl = fixture.debugElement.query(
			By.directive(FakeCounterComponent)
		);
		counter = counterEl.componentInstance;
	})

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
});
