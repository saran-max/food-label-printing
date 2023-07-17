import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataShareService } from '../data-share.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'food-item-entry',
  templateUrl: './food-item-entry.component.html',
  styleUrls: ['./food-item-entry.component.css']
})
export class FoodItemEntryComponent implements OnInit {
  productForm = {
    productName: 'Chiken biryani',
    suitableFor:'Non-Vegitarian',
    description: 'With Lurpak® by your side you’re always ready to cook, bake and fry up wonders, cook. With its delicate taste, Lurpak® Unsalted Butter enhances the flavour of whatever food you add it to. From a hearty risotto dish, your weekend baking creations, to some simple earthy mushrooms, its subtle notes complement every creation you rustle up in the kitchen. For people who love Good Food, Lurpak® makes it even better. Now sleeves up. Today we cook bold.',
    nutrients:'',
    allergies:[{ name: 'Eggs', path: 'eggs' , selected:false},
    { name: 'Fish', path: 'fish' , selected:true},
    { name: 'Gluten', path: 'gluten', selected:false },
    { name: 'Lupin', path: 'lupin' , selected:true},
    { name: 'Milk', path: 'milk' , selected:false},
    { name: 'Mollusc', path: 'mollusc', selected:true },
    { name: 'Mustard', path: 'mustard', selected:false },
    { name: 'Peanut', path: 'peanut' , selected:true},
    { name: 'Sesame', path: 'sesame' , selected:false},
    { name: 'Crustaceans', path: 'crustaceans' , selected:true},
    { name: 'SO2', path: 'so2' , selected:false},
    { name: 'Soya Beans', path: 'soyaBeans', selected:false },
    { name: 'Tree Nuts', path: 'treeNuts', selected:true },
    { name: 'Celery', path: 'celery', selected:false }],
    usedByDate:null,
    image:'',
    quantity: '350grms',
    calories:null,
    protein:null,
    carbs:null,
    fat:null
  };

  isPrinting = false;

  isPrintingPreview1 = false;
  isPrintingPreview2 = false;
  isPrintingPreview3 = false;

  logo = '';

  noOfCopies= '8';

   constructor(private formBuilder: FormBuilder,
    public dataShareService: DataShareService,
      private router: Router,
      private firestore: AngularFirestore) {}

  ngOnInit() {

    if(this.dataShareService.email==''){
      this.router.navigate(['/']);
    }

    if(this.dataShareService.recordId){
      this.productForm = this.dataShareService.record;
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.productForm.image = e.target.result;      
      };
      reader.readAsDataURL(file);
    }
  }

  getAllergyItems(){
    return this.productForm.allergies.filter(r => r.selected).map(allergy => allergy.name).join(', ');
  }

  printDiv(): void {
    const printWindow:any = window.open('', '_blank');
    const divToPrint:any = document.getElementById('divToPrint');
    
    // Generate the HTML content for printing
    const printContent = `
      <html>
        <head>
          <title>Print</title>
          <style>
            /* Additional styles for printing */
            @media print {
              .print-item {
                width: 50%;
                display: inline-block;
                margin: 0%;
              }
            }
          </style>
        </head>
        <body>
          ${this.generatePrintItems(divToPrint.innerHTML)}
        </body>
      </html>
    `;
    
    printWindow.document.open();
    printWindow.document.write(printContent);
    printWindow.document.close();
    
    // printWindow.focus();
    // printWindow.print();
  }
  
  generatePrintItems(content: string): string {
    let count =  Number(this.noOfCopies);
    let printItems = '';
    
    for (let i = 0; i < count; i++) {
      printItems += `<div class="print-item">${content}</div>`;
    }
    
    return printItems;
  }
  
  

  saveFoodItem(){

    this.firestore.collection('food-items').add(this.productForm)
    .then((docRef) => {
      alert('Food item saved ');
      this.router.navigate(['/food-items']);
    })
    .catch((error) => {
      console.error('Error saving food item: ', error);
    });
  }

  updateFoodItem() {
    this.firestore.collection('food-items').doc(this.dataShareService.recordId).update(this.productForm)
      .then(() => {
        alert('Food item updated successfully');
        this.router.navigate(['/food-items']);
      })
      .catch((error) => {
        console.error('Error updating food item: ', error);
      });
  }
  
  goBack(){
    this.router.navigate(['/food-items']);
  }

  printLabel(){

  }

}
