import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WorkoutApiService} from '../services/workout-api.service';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
  selector: 'app-entry-editor',
  templateUrl: './entry-editor.component.html',
  styleUrls: ['./entry-editor.component.css']
})
export class EntryEditorComponent implements OnInit {
  public workout: any = {};
  public loading = false;
  public maxDate: NgbDateStruct;
  public locations = [];
  constructor(private router: ActivatedRoute,
              private nav: Router,
              private api: WorkoutApiService) {
    const today = new Date();
    this.maxDate = NgbDate.from({year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() });
  }

  ngOnInit() {
    // this.api.getLocation().subscribe(data => this.locations = data);
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

  // locationsSearch = (text$: Observable<string>) =>
  //   text$.pipe( debounceTime(200),
  //     distinctUntilChanged(),
  //     map(term => term.length < 2 ? [] :
  //       this.locations.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)));

  locationsSearch = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      tap(() => this.loading = true),
      switchMap(term => this.api.searchLocations(term)),
      // used to load the data from json server by name filter
      map(locations => _.map(locations, 'name')),
      tap(() => this.loading = false)
    )

  locationFormatter = (loc) => loc.name;

  save() {
    this.loading = true;
    this.api.saveWorkout(this.workout).subscribe(data => {
      this.loading = false;
      this.nav.navigate(['/workouts']);
    });
  }

}
