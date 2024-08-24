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

// TIPE KAMAR
export const ADD_TIPE_KAMAR = 'admin/add-tipe-kamar';
export const EDIT_TIPE_KAMAR = (id: any) => `admin/edit-tipe-kamar/${id}`;
export const GET_ALL_TIPE_KAMAR = (page = 1, limit = 10, cari = '') =>
  `admin/tipe?page=${page}&limit=${limit}&cari=${cari}`;
export const DELETE_TIPE_KAMAR = (id: any) => `admin/tipe/${id}`;

// CHECKIN
export const GET_READY_KAMAR = (page = 1, limit = 100, cari = '') =>
  `checkin/kamar?page=${page}&limit=${limit}&cari=${cari}`;
