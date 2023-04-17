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

    displayedColumns: string[] = ['id', 'birthDate', 'firstName', 'lastName', 'gender', 'hireDate', 'actions','actions2'];

    currentUrl: string="http://localhost:9000/employees";

    currentElement: any={};

    links: any;

  constructor(private employeeService: EmployeeService){
    this.loanData(this.currentUrl);
  }

  ngOnInit(): void {
    this.loanData("http://localhost:9000/employees");
  }

  loanData(url: string): void{
  
    this.employeeService.get(url).subscribe(
      data => {
        this.data = data
        console.log(this.data);
      }
    )

  }

  //impaginazione
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

  //cancellazione
  deleteEmployee(urlWithId: string){
    this.employeeService.delete(urlWithId).subscribe( (data) =>{
      this.loanData(this.currentUrl);
    }
    );
  }

  //aggiunta e modifica
  addEmployee(){
    if(this.currentElement.id){
      this.employeeService.put(this.currentElement._links.self.href, this.currentElement).subscribe( (data) => {
        this.loanData(this.currentUrl);
        }
      )
    } else{
      this.employeeService.post("http://localhost:9000/employees",this.currentElement).subscribe( (data) => {
        this.loanData(this.links.last.href);
        } 
      )
    }
  }
}
