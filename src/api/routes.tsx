export const BASE_URL = 'http://localhost:8080/';

// PATH
export const LOGIN = 'admin/login';

// KAMAR
export const ADD_KAMAR = 'admin/add-kamar';
export const EDIT_KAMAR = (id: any) => `admin/edit-kamar/${id}`;
export const GET_ALL_KAMAR = (page = 1, limit = 10, cari = '') =>
  `admin/kamar?page=${page}&limit=${limit}&cari=${cari}`;
export const DELETE_KAMAR = (id: any) => `admin/kamar/${id}`;

// TAMU
export const ADD_TAMU = 'admin/add-tamu';
export const EDIT_TAMU = (id: any) => `admin/edit-tamu/${id}`;
export const GET_ALL_TAMU = (page = 1, limit = 10, cari = '') =>
  `admin/tamu?page=${page}&limit=${limit}&cari=${cari}`;
export const DELETE_TAMU = (id: any) => `admin/tamu/${id}`;
