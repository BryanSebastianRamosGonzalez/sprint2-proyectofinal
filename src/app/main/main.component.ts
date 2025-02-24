import { Component } from '@angular/core';
import { catalogo } from '../models/catalogo';
import { catalogo1 } from '../models/catalogo';
import { catalogo2 } from '../models/catalogo';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  imports: [FormsModule, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  catalogoList: catalogo[] = [
    {
      title: 'Ciel 355ml ',
      description: 'Paquete de 12 agua ciel 355ml',
      cost: 95,
      status: false,
      img: "/hidratacion/ciel355.webp",
      total: 1,
    }
  ];
  catalogoList1: catalogo1[] = [
    {
      title: 'Edredon Necaxa',
      description: 'Edredon matrimonial con logo',
      cost: 500,
      status: false,
      img: '/textil/edredon.jpg',
      total: 3,
    }
  ];
  catalogoList2: catalogo2[] = [
    {
      title: 'Extension',
      description: 'Extension uso rudo ',
      cost: 350,
      status: false,
      img: '/mtto/extension.webp',
      total: 4,
    }
  ];

  newProduct: catalogo = {
    title: '',
    description: '',
    cost: 0,
    status: false,
    img: '',
    total: 0
  };

  selectedCatalogo: any[] = [];
  selectedImage: string | ArrayBuffer | null = null;

  onSelectionChange(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue === 'catalogoList') {
      this.selectedCatalogo = this.catalogoList;
    } else if (selectedValue === 'catalogoList1') {
      this.selectedCatalogo = this.catalogoList1;
    } else if (selectedValue === 'catalogoList2') {
      this.selectedCatalogo = this.catalogoList2;
    }
  }

  addNew() {
    if (
      this.newProduct.title !== "" &&
      this.newProduct.cost !== 0 &&
      this.newProduct.total !== 0 &&
      this.newProduct.description !== "" &&
      this.newProduct.img !== ""
    ) {
      this.selectedCatalogo.push({ ...this.newProduct });
      this.setValues();
    } else {
      alert("Es necesario capturar todos los campos");
    }
  }

  setValues() {
    this.newProduct = {
      title: '',
      description: '',
      cost: 0,
      status: false,
      img: '',
      total: 0
    };
    this.selectedImage = null;
  }

  cancel() {
    this.setValues();
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.newProduct.img = e.target.result;
      this.selectedImage = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  increaseQuantity(item: any) {
    item.total += 1;
    item.status = item.total > 0;
  }

  decreaseQuantity(item: any) {
    if (item.total > 0) {
      item.total -= 1;
    }
    item.status = item.total > 0;
  }

  getTotalCost(item: any): number {
    return item.total * item.cost;
  }

  getStatus(item: any): string {
    return item.total > 0 ? 'Disponible' : 'No disponible';
  }

  selectedOption: string = '';

  ngOnInit() {
    this.selectedOption = 'catalogoList'; // Default selection
    this.onSelectionChange({ target: { value: this.selectedOption } });
  }
}
