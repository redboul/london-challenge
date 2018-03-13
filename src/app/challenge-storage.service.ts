import { UserService } from './user.service';
import { AuthenticationService } from './authentication.service';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from 'angularfire2/storage';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/catch';

@Injectable()
export class ChallengeStorageService {
  downloadUrlCache = new Map<string, Observable<any>>();
  downloadMetadataCache = new Map<string, Observable<any>>();
  constructor(
    private storage: AngularFireStorage,
    private userService: UserService,
  ) { }
  addFile(file: File): AngularFireUploadTask {
    return this.storage.upload(
      `users/${this.userService.currentUser.email}/${file.name}`,
      file,
    );
  }
  getDownloadUrl(filePath: string) {
    if (!this.downloadUrlCache.has(filePath)) {
      this.downloadUrlCache.set(
        filePath,
        this.storage.ref(filePath).getDownloadURL(),
      );
    }
    return this.downloadUrlCache.get(filePath).catch(() => {
      console.log('impossible d\'uploader le fichier');
      return Observable.interval(3000).skip(1).first();
    });
  }

  deleteFile(filePath: string) {
    return this.storage.ref(filePath).delete();
  }
  getFileMetadata(filePath: string) {
    if (!this.downloadMetadataCache.has(filePath)) {
      this.downloadMetadataCache.set(
        filePath,
        this.storage.ref(filePath).getMetadata(),
      );
    }
    return this.downloadMetadataCache.get(filePath).catch(() => {
      console.log('impossible de récupérer les métadonnées du fichier');
      return Observable.of('failure');
    });;
  }
}
