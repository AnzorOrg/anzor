import {Component, Input} from 'angular2/core';

@Component({
	selector: 'modal',
	templateUrl: './app/modal/modal.html'
})
export class ModalComponent {
	@Input() title: string;

	hideModal = function(container) {
		container.setAttribute('hidden', 'true');
	};
}