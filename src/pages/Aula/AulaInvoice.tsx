import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@material-tailwind/react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useLocation, useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils/DateUtils';
import { formatCurrency, parseCurrency } from '../../utils/Utility';
import Logo from '../../images/logo.png';
import useFetch from '../../hooks/useFetch';
import { ADDRESS, SEND_INVOICE } from '../../api/routes';
import { API_STATES, MODAL_TYPE } from '../../common/Constants';
import { useModal } from '../../components/Provider/ModalProvider';
import moment from 'moment';

const TABLE_HEAD = ['Item', 'Price', 'Qty', 'Total'];

const AulaInvoice: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const stateParam = location.state;

  const [address, setAddress] = useState('');

  console.log('DATA', stateParam);

  const { setType, toggle, setOnConfirm } = useModal();

  useEffect(() => {
    getAddress();
  }, []);

  async function getAddress() {
    setType(MODAL_TYPE.LOADING);
    toggle();

    const { state, data, error } = await useFetch({
      url: ADDRESS,
      method: 'GET',
    });

    console.log('DATA', data);

    if (state == API_STATES.OK) {
      setAddress(data.address);
      toggle();
    } else {
      toggle();
    }
  }

  const mappingPaketList = stateParam.paket_list.map((item: any) => {
    return {
      ...item,
      qty: stateParam.jumlah_pax,
      nama_product: item.nama_paket,
      harga_product: item.harga_paket,
      total_price:
        item.id == 1
          ? item.harga_paket
          : parseInt(parseCurrency(item.harga_paket)) *
            parseInt(stateParam.jumlah_pax),
    };
  });

  const TABLE_DATA = [
    {
      id: 0,
      qty: `${stateParam.price_detail.totalDays} Hari`,
      total_price: stateParam.price_detail.totalAulaPrice,
      nama_product: `Aula`,
      harga_product: stateParam.price_detail.aulaPrice,
    },
    ...mappingPaketList,
  ];

  function GenerateInvoice(send?: boolean): void {
    if (send && !stateParam.penyewa.email) {
      alert(
        'Tamu ini tidak memiliki data email, silahkan tambahkan di buku tamu.',
      );
      toggle();
      return;
    }

    const invoiceElement = document.querySelector(
      '#invoiceCapture',
    ) as HTMLElement;

    if (!invoiceElement) {
      console.error('Invoice element not found');
      return;
    }

    html2canvas(invoiceElement)
      .then((canvas: HTMLCanvasElement) => {
        const imgData = canvas.toDataURL('image/jpeg', 1);
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'pt',
          format: [612, 792],
        });

        pdf.internal.scaleFactor = 1;
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);

        // Convert PDF to Blob
        const pdfBlob = pdf.output('blob');
        if (send) {
          sendEmailWithInvoice(pdfBlob);
        } else {
          pdf.save(`${stateParam.invoice_id}.pdf`);
        }
      })
      .catch((error) => {
        console.error('Failed to generate invoice PDF', error);
      });
  }

  async function sendEmailWithInvoice(pdfBlob: Blob) {
    setType(MODAL_TYPE.LOADING);
    const formData = new FormData();
    formData.append('invoice', pdfBlob, `${stateParam.invoice_id}.pdf`);

    const { state, data, error } = await useFetch({
      url: SEND_INVOICE(stateParam.invoice_id, stateParam.penyewa?.email),
      method: 'POST',
      data: formData,
    });

    if (state == API_STATES.OK) {
      setType(MODAL_TYPE.SUCCESS);
      setOnConfirm(() => toggle());
    } else {
      setType(MODAL_TYPE.ERROR);
      setOnConfirm(() => toggle());
    }
  }

  return (
    <>
      <div className=" mb-4.5 flex flex-row gap-x-4">
        <Button
          className=" normal-case"
          color={'blue'}
          onClick={() => GenerateInvoice(false)}
        >
          Download Invoice
        </Button>
        <Button
          className=" normal-case"
          color={'blue'}
          variant={'outlined'}
          onClick={() => {
            setType(MODAL_TYPE.CONFIRMATION);
            setOnConfirm(() => GenerateInvoice(true));
            toggle();
          }}
        >
          Kirim ke Email
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
        <div id="invoiceCapture" className="p-16 w-full">
          <div className="flex flex-row gap-4 items-center justify-between">
            {/* <Typography variant={'h5'}>Anggrek Inn 2</Typography> */}
            <img className="h-30 w-55 object-center" src={Logo} alt="logo" />
            <span className="w-1/4 font-satoshi text-black-2 font-normal">
              <p className=" font-bold text-black-2 mb-2">Anggrek Inn 2</p>
              {address}
            </span>
          </div>
          <div className="flex flex-col mt-16 gap-16">
            <h2 className=" text-center font-bold text-black-2 underline">
              INVOICE
            </h2>

            <div className="flex flex-row items-baseline justify-between">
              <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center text-black-2">
                  <p className="w-40 text-base">Name</p>
                  <p>
                    : {stateParam.nama_penyewa} ( {stateParam.penyewa.phone} )
                  </p>
                </div>
                <div className="flex flex-row items-center text-black-2">
                  <p className="w-40">Date / Time</p>
                  <p>: {moment().format('YYYY-MM-DD')}</p>
                </div>
              </div>

              <div className="flex flex-col gap-2 text-black-2">
                <div className="flex flex-row items-center">
                  <p className="w-40">Invoice Number</p>
                  <p>: {stateParam.invoice_id}</p>
                </div>
                <div className="flex flex-row items-center">
                  <p className="w-40">Rent Start Date</p>
                  <p>: {stateParam.tgl_awal_sewa}</p>
                </div>
                <div className="flex flex-row items-center">
                  <p className="w-40">Rent End Date</p>
                  <p>: {stateParam.tgl_akhir_sewa}</p>
                </div>
                {/* <div className="flex flex-row items-center">
                  <p className="w-40">Packet Type</p>
                  <p>: {stateParam.paket.nama_paket}</p>
                </div> */}
              </div>
            </div>

            <div>
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className=" font-semibold leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TABLE_DATA.map((item: any, index: number) => (
                    <tr key={item.id} className="even:bg-light-blue-100/20">
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.nama_product}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {formatCurrency(item.harga_product)}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.qty}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {formatCurrency(item.total_price)}
                        </Typography>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className=" flex justify-end py-8 px-28 bg-cyan-100/50">
                <div className=" flex flex-row items-center gap-4  text-sm font-semibold text-cyan-700">
                  <p>TOTAL</p>
                  <p>:</p>
                  <p>{formatCurrency(stateParam.total_harga)}</p>
                </div>
              </div>
            </div>

            <div className=" text-black-2 italic text-base">
              I agree that my liability for this bill is not waived and agree to
              be held personality liable in the event that the indicated person,
              Company, or Association to pay for any part or the full amount of
              these charge.
            </div>

            <div>
              <p className=" font-bold text-base text-black-2">
                Thank you for staying with us at Anggrek Inn 2
              </p>
              <div className=" flex flex-row mt-8 justify-between">
                <div className=" flex flex-col items-center gap-24">
                  <p>Cashier Signature</p>
                  <div className="h-1 w-24 bg-body"></div>
                </div>
                <div className=" flex flex-col items-center gap-24">
                  <p>Guest Signature</p>
                  <div className="h-1 w-24 bg-body"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AulaInvoice;
