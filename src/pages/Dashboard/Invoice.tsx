import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@material-tailwind/react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useLocation, useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils/DateUtils';
import { formatCurrency } from '../../utils/Utility';
import Logo from '../../images/logo.png';

const Invoice: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const stateParam = location.state;

  const TAMU_DATA = stateParam?.tamu;
  const KAMAR_DATA = stateParam?.kamar;

  function getNamaTamu(tamu: any) {
    return `${tamu.sex} ${tamu.nama_depan} ${tamu.nama_belakang}`;
  }

  function getNamaKamar(kamar: any) {
    return `${kamar.nama_kamar} #${kamar.nomor_kamar}`;
  }

  function GenerateInvoice(): void {
    const invoiceElement = document.querySelector(
      '#invoiceCapture',
    ) as HTMLElement;

    if (!invoiceElement) {
      console.error('Invoice element not found');
      return;
    }

    html2canvas(invoiceElement)
      .then((canvas: HTMLCanvasElement) => {
        const imgData = canvas.toDataURL('image/png', 1.0);
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'pt',
          format: [612, 792],
        });

        pdf.internal.scaleFactor = 1;
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('invoice-001.pdf');
      })
      .catch((error) => {
        console.error('Failed to generate invoice PDF', error);
      });
  }

  return (
    <>
      <div className=" mb-4.5 flex flex-row gap-x-4">
        <Button
          className=" normal-case"
          color={'blue'}
          onClick={GenerateInvoice}
        >
          Download Invoice
        </Button>
        <Button
          variant={'outlined'}
          className=" normal-case"
          color={'deep-orange'}
          onClick={() => navigate(-1)}
        >
          Batalkan
        </Button>
      </div>
      <div className=" bg-white">
        <div id="invoiceCapture" className="p-8 w-full">
          <div className="flex flex-col gap-4">
            {/* <Typography variant={'h5'}>Anggrek Inn 2</Typography> */}
            <img className="h-20 w-40 object-center" src={Logo} alt="logo" />
            <span className="w-1/3 font-satoshi text-body font-normal">
              Jl. Waitabula Kelurahan Langga lero Kecamatan kota tambolaka
              Kabupaten Sumba Barat Daya
            </span>
          </div>
          <div className="flex flex-col mt-10">
            <span>Diajukan kepada :</span>
            <div className="flex flex-col mt-1">
              <span className="font-semibold text-black">
                {getNamaTamu(TAMU_DATA)}
              </span>
              <span className="w-1/3 font-satoshi text-body font-normal">
                {TAMU_DATA.alamat}
              </span>
            </div>
            <span className="my-6 font-satoshi text-body font-normal">
              No. Telp. : {TAMU_DATA.no_telp}
            </span>
            <div className="flex flex-col mb-8">
              <span className="font-bold text-black mb-1">NOMOR INVOICE :</span>
              <span className="text-black">{stateParam.invoice_id}</span>
            </div>
            <div className="flex flex-col mb-8">
              <span className="font-bold text-black mb-1">
                TANGGAL TERBIT :
              </span>
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
                      <th className="text-black border border-gray-300 px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                        Tipe Kamar
                      </th>
                      <th className="text-black border border-gray-300 px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                        Harga
                      </th>
                      <th className="text-black border border-gray-300 px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                        Qty
                      </th>
                      <th className="text-black border border-gray-300 px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="border text-sm border-gray-300 px-6 py-4 whitespace-nowrap">
                        {getNamaKamar(KAMAR_DATA)}
                      </td>
                      <td className="border text-sm border-gray-300 px-6 py-4 whitespace-nowrap">
                        {KAMAR_DATA.harga}
                      </td>
                      <td className="border text-sm border-gray-300 px-6 py-4 whitespace-nowrap">
                        {stateParam.order.qty} Malam
                      </td>
                      <td className="border text-sm border-gray-300 px-6 py-4 whitespace-nowrap">
                        {formatCurrency(stateParam.order.subtotal)}
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
                      {formatCurrency(stateParam.order.subtotal)}
                    </Typography>
                  </div>
                  <div className="flex flex-row justify-between w-full">
                    <Typography variant={'small'}>PPn 11%</Typography>
                    <Typography color={'black'} variant={'small'}>
                      {formatCurrency(stateParam.order.ppn)}
                    </Typography>
                  </div>
                  <div className="flex flex-row justify-between w-full">
                    <Typography variant={'small'}>Deposit</Typography>
                    <Typography color={'red'} variant={'small'}>
                      - {formatCurrency(stateParam.order.deposit)}
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
                      {formatCurrency(stateParam.order.grandTotal)}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Invoice;
