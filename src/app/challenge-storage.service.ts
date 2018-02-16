import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Injectable } from '@angular/core';

@Injectable()
export class ChallengeStorageService {

  constructor(private storage: AngularFireStorage) { }
  addFile(file: File): AngularFireUploadTask {
    return this.storage.upload(`users/${file.name}`, file);
  }
}
