import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

export function KamarCard({
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

  return (
    <Card className="mt-6">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-1">
          {stateData.nama_kamar} #{stateData.nomor_kamar}
        </Typography>
        <Typography variant={'h6'}>{stateData.tipeKamar?.tipe}</Typography>
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
