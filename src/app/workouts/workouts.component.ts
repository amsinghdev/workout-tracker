import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {WorkoutApiService} from '../services/workout-api.service';
// tslint:disable-next-line:import-spacing
import * as _ from  'lodash';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgbModalOptions} from '@ng-bootstrap/ng-bootstrap/modal/modal-config';
import {forkJoin} from 'rxjs';
import {PerformanceTargetModalComponent} from '../performance-target-modal/performance-target-modal.component';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class WorkoutsComponent implements OnInit {
  public loading = false;
  public workouts: any = [];
  public isCollapsed = false;
  private _: any;
  public perfTargets: any = {};
  public totals: any = {};
  public pageSize = 5;
  public currPage = 1;


  constructor(private api: WorkoutApiService, private modal: NgbModal ) { }

  ngOnInit() {
    forkJoin(
      //this.api.getWorkouts1(),
      this.api.getWorkoutsPaged(this.currPage, this.pageSize),
      this.api.getPerfTargets()
    ).subscribe(([workoutsResult, perfTargetsResult]) => {
      this.workouts = workoutsResult;
      this.perfTargets = perfTargetsResult;
      this.calculatePerformance();
      this.loading = false;
      console.log('**workouts', this.workouts, this.perfTargets);
    });
  }

  deleteWorkout(id1, deleteModal) {
    const option: NgbModalOptions = {size: 'sm'};
    this.modal.open(deleteModal, option).result.then(result => {
      this.api.deleteWorkout(id1).subscribe(data => _.remove(this.workouts, { id: id1 }));
    }, reason => console.log(`dismissed: ${reason}`));

  }

  showPerfTargets() {
    const modalRef = this.modal.open(PerformanceTargetModalComponent);
    modalRef.componentInstance.perfTargets = this.perfTargets;
    modalRef.result.then(result => {
      console.log('Modal result', result);
      this.loading = true;
      this.api.savePerfTargets(result).subscribe(data => {
        this.perfTargets = data;
        this.loading = false;
      });
    }, reason => {
      console.log(`Dismissed reason: ${reason}`);
    });
  }

  refreshGrid() {
    // let offset = (this.currPage - 1) * this.pageSize;
    // this.workouts = _.drop(this.workoutsOrig, offset).slice(0, this.pageSize);

    this.api.getWorkoutsPaged(this.currPage, this.pageSize).subscribe(data => this.workouts = data);
  }

  calculatePerformance() {
    const bikeTotal = _.chain(this.workouts).filter(x => x.type == 'bike').sumBy(x => +x.distance).value();
    const rowTotal = _.chain(this.workouts).filter(x => x.type == 'row').sumBy(x => +x.distance).value();
    const runTotal = _.chain(this.workouts).filter(x => x.type == 'run').sumBy(x => +x.distance).value();
    this.totals = { bike: bikeTotal, row: rowTotal, run: runTotal };
    console.log('**totals', this.totals);
  }
  getPBType(total: number, target: number) {
    const pct = (total / target) * 100;

    if (pct <= 25) {
      return 'success';
    } else if (pct > 25 && pct <= 50) {
      return 'info';
    } else if (pct > 50 && pct <= 75) {
      return 'warning';
    } else if (pct > 75) {
      return 'danger';
    }
  }
}
