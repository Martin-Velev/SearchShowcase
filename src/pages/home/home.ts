import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { generateRandomList } from '../../utils/generateRandomList'

const sortMethods = ['Insertion sort', 'Bubble sort'];
const DEFAULT_INTERVAL = 220; // in milliseconds

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  listLength: number = 12;
  lists: RandomizedList[];
  interval: any;
  sortIndexies: any = {};
  intervalLength: number = DEFAULT_INTERVAL;

  constructor(public navCtrl: NavController) {
    this.lists = sortMethods.map(sortMethod => {
      const array = generateRandomList(this.listLength);
      return {
        sortMethod,
        array
      }
    })

    for (let method of sortMethods) {
      this.sortIndexies[method] = 0;
    }
  }

  sort = (sortMethod: string) => {
    const currentList = this.findList(sortMethod);
    let sortCallback;
    switch(sortMethod) {
      case 'Insertion sort':
        sortCallback = this.insertionSort
        break;
      case 'Bubble sort':
        sortCallback = this.bubbleSort
        break;
    }

    this.interval = setInterval(() => {
      if (this.sortIndexies[sortMethod] >= currentList.length) {
        this.sortIndexies[sortMethod] = 0
        clearInterval(this.interval)
        return;
      } else {
        sortCallback(currentList)
        this.sortIndexies[sortMethod] = this.sortIndexies[sortMethod] + 1
      }
    }, this.intervalLength)
  }

  insertionSort = (list: number[]) => {
    let i = this.sortIndexies['Insertion sort']
    let value = list[i]
    for (let j = i - 1; j > -1 && list[j] > value; j--) {
      list[j + 1] = list[j]
    }
    list[j + 1] = value
  }

  bubbleSort = (list: number[]) => {
    for(let i = 0; i < list.length - 1; i++) {
      if(list[i] > list[i + 1]) {
        let swap = list[i];
        list[i] = list[i + 1];
        list[i + 1] = swap;
      }
    }
  }

  findList = (sortMethod: string) => {
    return this.lists.filter(list => list.sortMethod === sortMethod)[0].array;
  }

  disorderList = (list: RandomizedList) => {
    list.array = generateRandomList(this.listLength);
    this.sortIndexies[list.sortMethod] = 0
  }
}

interface RandomizedList {
  sortMethod: string;
  array: number[];
}
