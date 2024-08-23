import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { KamarCard } from '../../components/Card/KamarCard';

const CheckInSelectKamar = () => {
  return (
    <>
      <Breadcrumb pageName="Pilih Kamar Tersedia" />

      <div className="grid grid-cols-1 gap-y-3 gap-x-8 sm:grid-cols-4">
        <KamarCard navTo="/order/checkin/form" stateData={{ id: 1 }} />
        <KamarCard navTo="/order/checkin/form" stateData={{ id: 2 }} />
      </div>
    </>
  );
};

export default CheckInSelectKamar;
