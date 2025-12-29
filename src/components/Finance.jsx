import { useState } from "react";
import "./Finance.css";

export default function Finance() {
  const [contactInfo, setContactInfo] = useState(null); // Gem kontakt info til modal

  // Fast definerede tre kunder
  const customers = [
    {
      id: "1",
      name: "Fjordlandet",
      budget: 10000,
      spent: 4000,
      phone: "12345678",
      email: "kontakt@fjordlandet.dk",
      contractFile: "/contracts/fjordlandet.txt", // placer filen i public/contracts/
    },
    {
      id: "2",
      name: "Nordic Group",
      budget: 8000,
      spent: 2000,
      phone: "87654321",
      email: "info@nordicgroup.dk",
      contractFile: "/contracts/nordic.txt",
    },
    {
      id: "3",
      name: "København ApS",
      budget: 12000,
      spent: 6000,
      phone: "11223344",
      email: "contact@copenhagen.dk",
      contractFile: "/contracts/copenhagen.txt",
    },
  ];

  const handleDownload = (filePath) => {
    const link = document.createElement("a");
    link.href = filePath;
    link.download = filePath.split("/").pop(); // gem filen med originalt navn
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="finance-container">
      <h1>Økonomi</h1>
      <div className="customer-list">
        {customers.map((customer) => {
          const remainingPercentage = Math.max(
            0,
            ((customer.budget - customer.spent) / customer.budget) * 100
          );

          return (
            <div key={customer.id} className="customer-card">
              <h2>{customer.name}</h2>
              <p>Budget: {customer.budget} kr.</p>
              <p>Brugt: {customer.spent} kr.</p>

              {/* Budget barometer */}
              <div className="budget-bar">
                <div
                  className="budget-bar-fill"
                  style={{ width: `${remainingPercentage}%` }}
                ></div>
              </div>

              {/* Knapper */}
              <div className="customer-buttons">
                <button
                  className="btn"
                  onClick={() => handleDownload(customer.contractFile)}
                >
                  Se kontrakt
                </button>
                <button
                  className="btn"
                  onClick={() =>
                    setContactInfo({
                      name: customer.name,
                      phone: customer.phone,
                      email: customer.email,
                    })
                  }
                >
                  Kontakt kunde
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal til kontakt */}
      {contactInfo && (
        <div className="modal-backdrop" onClick={() => setContactInfo(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Kontakt {contactInfo.name}</h2>
            <p>Telefon: {contactInfo.phone}</p>
            <p>Email: {contactInfo.email}</p>
            <button className="btn" onClick={() => setContactInfo(null)}>
              Luk
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
