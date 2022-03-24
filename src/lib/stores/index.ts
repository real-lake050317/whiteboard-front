import type { User, Lecture } from "$lib/types";
import { writable } from "svelte/store";

export const userStore = writable<User>(null);

export const lectureStore = writable<Lecture>();