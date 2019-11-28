import { Component, OnInit } from '@angular/core';
import {AlertService} from '../../services/alert.service';
import {Alert} from '../../models/alert';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  public alert: Alert;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.alertSubject.subscribe((alert) => this.alert = alert);
  }

  public typeToClass(type: string) {
    return `alert alert-${type}`;
  }

}
