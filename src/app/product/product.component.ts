import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './service/product.service';
import { ProductModel } from './model/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private actRouter: ActivatedRoute,
    public ngZone: NgZone,
    public router: Router
  ) {}

  ngOnInit() {
    this.actRouter.paramMap.subscribe((paramMap) => {
      this.key = paramMap.get('key')?.toString();
      if (this.key) {
        this.productService.getByKey(this.key).subscribe((product: any) => {
          this.productForm.patchValue(product);
        });
      }
    });
  }

  setImage = false;

  submitError = {
    message: 'Houve um erro ao tentar realizar o cadastro!',
    showAlert: false,
  };

  key?: string;

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    brand: new FormControl('', [Validators.required]),
    size: new FormControl('', [Validators.required]),
    price: new FormControl('', [
      Validators.required,
      Validators.pattern(/(^\d+$)|(^\d+,\d{1,2}$)/),
    ]),
    description: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  });

  selectFile(event: any) {
    const file = event.target.files[0];
    this.productService.uploadImage(file).then((result) => {
      result.ref.getDownloadURL().then((url) => {
        this.productForm.controls.image.patchValue(url);
      });
    });
  }

  onSubmit(): void {
    if (this.productForm.controls.image.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const product = this.productForm.value as ProductModel;

    if (this.key) {
      this.productService
        .update(this.key, product)
        .then((result) => {
          console.log('Produto atualizado');
        })
        .catch((error) => console.log(error.toString()));
    } else {
      this.productService
        .save(product)
        .then(() => {
          console.log('Produto cadastrado');
        })
        .catch((error) => {
          this.submitError = {
            message: error.toString(),
            showAlert: true,
          };
        });
    }
  }
}
