import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import {} from '@angular/fire/firestore';
import { ProductModel } from '../model/product.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  getByKey(key: any) {
    return this.db.object('product/' + key).valueChanges();
  }

  update(key: any, product: ProductModel) {
    return this.db.object('product/' + key).update(product);
  }

  delete(key: any): Observable<void> {
    return new Observable<void>((observer) => {
      this.db.object('product/' + key).remove()
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  getAll() {
    return this.db
      .list('product')
      .snapshotChanges()
      .pipe(
        map((changes) => {
          return changes.map((c) => ({
            key: c.key,
            ...(c.payload.val() as ProductModel),
          }));
        })
      );
  }

  uploadImage(file: any) {
    const path = 'images/' + file.name;
    const ref = this.storage.ref(path);
    return ref.put(file);
  }
}
