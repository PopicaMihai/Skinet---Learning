import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from '../shared/models/product';
import { ShopService } from './shop.service';
import { Type } from '../shared/models/type';
import { Brand } from '../shared/models/brands';
import { ShopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search') searchTerm?: ElementRef;
  products: Product[] = [];
  brands: Brand[] = [];
  types: Type[] = [];
  shopParamas = new ShopParams();
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price Low to high', value: 'priceAsc' },
    { name: 'Price High to low', value: 'priceDesc' },
  ];
  totalCount: number = 0;

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
    this.shopService.getProducts(this.shopParamas).subscribe({
      next: response => {
        this.products = response.data;
        this.shopParamas.pageNumber = response.pageIndex;
        this.shopParamas.pageSize = response.pageSize;
        this.totalCount = response.count;
      },
      error: error => console.log(error)
    })
  }

  getBrands() {
    this.shopService.getBrands().subscribe({
      next: response => this.brands = [{id: 0, name: 'All'}, ...response],
      error: error => console.log(error)
    })
  }

  getTypes() {
    this.shopService.getTypes().subscribe({
      next: response => this.types = [{id: 0, name: 'All'}, ...response],
      error: error => console.log(error)
    })
  }

  onBrandSelected(brandId: number) {
    this.shopParamas.brandId = brandId;
    this.shopParamas.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.shopParamas.typeId = typeId;
    this.shopParamas.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(event: any) {
    this.shopParamas.sort = event.target.value;
    this.getProducts();
  }

  onPageChanged(event: any) {
    if (this.shopParamas.pageNumber !== event) {
      this.shopParamas.pageNumber = event;
      this.getProducts();
    }
  }

  onSearch() {
    this.shopParamas.search = this.searchTerm?.nativeElement.value;
    this.shopParamas.pageNumber = 1;
    this.getProducts();
  }

  onReset() {
    if (this.searchTerm) this.searchTerm.nativeElement.value = '';
    this.shopParamas = new ShopParams();
    this.getProducts();
  }
}
