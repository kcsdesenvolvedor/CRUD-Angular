import { HttpClient } from '@angular/common/http';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  id = this.route.snapshot.paramMap.get('id');
  product: Product = {
    name: "",
    price: 0,
    id: 0
  };

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.productService.readById(this.id!)
      .subscribe(product => {
        this.product = product;
      });
  }

  deleteProduct(): void {

    this.productService.delete(this.id!)
      .subscribe(() => {
        this.productService.showMessage('Produto deletado com sucesso');
        this.router.navigateByUrl('products');
      })
  }

  cancel(): void {
    this.router.navigateByUrl('products');
  }

}
