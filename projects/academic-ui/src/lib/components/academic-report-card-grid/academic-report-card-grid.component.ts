import { Component, OnInit, Input } from '@angular/core';
import { StudentReportSheet, TermPreset, RecordSheet } from '@dilta/shared';
import { KeysConfig } from '../dynamic-datagrid/dynamic-datagrid.component';

@Component({
  selector: 'acada-academic-report-card-grid',
  templateUrl: './academic-report-card-grid.component.html',
  styleUrls: ['./academic-report-card-grid.component.scss']
})
export class AcademicReportCardGridComponent implements OnInit {
  @Input()
  scoreSheet: RecordSheet[];

  @Input() term: TermPreset;

  public keys: KeysConfig[] = [
    { key: 'no', title: 'N/O', type: 'number', editable: false },
    { key: 'subject', title: 'Subject', type: 'string', editable: false },
    { key: 'firstCa', title: '1st C.A', type: 'number', editable: false },
    { key: 'secondCa', title: '2nd C.A', type: 'number', editable: false },
    { key: 'exam', title: 'Examination', type: 'number', editable: false },
    { key: 'total', title: 'Total', type: 'number', editable: false },
    { key: 'avg', title: 'Class Average', type: 'number', editable: false },
    { key: 'grade', title: 'Grade', type: 'string', editable: false }
  ];

  constructor() {}

  /**
   * Updates the table to configure displayed
   * tables different terms
   *
   * @param {TermPreset} term
   * @memberof AcademicReportCardGridComponent
   */
  updateKeys(term: TermPreset) {
    // this.reportSheet.scoreSheet.forEach(e => e.)
    if (term === TermPreset.Second || term === TermPreset.Third) {
      this.keys.push({
        key: '',
        title: '1st Term',
        type: 'number',
        editable: false
      });
    }
    if (term === TermPreset.Third) {
      this.keys.push({
        key: '',
        title: '2nd Term',
        type: 'number',
        editable: false
      });
    }
  }

  get data() {
    const scores = (this.scoreSheet) ?  this.scoreSheet : [];
    return scores.map((score, no) => Object.assign({}, score, { no: no + 1 }));
  }

  ngOnInit() {
    this.updateKeys(this.term);
  }
}