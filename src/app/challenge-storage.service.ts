
import {interval as observableInterval,  Observable, of } from 'rxjs';

import {first, skip, catchError} from 'rxjs/operators';
import { UserService } from './user.service';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { Injectable } from '@angular/core';

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
    return this.downloadUrlCache.get(filePath).pipe(catchError(() => {
      console.log('impossible d\'uploader le fichier');
      return observableInterval(3000).pipe(skip(1),first(),);
    }));
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
    return this.downloadMetadataCache.get(filePath).pipe(catchError(() => {
      console.log('impossible de récupérer les métadonnées du fichier');
      return of('failure');
    }));;
  }
}
