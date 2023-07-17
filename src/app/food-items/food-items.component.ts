import { Component, OnInit } from '@angular/core';
import { DataShareService } from '../data-share.service';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-food-items',
  templateUrl: './food-items.component.html',
  styleUrls: ['./food-items.component.css']
})

export class FoodItemsComponent implements OnInit {
  foodItemsCollection: AngularFirestoreCollection<any>;
  foodItems: Observable<any[]>;

  constructor(public dataShareService: DataShareService,
    private router: Router,
    private firestore: AngularFirestore) { 

    if(dataShareService.email==''){
      this.router.navigate(['/']);
    }
    this.foodItemsCollection = this.firestore.collection<any>('food-items');
    this.foodItems = this.foodItemsCollection.valueChanges({ idField: 'id' });
  }

  ngOnInit(): void { }

  editFoodItem(item:any){
    this.dataShareService.recordId = item.id;
    this.dataShareService.record = item;
    delete this.dataShareService.record.id;
    this.router.navigate(['/food-entry']);
  }

  deleteFoodItem(itemId: string) {

    if(!confirm("Are you sure you want to delete the record?")) return ;

    this.firestore.collection('food-items').doc(itemId).delete()
      .then(() => {
        console.log('Food item deleted successfully!');
      })
      .catch((error) => {
        console.error('Error deleting food item:', error);
      });
  }

}
