import { useEffect, useState } from "react";

function MotorcycleSpecs() {
  const [motorcycles, setMotorcycles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [brand, setBrand] = useState("Yamaha");

  useEffect(() => {
    const fetchMotorcycles = async () => {
      try {
        const response = await fetch(
          `https://api.api-ninjas.com/v1/motorcycles?make=${brand}`,
          {
            headers: {
              'X-Api-Key': 'KkvMqe5Wuu+EKuuaCzFK5w==Z5LYVswitw5RWktW'
            }
          }
        );

        const data = await response.json();
        setMotorcycles(data);
      } catch (error) {
        console.error("Error fetching motorcycle data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMotorcycles();
  }, [brand]);

  return (
    <div className="container mt-4">
      <h2>Motorcycle Specs for "{brand}"</h2>

      <input
        type="text"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        placeholder="Enter motorcycle brand"
        className="form-control my-4"
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        motorcycles.length > 0 ? (
          motorcycles.map((bike, index) => (
            <div key={index} className="card mb-2 p-3">
              <h4>{bike.make} {bike.model}</h4>
              <p><strong>Year:</strong> {bike.year}</p>
              <p><strong>Engine:</strong> {bike.engine}</p>
              <p><strong>Type:</strong> {bike.type}</p>
            </div>
          ))
        ) : (
          <p>No motorcycles found for "{brand}"</p>
        )
      )}
    </div>
  );
}

export default MotorcycleSpecs;
