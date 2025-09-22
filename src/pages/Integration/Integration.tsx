const Integration = () => {
  return (
    <div>
      <div className="flex justify-between items-center gap-5">
        <div>
          <h1 className="text-3xl font-bold mb-4">Integrations</h1>
          <p className="text-lg text-gray-600 mb-4">
            Each name represents a journey of support. Watch them glow.
          </p>
        </div>
      </div>

      <div className="my-6 grid grid-cols-1 md:grid-cols-3 gap-3 justify-between items-center">
        <div className="bg-white p-6 border rounded-3xl"></div>
      </div>
    </div>
  );
};

export default Integration;
