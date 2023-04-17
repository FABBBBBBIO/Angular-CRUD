import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from '../services/employee.service';

export interface employee{
    _links: any;
    _embedded: any;
    employeeId: number;
    firstName: string;
    lastName: string;
    phone: string;
}


@Component({
    selector: 'app-my-table',
    templateUrl: './my-table.component.html',
    styleUrls: ['./my-table.component.css']
  })


export class MyTableComponent implements OnInit
{
   
    data: any
    displayedColumns: string[] = ['id', 'birthDate', 'firstName', 'lastName', 'gender', 'hireDate', 'actions'];
    

  constructor(private employeeService: EmployeeService){
    
  }

  ngOnInit(): void {
    this.loanData("http://localhost:8080/employees");
  }

  loanData(url: string): void{
  
    this.employeeService.get(url).subscribe(
      data => {
        this.data = data
        console.log(this.data);
      }
    )

  }

  firstPage(){
    if(this.data) this.loanData(this.data._links.first.href);
  }
  prevPage(){
    if(this.data) this.loanData(this.data._links.prev.href);
  }
  nextPage(){
    if(this.data) this.loanData(this.data._links.next.href);
  }
  lastPage(){
    if(this.data) this.loanData(this.data._links.last.href);
  }
  deleteEmployee(){
  }

}
