import {ContactComponent} from "./contact.component";
import {Contact} from "../shared/models/contact/contact";

describe('ContactComponent Tests', () => {
	let contactComponent: ContactComponent = null!

	beforeEach(() => {
		contactComponent = new ContactComponent();
	})

	it('should set instance correctly', () => {
		expect(contactComponent).not.toBeNull();
	})

	it('should be no contacts if there is no data', function () {
		expect(contactComponent.contacts.length).toBe(0)
	});

	it('should be contacts if there is data', function () {
		const newContact: Contact = {
			id: 1,
			name: 'Chesire'
		}

		contactComponent.contacts = [newContact];

		expect(contactComponent.contacts.length).toBe(1)
	});
})
