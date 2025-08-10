import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, Role } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userKey = 'fr_user';
  private isBrowser: boolean;
  private _user$: BehaviorSubject<User | null>;
  user$: Observable<User | null>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this._user$ = new BehaviorSubject<User | null>(this.loadUser());
    this.user$ = this._user$.asObservable();
  }

  login(
    username: string,
    role: Role,
    details?: { phone?: string; village?: string; password?: string }
  ): User {
    const user: User = {
      id: this.makeId(),
      username,
      role,
      phone: details?.phone,
      village: details?.village,
      // password is not stored for security in real apps, but included here for demo
    };
    if (this.isBrowser) {
      localStorage.setItem(this.userKey, JSON.stringify(user));
    }
    this._user$.next(user);
    return user;
  }

  logout() {
    if (this.isBrowser) {
      localStorage.removeItem(this.userKey);
    }
    this._user$.next(null);
  }

  get currentUser(): User | null {
    return this._user$.value;
  }

  private loadUser(): User | null {
    if (this.isBrowser) {
      const raw = localStorage.getItem(this.userKey);
      return raw ? (JSON.parse(raw) as User) : null;
    }
    return null;
  }

  private makeId(len = 12) {
    return Math.random().toString(36).substring(2, 2 + len);
  }
}
