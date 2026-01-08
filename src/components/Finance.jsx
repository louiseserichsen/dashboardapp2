import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import "./Finance.css";

const COLORS = ["#C8A800", "#555"]; // brugt / tilbage

export default function Finance() {
  const [contactInfo, setContactInfo] = useState(null);

  // ✅ Kunder direkte fra opgavelisten
  const customers = [
    {
      id: "1",
      name: "Fjordlandet",
      budget: 10000,
      spent: 4000,
      phone: "12345678",
      email: "kontakt@fjordlandet.dk",
      contractFile: "/contracts/fjordlandet.txt",
    },
    {
      id: "2",
      name: "Grundsmag",
      budget: 8000,
      spent: 2000,
      phone: "87654321",
      email: "info@grundsmag.dk",
      contractFile: "/contracts/grundsmag.txt",
    },
    {
      id: "3",
      name: "Gorm Hansen",
      budget: 12000,
      spent: 6000,
      phone: "11223344",
      email: "contact@gorm.dk",
      contractFile: "/contracts/gorm.txt",
    },
    {
      id: "4",
      name: "Dagbladet",
      budget: 15000,
      spent: 15000,
      phone: "22334455",
      email: "kontakt@dagbladet.dk",
      contractFile: "/contracts/dagbladet.txt",
    },
    {
      id: "5",
      name: "Solum",
      budget: 5000,
      spent: 1000,
      phone: "33445566",
      email: "kontakt@solum.dk",
      contractFile: "/contracts/solum.txt",
    },
  ];

  const handleDownload = (filePath) => {
    const link = document.createElement("a");
    link.href = filePath;
    link.download = filePath.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="finance-container">
      <h1>Økonomi</h1>

      <div className="customer-list">
        {customers.map((customer) => {
          const remaining = customer.budget - customer.spent;
          const usedPercentage = Math.round(
            (customer.spent / customer.budget) * 100
          );

          const chartData = [
            { name: "Brugt", value: customer.spent },
            { name: "Tilbage", value: remaining },
          ];

          return (
            <div key={customer.id} className="customer-card">
              <h2>{customer.name}</h2>

              <p>Budget: {customer.budget} kr.</p>
              <p>Brugt: {customer.spent} kr.</p>
              <p><strong>{usedPercentage}%</strong> af budgettet er anvendt</p>

              {/* Cirkeldiagram */}
              <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={4}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Budget bar */}
              <div className="budget-bar">
                <div
                  className="budget-bar-fill"
                  style={{ width: `${100 - usedPercentage}%` }}
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

      {/* Modal */}
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
