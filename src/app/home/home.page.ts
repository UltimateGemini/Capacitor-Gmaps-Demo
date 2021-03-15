import { Component, ElementRef, ViewChild } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { CapacitorGoogleMaps } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('map') mapView: ElementRef;

  constructor() {
    this.init();
  }

  async init() {
    await CapacitorGoogleMaps.initialize({
      key: 'AIzaSyACLXvbfDe7uGt3vAI_JAhP0Ny0m20nn-8',
    });
  }

  async ionViewDidEnter() {
    const boundingRect = this.mapView.nativeElement.getBoundingClientRect() as DOMRect;

    CapacitorGoogleMaps.create({
      width: Math.round(boundingRect.width),
      height: Math.round(boundingRect.height),
      x: Math.round(boundingRect.x),
      y: Math.round(boundingRect.y),
      latitude: -33.86,
      longitude: 151.2,
      zoom: 12,
    });

    CapacitorGoogleMaps.addListener("onMapReady", async function() {
      // We can do all the magic here when map is ready
      CapacitorGoogleMaps.addMarker({
        latitude: -33.86,
        longitude: 151.20,
        title: "Custom Title",
        snippet: "Custom Snippet",
      });

      CapacitorGoogleMaps.setMapType({
        "type": "normal"
      })
    })
  }

  ionViewDidLeave() {
    CapacitorGoogleMaps.close();
  }
}
