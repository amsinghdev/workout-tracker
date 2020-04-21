import { Component, OnInit } from '@angular/core';
import {WorkoutApiService} from '../services/workout-api.service';
// tslint:disable-next-line:import-spacing
import * as _ from  'lodash';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css']
})
export class WorkoutsComponent implements OnInit {
  public loading = false;
  public workouts = [];
  public isCollapsed;
  private _: any;
  constructor(private api: WorkoutApiService) { }

  ngOnInit() {
    this.isCollapsed = false;
    this.loading = true;
    this.api.getWorkouts().subscribe(data => {
      this.workouts = data;
      this.loading = false;
    });
  }

  deleteWorkout(id1) {
    this.api.deleteWorkout(id1).subscribe(data => _.remove(this.workouts, { id: id1 }));
  }

}
