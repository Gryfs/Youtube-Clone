import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userKey = 'userData'; // clé pour accéder aux données dans le localStorage
  private currentUserKey = 'currentUser';

  login(username: string, password: string): boolean {
    const users = this.getUsers();
    const user = users.find((u: any) => u.username === username);
  
    if (user && user.password === password) {
      this.setCurrentUser(user); // stocke l'utilisateur connecté
      return true;
    }
  
    return false;
  }

  setCurrentUser(user: any) {
    localStorage.setItem(this.currentUserKey, JSON.stringify(user));
  }
  

  getUsers() {
    const users = localStorage.getItem(this.userKey);
    return users ? JSON.parse(users) : [];
  }

  saveUser(userData: any) {
    const users = this.getUsers();
    users.push(userData); 
    localStorage.setItem(this.userKey, JSON.stringify(users));
  } 

  getCurrentUser() {
    if(typeof window !== 'undefined' && localStorage){

    
    const user = localStorage.getItem(this.currentUserKey);
    return user ? JSON.parse(user) : null;
    } else {
      return null;
    }
  }

  logout(){
    localStorage.removeItem(this.currentUserKey);

  }
  


}
