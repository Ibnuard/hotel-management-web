import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useEffect, useState } from 'react';
import SelectTipeIdentitas from '../../components/Forms/SelectGroup/SelectTipeIdentitas';
import { Button } from '@material-tailwind/react';
import SelectTipeSex from '../../components/Forms/SelectGroup/SelectTipeSex';
import { useModal } from '../../components/Provider/ModalProvider';
import useFetch from '../../hooks/useFetch';
import { ADD_TAMU, DELETE_TAMU, EDIT_TAMU } from '../../api/routes';
import { API_STATES, MODAL_TYPE } from '../../common/Constants';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const TamuDetails = () => {
  const [tipeSex, setTipeSex] = useState('');
  const [namaDepan, setNamaDepan] = useState('');
  const [namaBelakang, setNamaBelakang] = useState('');
  const [alias, setAlias] = useState('');
  const [tipeId, setTipeId] = useState('');
  const [nomorId, setNomorId] = useState('');
  const [asal, setAsal] = useState('');
  const [nomorTelp, setNomorTelp] = useState('');
  const [email, setEmail] = useState('');
  const [alamat, setAlamat] = useState('');
  const [kabupaten, setKabupaten] = useState('');
  const [provinsi, setProvinsi] = useState('');

  // -- button
  const isButtonDisabled =
    !tipeSex ||
    !namaDepan ||
    !namaBelakang ||
    !tipeId ||
    !nomorId ||
    !asal ||
    !nomorTelp ||
    !alamat ||
    !kabupaten ||
    !provinsi;

  // -- nav
  const navigate = useNavigate();
  const stateParams = useLocation().state;
  const { id } = useParams();

  // -- modal
  const { setType, toggle, setOnConfirm } = useModal();

  useEffect(() => {
    if (id) {
      const ext = stateParams;
      setTipeSex(ext.sex);
      setNamaDepan(ext.nama_depan);
      setNamaBelakang(ext.nama_belakang);
      setAlias(ext.alias);
      setTipeId(ext.tipe_identitas);
      setNomorId(ext.nomor_identitas);
      setAsal(ext.asal_negara);
      setNomorTelp(ext.no_telp);
      setEmail(ext.email);
      setAlamat(ext.alamat);
      setKabupaten(ext.kabupaten);
      setProvinsi(ext.provinsi);
    }
  }, [id]);

  // -- other

  async function onEditTamu() {
    setType(MODAL_TYPE.LOADING);

    const body = {
      nama_depan: namaDepan,
      nama_belakang: namaBelakang,
      alias: alias,
      sex: tipeSex,
      tipe_identitas: tipeId,
      nomor_identitas: nomorId,
      asal_negara: asal,
      alamat: alamat,
      kabupaten: kabupaten,
      provinsi: provinsi,
      no_telp: nomorTelp,
      email: email,
    };
    const { state, data, error } = await useFetch({
      url: EDIT_TAMU(id),
      method: 'POST',
      data: body,
    });

    if (state == API_STATES.OK) {
      setType(MODAL_TYPE.SUCCESS);
      setOnConfirm(() => {
        navigate('/admin/tamu');
        toggle();
      });
    } else {
      setType(MODAL_TYPE.ERROR);
      setOnConfirm(() => {});
    }
  }

  async function onDeleteTamu() {
    setType(MODAL_TYPE.LOADING);

    const { state, data, error } = await useFetch({
      url: DELETE_TAMU(id),
      method: 'DELETE',
    });

    if (state == API_STATES.OK) {
      setType(MODAL_TYPE.SUCCESS);
      setOnConfirm(() => {
        navigate('/admin/tamu');
        toggle();
      });
    } else {
      setType(MODAL_TYPE.ERROR);
      setOnConfirm(() => {});
    }
  }

  return (
    <>
      <Breadcrumb pageName="Form Buku Tamu" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Form Tamu
            </h3>
          </div>
          <form action="#">
            <div className="p-6.5">
              <div className="flex flex-col gap-6 xl:flex-row">
                <div className=" w-1/6">
                  <SelectTipeSex value={tipeSex} setValue={setTipeSex} />
                </div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Nama Depan
                  </label>
                  <input
                    type="text"
                    placeholder="Masukan nama depan"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    onChange={(e) => setNamaDepan(e.target.value)}
                    value={namaDepan}
                  />
                </div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Nama Belakang
                  </label>
                  <input
                    type="text"
                    placeholder="Masukan nama belakang"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    onChange={(e) => setNamaBelakang(e.target.value)}
                    value={namaBelakang}
                  />
                </div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Alias
                  </label>
                  <input
                    type="text"
                    placeholder="Masukan alias"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    onChange={(e) => setAlias(e.target.value)}
                    value={alias}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-6 xl:flex-row mb-4.5">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Identitas
                  </label>
                  <div className=" flex flex-row gap-x-4">
                    <SelectTipeIdentitas value={tipeId} setValue={setTipeId} />
                    <input
                      type="text"
                      placeholder="Nomor identitas"
                      className=" w-3/5 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      onChange={(e) => setNomorId(e.target.value)}
                      value={nomorId}
                    />
                  </div>
                </div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Warga Negara
                  </label>
                  <input
                    type="text"
                    placeholder="Masukan negara"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    onChange={(e) => setAsal(e.target.value)}
                    value={asal}
                  />
                </div>
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    No. Telpon
                  </label>
                  <input
                    type="text"
                    placeholder="Masukan no. telpon"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    onChange={(e) => setNomorTelp(e.target.value)}
                    value={nomorTelp}
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Email ( Opsional )
                  </label>
                  <input
                    type={'email'}
                    placeholder="Masukan email"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
              </div>

              <div className=" mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Alamat
                </label>
                <textarea
                  rows={2}
                  placeholder="Masukan alamat"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  onChange={(e) => setAlamat(e.target.value)}
                  value={alamat}
                ></textarea>
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Kabupaten / Kota
                  </label>
                  <input
                    type="text"
                    placeholder="Masukan kabupaten / kota"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    onChange={(e) => setKabupaten(e.target.value)}
                    value={kabupaten}
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Provinsi
                  </label>
                  <input
                    type="text"
                    placeholder="Provinsi"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    onChange={(e) => setProvinsi(e.target.value)}
                    value={provinsi}
                  />
                </div>
              </div>
              <div className=" flex flex-row gap-x-4">
                <Button
                  disabled={isButtonDisabled}
                  onClick={() => {
                    setType(MODAL_TYPE.CONFIRMATION);
                    setOnConfirm(() => onEditTamu());
                    toggle();
                  }}
                  color={'blue'}
                  fullWidth
                  className=" mt-8 normal-case"
                >
                  Update
                </Button>
                <Button
                  onClick={() => {
                    setType(MODAL_TYPE.CONFIRMATION);
                    setOnConfirm(() => onDeleteTamu());
                    toggle();
                  }}
                  color={'red'}
                  fullWidth
                  className=" mt-8 normal-case"
                >
                  Hapus
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TamuDetails;
