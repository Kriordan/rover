import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, mergeMap } from 'rxjs/operators';

import { MarsRoverService } from './mars-rover.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  cameras: any;
  dropdownActive = false;
  sortedPhotos: any;
  photos: any;
  rover: any;
  sol: any;

  solInput = new FormControl('');

  constructor(
    private marsRoverService: MarsRoverService
  ) { }
  
  ngOnInit() {
    this.marsRoverService.getRover()
      .pipe(
        map( (data: any) => {
          this.cameras = data.rover.cameras;
          this.cameras.forEach(camera => camera.active = true);
          this.rover = data.rover;
          this.sol = Math.floor(Math.random() * Math.floor(data.rover.max_sol));
          this.solInput.setValue(this.sol);
        }),
        mergeMap( max_sol => this.marsRoverService.getPhotos(this.sol))
      )
      .subscribe( (data: any) => {
        this.photos = data.photos;
        this.sortedPhotos = this.sortPhotosByCamera(data.photos);
      });
  }

  get filterPhotos() {
    return this.cameras.filter(camera => camera.active === true);
  }

  sortPhotosByCamera(photos) {
    const sortedPhotos = {};
    this.cameras.forEach(camera => sortedPhotos[camera.name] = []);
    photos.forEach(photo => {
      sortedPhotos[photo.camera.name].push(photo);
    })
    return sortedPhotos;
  }

  toggleCamera(cameraName) {
    const camera = this.cameras.find(({ name }) => name === cameraName);
    camera.active = !camera.active;
  }

  updateSol(sol) {
    this.sol = sol;
    this.marsRoverService.getPhotos(sol)
      .subscribe( (data: any) => {
        this.photos = data.photos;
        this.sortedPhotos = this.sortPhotosByCamera(data.photos);
      });
  }

  toggleDropdown() {
    this.dropdownActive = !this.dropdownActive;
  }
}
