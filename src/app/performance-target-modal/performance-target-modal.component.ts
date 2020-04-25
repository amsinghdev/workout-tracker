import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-performance-target-modal',
  templateUrl: './performance-target-modal.component.html',
  styleUrls: ['./performance-target-modal.component.css']
})
export class PerformanceTargetModalComponent implements OnInit {
  public perfTargets: any = {};
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }
  save() {
    this.activeModal.close(this.perfTargets);
  }
}
