import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

export function CheckoutCard({
  navTo,
  stateData,
}: {
  navTo: string;
  stateData: any;
}) {
  const navigate = useNavigate();

  function onClicked(e: any) {
    e.preventDefault();
    navigate(navTo, { state: stateData });
  }

  const TAMU = stateData?.tamu;
  const GET_TAMU_NAME = `${TAMU.nama_depan} ${TAMU.nama_belakang} ( ${TAMU.alias} )`;

  return (
    <Card className="mt-6">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-1">
          {stateData.kamar?.nama_kamar} #{stateData.kamar?.nomor_kamar}
        </Typography>
        <Typography variant={'h6'}>{GET_TAMU_NAME}</Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          fullWidth
          className=" normal-case"
          color={'blue'}
          onClick={onClicked}
        >
          Pilih Kamar
        </Button>
      </CardFooter>
    </Card>
  );
}
