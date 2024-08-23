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
          Kamar Mawar
        </Typography>
        <Typography variant={'h6'}>Eksekutif</Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button className=" normal-case" color={'blue'} onClick={onClicked}>
          Pilih Kamar
        </Button>
      </CardFooter>
    </Card>
  );
}
