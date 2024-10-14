import MaintenanceImage from "@/assets/images/maintenance.svg";
const Maintenance = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen overflow-hidden gap-5">
        <img src={MaintenanceImage} alt="Maintenance" className="w-1/2 h-1/2" />
        <h1 className="text-4xl font-bold text-primaryColor">Maintenance</h1>
        <p className="text-lg">We are currently performing maintenance</p>
        <p className="text-sm text-muted-foreground">
          We are working hard to connect to our backend API. Please check back
          soon.
        </p>
      </div>
    </div>
  );
};

export default Maintenance;
