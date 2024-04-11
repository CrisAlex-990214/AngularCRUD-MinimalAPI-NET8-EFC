import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { GenericService } from './generic.service';
import { Observable } from 'rxjs';
import { Product } from './product';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, FormsModule],
  providers: [GenericService],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent implements OnInit {
  products$!: Observable<Product[]>;
  id = 0; name = ''; price = 0;

  constructor(private service: GenericService<Product>){}

  ngOnInit(): void {
      this.list();
  }

  add() { 
    this.service.create({ id: 0, name: this.name, price: this.price }).subscribe(() => this.list());
  }

  update() { 
    this.service.update({ id: this.id, name: this.name, price: this.price }).subscribe(() => this.list());
  }

  delete() { 
    this.service.delete(this.id).subscribe(() => this.list());
  }

  getById() { 
    this.service.getById(this.id).subscribe((p) => {
      this.price = p.price;
      this.name = p.name;
    });
  }

  list() { this.products$ = this.service.get(); }
}
