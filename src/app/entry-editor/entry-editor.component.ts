import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WorkoutApiService} from '../services/workout-api.service';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-entry-editor',
  templateUrl: './entry-editor.component.html',
  styleUrls: ['./entry-editor.component.css']
})
export class EntryEditorComponent implements OnInit {
  public workout: any = {};
  public loading = false;
  public maxDate: NgbDateStruct;
  constructor(private router: ActivatedRoute,
              private nav: Router,
              private api: WorkoutApiService) {
    const today = new Date();
    this.maxDate = NgbDate.from({year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() });
  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      if (params.id !== 'new') {
        this.loading = true;
        this.api.getWorkout(params.id).subscribe(data => {
          this.workout = data;
          this.loading = false;
        });
      }
    });
  }

  save() {
    this.loading = true;
    this.api.saveWorkout(this.workout).subscribe(data => {
      this.loading = false;
      this.nav.navigate(['/workouts']);
    });
  }

}
