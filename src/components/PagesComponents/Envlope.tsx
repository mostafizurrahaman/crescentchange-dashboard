const Envlope = () => {
  return (
    <div className="w-full bg-white p-5 rounded-lg border h-full">
      <p>Total Donors</p>
      <h1 className="text-3xl md:text-5xl font-bold my-3">12.5 k</h1>
      <div className="flex justify-between items-center my-10">
        <div className="flex justify-start items-center gap-5">
          <div>
            <p className="bg-[#b5e0ff] p-1 rounded-lg w-10"></p>
            <p className="text-gray-500 my-3">Youth</p>
            <h1 className="text-3xl  font-bold">6k</h1>
          </div>
          <p className="border-r h-10"></p>
        </div>
        <div className="flex justify-start items-center gap-5">
          <div>
            <p className="bg-[#9df2c1] p-1 rounded-lg w-10"></p>
            <p className="text-gray-500 my-3">Emam</p>
            <h1 className="text-3xl  font-bold">4.2k</h1>
          </div>
          <p className="border-r h-10"></p>
        </div>
        <div className="flex justify-start items-center gap-5">
          <div>
            <p className="bg-[#ffe599] p-1 rounded-lg w-10"></p>
            <p className="text-gray-500 my-3">Utilities</p>
            <h1 className="text-3xl  font-bold">2.2k</h1>
          </div>
          <p className="border-r h-10"></p>
        </div>
      </div>
      <div className="grid grid-cols-3 my-10">
        <div className="h-10 w-20 bg-[#b5e0ff] rounded-lg">

        </div>
        <div className="h-10 w-20 bg-[#9df2c1] rounded-lg">

        </div>
        <div className="h-10 w-20 bg-[#ffe599] rounded-lg">

        </div>
      </div>
    </div>
  );
};

export default Envlope;
