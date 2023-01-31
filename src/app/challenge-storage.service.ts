import { from, interval as observableInterval, Observable, of } from "rxjs";

import { first, skip, catchError } from "rxjs/operators";
import { UserService } from "./user.service";
import {
  Storage,
  UploadTask,
  ref,
  getDownloadURL,
  deleteObject,
  getMetadata,
  uploadBytesResumable,
  FullMetadata,
} from "@angular/fire/storage";
import { Injectable } from "@angular/core";

@Injectable()
export class ChallengeStorageService {
  downloadUrlCache = new Map<string, Observable<string>>();
  downloadMetadataCache = new Map<string, Observable<FullMetadata>>();
  constructor(private storage: Storage, private userService: UserService) {}
  addFile(file: File): UploadTask {
    const fileRef = ref(
      this.storage,
      `users/${this.userService.currentUser.email}/${file.name}`
    );
    return uploadBytesResumable(fileRef, file);
  }
  getDownloadUrl(filePath: string) {
    if (!this.downloadUrlCache.has(filePath)) {
      const fileRef = ref(this.storage, filePath);
      this.downloadUrlCache.set(filePath, from(getDownloadURL(fileRef)));
    }
    return this.downloadUrlCache.get(filePath).pipe(
      catchError(() => {
        console.log("impossible d'uploader le fichier");
        return observableInterval(3000).pipe(skip(1), first());
      })
    );
  }

  deleteFile(filePath: string) {
    return deleteObject(ref(this.storage, filePath));
  }
  getFileMetadata(filePath: string) {
    if (!this.downloadMetadataCache.has(filePath)) {
      this.downloadMetadataCache.set(
        filePath,
        from(getMetadata(ref(this.storage, filePath)))
      );
    }
    return this.downloadMetadataCache.get(filePath).pipe(
      catchError(() => {
        console.log("impossible de récupérer les métadonnées du fichier");
        return of("failure");
      })
    );
  }
}
