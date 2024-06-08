import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import {} from '@angular/fire/firestore';
import { ProductModel } from '../model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private storage: AngularFireStorage,
    private db: AngularFireDatabase
  ) {}

  save(product: ProductModel) {
    return this.db.list('product').push(product);
  }

  uploadImage(file: any) {
    const path = 'images/' + file.name;
    const ref = this.storage.ref(path);
    return ref.put(file);
  }
}
