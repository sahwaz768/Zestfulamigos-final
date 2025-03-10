import { Mastersidebar } from './MasterSidebar';
import Notify from './Notify';

const Threeline = () => {
  return (
    <div className="threeline  ">
      <div className="flex justify-between    px-4">
        <div className="threelinembview ">
          <Mastersidebar />
        </div>
        <div className="notifymb mt-2">
          <Notify backgroundColor="transparent" color="black" />
        </div>
      </div>
    </div>
  );
};

export default Threeline;
