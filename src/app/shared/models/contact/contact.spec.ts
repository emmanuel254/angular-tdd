import {Contact} from "./contact";

describe('Contact Class Test', () => {
	let contact: Contact = null!;

	beforeEach(() => {
		contact = new Contact();
	})

	it('should have a valid constructor', function () {
		expect(contact).not.toBeNull();
	});

	it('should set name correctly through constructor', () => {
		contact = new Contact('John Doe');
		expect(contact.name).toEqual('John Doe');
	});

	it('should get and set id correctly',  () => {
		contact.id = 1;
		expect(contact.id).toEqual(1)
	});

	it('should get and set name correctly', () => {
		contact.name = 'Emmanuel';
		expect(contact.name).toEqual('Emmanuel');
	})

	afterEach(() => {
		contact = null!;
	})
})
