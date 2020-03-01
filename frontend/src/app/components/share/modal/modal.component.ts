import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent {

  @Input() title: string;
  @Input() content: string;
  @Input() data: any;
  @Output() accept: EventEmitter<any> = new EventEmitter<any>();
 
  constructor(
    public modal: NgbActiveModal,
    private userService: UserService
  ) {}

  clickOk() {
    this.accept.emit(this.data);
    this.modal.close();
  }

}
