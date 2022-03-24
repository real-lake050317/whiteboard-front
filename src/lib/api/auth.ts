import { browser } from "$app/env";
import { goto } from "$app/navigation";
import type { User } from "$lib/types";

export function checkAuth(user: User) {
    if(!browser) return;
    if(!user) goto('/auth/login');
    else goto('/dashboard');
}

export function login() {
    
}

export function logout() {
    
}

export function signin() {
    
}

export function signout() {
    
}