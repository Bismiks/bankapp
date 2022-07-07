import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  @Input() item: string | undefined //input decorator

  @Output() onCancel = new EventEmitter()
  
  @Output() onDelete = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }


  delete() {
    this.onDelete.emit(this.item)
  }

  cancel() {
    this.onCancel.emit()
  }
}
