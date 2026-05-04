import { AfterViewInit, Component } from '@angular/core';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [],
  templateUrl: './cv.component.html',
  styleUrl: './cv.component.scss',
})
export class CvComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.file();
  }
  storage = getStorage();

  file() {
    const storage = getStorage();
    getDownloadURL(ref(storage, 'cv/Lebenslauf.pdf')).then((url) => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = (event) => {
        const blob = xhr.response;
      };
      xhr.open('GET', url);
      xhr.setRequestHeader('Access-Control-Allow-Headers', '*');
      xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
      xhr.setRequestHeader('Content-type', 'application/pdf');
      xhr.send();

      const embed = document.getElementById('pdf');
      embed?.setAttribute('src', url);
    });
  }
}
