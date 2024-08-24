import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button, Dialog, Typography } from '@material-tailwind/react';
import { formatDate } from '../../utils/DateUtils';

const InvoiceModal = ({
  visible,
  toggle,
  data,
}: {
  visible: boolean;
  toggle: any;
  data: any;
}) => {
  const TAMU_DATA = data?.tamu;
  const KAMAR_DATA = data?.kamar;

  const NAMA = `${TAMU_DATA.sex} ${TAMU_DATA.nama_depan} ${TAMU_DATA.nama_belakang}`;

  return (
    <Dialog size={'lg'} className=" bg-white" open={visible} handler={toggle}>
      <div className="rounded-lg border border-stroke bg-white shadow-default max-h-[80vh] p-8 w-full h-full overflow-auto">
        <div className="flex flex-col gap-4">
          <Typography variant={'h5'}>Anggrek Inn 2</Typography>
          <span className=" w-1/3">
            Jl. Waitabula Kelurahan Langga lero Kecamatan kota tambolaka
            Kabupaten Sumba Barat Daya
          </span>
        </div>
        <div className="flex flex-col mt-10">
          <span>Diajukan kepada :</span>
          <div className="flex flex-col mt-2">
            <span className="font-semibold text-black">{NAMA}</span>
            <span className=" w-1/3">{TAMU_DATA.alamat}</span>
          </div>
          <span className="my-8">No. Telp. : {TAMU_DATA.no_telp}</span>
          <div className="flex flex-col mb-8">
            <span className="font-bold text-black">NOMOR INVOICE :</span>
            <span className="text-black">{data.invoice_id}</span>
          </div>
          <div className="flex flex-col mb-8">
            <span className="font-bold text-black">TANGGAL TERBIT :</span>
            <span className="text-black">{formatDate(new Date())}</span>
          </div>
          <div className="flex flex-col">
            <Typography color={'black'} variant={'h5'}>
              RINCIAN TAGIHAN
            </Typography>
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className=" text-black border border-gray-300 px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                      Tipe Kamar
                    </th>
                    <th className=" text-black border border-gray-300 px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                      Harga
                    </th>
                    <th className=" text-black border border-gray-300 px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                      Qty
                    </th>
                    <th className=" text-black border border-gray-300 px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="border text-sm border-gray-300 px-6 py-4 whitespace-nowrap">
                      Alfreds Futterkiste
                    </td>
                    <td className="border text-sm border-gray-300 px-6 py-4 whitespace-nowrap">
                      Maria Anders
                    </td>
                    <td className="border text-sm border-gray-300 px-6 py-4 whitespace-nowrap">
                      Germany
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/** total */}
            <div className="flex flex-col mt-8 w-full items-end">
              <div className="flex flex-col gap-y-4.5 w-full max-w-md">
                <div className="flex flex-row justify-between w-full">
                  <Typography
                    className="font-semibold text-boxdark-2"
                    variant={'small'}
                  >
                    Sub-Total
                  </Typography>
                  <Typography
                    color={'black'}
                    className="font-semibold"
                    variant={'small'}
                  >
                    Rp 1.000.000
                  </Typography>
                </div>
                <div className="flex flex-row justify-between w-full">
                  <Typography variant={'small'}>PPn 11%</Typography>
                  <Typography color={'black'} variant={'small'}>
                    Rp 110.000
                  </Typography>
                </div>
                <div className="flex flex-row justify-between w-full">
                  <Typography
                    color={'black'}
                    className="font-semibold text-boxdark-2"
                    variant={'small'}
                  >
                    Grand Total
                  </Typography>
                  <Typography
                    color={'black'}
                    className="font-semibold"
                    variant={'small'}
                  >
                    Rp 1.110.000
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" p-6">
        <Button fullWidth color={'blue'} className=" normal-case">
          Download Invoice
        </Button>
      </div>
    </Dialog>
  );
};

export default InvoiceModal;
