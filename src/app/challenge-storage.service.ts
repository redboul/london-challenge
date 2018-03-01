import { UserService } from './user.service';
import { AuthenticationService } from './authentication.service';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from 'angularfire2/storage';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class ChallengeStorageService {
  downloadUrlCache = new Map<string, Observable<any>>();
  downloadMetadataCache = new Map<string, Observable<any>>();
  constructor(
    private storage: AngularFireStorage,
    private userService: UserService,
  ) {}
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
    return this.downloadUrlCache.get(filePath);
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
    return this.downloadMetadataCache.get(filePath);
  }
}
