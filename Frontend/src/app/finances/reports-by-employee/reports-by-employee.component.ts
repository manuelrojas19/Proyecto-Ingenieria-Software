import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Commission } from 'src/app/core/models/commission';
import { Employee } from 'src/app/core/models/employee';
import { Facture } from 'src/app/core/models/facture';
import { CommissionService } from 'src/app/core/services/commission.service';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { FactureService } from 'src/app/core/services/facture.service';

@Component({
  selector: 'app-reports-by-employee',
  templateUrl: './reports-by-employee.component.html',
  styleUrls: ['./reports-by-employee.component.css']
})
export class ReportsByEmployeeComponent implements OnInit {
  employee: Employee;
  commissions: Commission[];
  viatics: Commission[];
  transports: Commission[];
  factures: Facture[];
  amount: number;
  amountViatics: Number;
  amounTransports: Number;

  constructor(private employeeService: EmployeeService,
    private commissionService: CommissionService,
    private factureService: FactureService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getEmplooyee();
  }

  getEmplooyee() {
    this.employeeService.getEmployeeById(this.route.snapshot.params.id).subscribe(employee => {
      this.employee = employee;
      this.getCommissions();
      this.getFactures();
    });
  }

  getCommissions() {
    this.commissionService.getCommissionsByEmployeeId(this.employee.id.toString()).subscribe(commissions => {
      this.commissions = commissions;
      this.filterCommissions();
    });
  }


  getFactures() {
    this.factureService.getFacturesByEmployee(this.employee.id.toString()).subscribe(factures => {
      this.factures = factures;
      this.getData();
    });
  }


  filterCommissions() {
    this.transports = this.commissions.filter(commission => commission.typeCommission === 'Transporte' && commission.isApprovedByFinances === true);
    this.viatics = this.commissions.filter(commission => commission.typeCommission === 'Viaticos' && commission.isApprovedByFinances === true); 
  }

  getData() {
    this.amount = this.factures.map(facture => facture.amount).reduce((a, b) => Number(a) + Number(b));
  }

}
