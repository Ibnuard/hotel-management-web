export const BASE_URL = 'https://anggrekapi.my.id/';

// KAMAR
export const ADD_KAMAR = 'admin/add-kamar';
export const EDIT_KAMAR = (id: any) => `admin/edit-kamar/${id}`;
export const GET_ALL_KAMAR = (page = 1, limit = 10, cari = '') =>
  `admin/kamar?page=${page}&limit=${limit}&cari=${cari}`;
export const DELETE_KAMAR = (id: any) => `admin/kamar/${id}`;
export const GET_KAMAR_STATS = 'admin/kamar/stats';

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
export const CREATE_CHECKIN = 'checkin/create';
export const UPDATE_CHECKIN = (id: number) => `checkin/update/${id}`;
export const DELETE_CHECKIN = (id: number, kamarId: number) =>
  `checkin/delete/${id}?kamarId=${kamarId}`;

// CHECKOUT
export const GET_CHECKOUT_KAMAR = (page = 1, limit = 100, cari = '') =>
  `checkout/kamar?page=${page}&limit=${limit}&cari=${cari}`;
export const GET_CHECKOUT_KAMAR_DETAIL = (id: number) => `checkout/kamar/${id}`;

// ORDER
export const GET_HISTORY = (page = 1, limit = 100, cari = '') =>
  `order/history?page=${page}&limit=${limit}&cari=${cari}`;

// STATS
export const GET_CHECKOUT_TODAY = (page = 1, limit = 100, cari = '') =>
  `order/checkout-today?page=${page}&limit=${limit}&cari=${cari}`;

// PATH
export const LOGIN = 'admin/login';
export const GET_SA = 'admin/data';
export const UPDATE_SA = 'admin/update';

// INVOICE
export const SEND_INVOICE = (inv: string, receiver: string) =>
  `order/invoice/send?inv=${inv}&receiver=${receiver}`;
