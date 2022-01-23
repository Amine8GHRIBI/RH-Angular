import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IClient } from 'src/app/data-structure/client';
import { IEmployee } from 'src/app/data-structure/employee';
import { ClientService } from 'src/app/services/client.service';
@Component({
  selector: 'app-clients-grid',
  templateUrl: './clients-grid.component.html',
  styleUrls: ['./clients-grid.component.css']
})
export class ClientsGridComponent implements OnInit {
  public clients: IClient[];
  searchText: any;
  constructor(private clientService: ClientService, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.clientService.getClients().subscribe((data: IClient[]) => { this.clients = data; console.log(this.clients); });
  }
  public  deleteClient(id: String) {
    this.clientService.deleteClient(id).subscribe(
      response => {
        console.log("Success", response),
          this.toastr.success('', 'Employee deleted successfully', { timeOut: 1500, progressBar: false, progressAnimation: 'increasing' }),
          this.ngOnInit();
      },
      error => console.log('Error', error)
    );
  }
}