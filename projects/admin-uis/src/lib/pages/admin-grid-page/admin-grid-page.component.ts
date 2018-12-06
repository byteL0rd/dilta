import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransportService } from '@dilta/electron-client';
import {
  EntityNames,
  FindResponse,
  ModelOperations,
  User
  } from '@dilta/shared';
import { KeysConfig } from 'projects/academic-ui/src/lib/components/dynamic-datagrid/dynamic-datagrid.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type CleanUser = User & { no: number };

@Component({
  selector: 'admin-ui-admin-grid-page',
  templateUrl: './admin-grid-page.component.html',
  styleUrls: ['./admin-grid-page.component.scss']
})
export class AdminGridPageComponent implements OnInit {

  public users$: Observable<CleanUser[]>;

  public keys: KeysConfig[] = [
    { key: 'no', title: 'N/O', type: 'number', editable: false, send: true },
    { key: 'name', title: 'Name', type: 'string', editable: false, send: true  },
    { key: 'phoneNo', title: 'Phone No', type: 'string', editable: false, send: true  },
    { key: 'gender', title: 'Gender', type: 'string', editable: false, send: true  },
    { key: 'address', title: 'Address', type: 'string', editable: false, send: true  },
  ];

  constructor(private transport: TransportService, private router: Router) { }

  newAdmin() {
    this.router.navigate(['auth', 'signup']);
  }

  /**
   * Clean Data to match grid
   *
   * @param {User[]} admins
   * @returns
   * @memberof AdminGridPageComponent
   */
  cleanData(admins: User[]): CleanUser[] {
    return admins.map((admin, no) => Object.assign({}, admin, { no: no + 1 }));
  }

  retriveUsers() {
    return this.transport.modelAction<FindResponse<User>>(EntityNames.User, ModelOperations.Find, {})
      .pipe(map((data) => this.cleanData(data.data)));
  }

  ngOnInit() {
    this.users$ = this.retriveUsers();
  }

}