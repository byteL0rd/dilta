import { AcademicService } from '../../services/academic.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ClientUtilService,
  schoolFeature,
  PrinterService
} from '@dilta/client-shared';
import { School, StudentReportSheet, StudentSheet } from '@dilta/shared';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { exhaustMap, first, map, combineLatest } from 'rxjs/operators';

@Component({
  selector: 'acada-academic-report-card-page',
  templateUrl: './academic-report-card-page.component.html',
  styleUrls: ['./academic-report-card-page.component.scss']
})
export class AcademicReportCardPageComponent implements OnInit {
  public reportSheet$: Observable<StudentReportSheet>;

  public school$: Observable<School>;

  constructor(
    private avr: ActivatedRoute,
    private acada: AcademicService,
    public util: ClientUtilService,
    private store: Store<any>,
    private printer: PrinterService
  ) {}

  /**
   * Cleans the arguments from string to Numbers
   *
   * @param {StudentSheet} { level, session, studentId, term }
   * @returns {StudentSheet}
   * @memberof ScoreSheet
   */
  cleanSheet({ level, session, studentId, term }: StudentSheet): StudentSheet {
    return {
      session,
      studentId,
      level: Number(level),
      term: Number(term)
    } as any;
  }

  /**
   * retrieves the student report card
   *
   * @returns
   * @memberof AcademicReportCardPageComponent
   */
  retrieveReportSheet() {
    return this.avr.params
      .pipe(map((param: StudentSheet) => this.cleanSheet(param)))
      .pipe(
        exhaustMap((sheet: StudentSheet) =>
          this.acada.studentReportSheet(sheet)
        )
      );
  }

  retrieveSchool() {
    return this.store.select(schoolFeature).pipe(map(store => store.details));
  }

  print() {
    this.reportSheet$
      .pipe(first())
      .subscribe(
        sheet => this.printer.reportCard(sheet),
        err => this.util.error(err)
      );
  }

  ngOnInit() {
    this.reportSheet$ = this.retrieveReportSheet();
    this.reportSheet$
      .pipe(first())
      .subscribe({ error: err => this.util.error(err) });
    this.school$ = this.retrieveSchool();
  }
}
