import { useEffect, useState } from "react";
import {
  Calendar,
  CreditCard,
  MapPin,
  Shield,
  Trash2,
  Truck,
} from "lucide-react";

import "./App.css";

const steps = [
  {
    label: "Postcode",
    icon: <MapPin size={20} />,
  },
  {
    label: "Waste Type",
    icon: <Trash2 size={20} />,
  },
  {
    label: "Select Skip",
    icon: <Truck size={20} />,
  },
  {
    label: "Permit Check",
    icon: <Shield size={20} />,
  },
  {
    label: "Choose Date",
    icon: <Calendar size={20} />,
  },
  {
    label: "Payment",
    icon: <CreditCard size={20} />,
  },
];

function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);
  const [currentStep, setCurrentStep] = useState(3);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const fetchData = () => {
    fetch(
      "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
    )
      .then((response) => response.json())
      .then((data) => setItems(data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen w-full text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="hidden lg:flex justify-center items-center">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => (
              <>
                <button
                  className={`flex items-center whitespace-nowrap transition-colors  ${
                    index < currentStep
                      ? "text-blue-600 cursor-pointer"
                      : "text-white/60 cursor-not-allowed"
                  }`}
                  disabled={index >= currentStep}
                >
                  {step.icon}
                  <span className="ml-2 text-white">{step.label}</span>
                </button>
                {index < steps.length - 1 && (
                  <div
                    className={`w-10 h-px ${
                      index < currentStep - 1 ? "bg-blue-600" : "bg-gray-400"
                    }`}
                  />
                )}
              </>
            ))}
          </div>
        </div>
        <div className="lg:hidden max-w-100 mx-auto relative">
          <button
            onClick={toggleDropdown}
            className="inline-flex justify-center w-full rounded-md border border-gray-600 shadow-sm px-4 py-2 text-sm font-medium text-blue-600 hover:bg-gray-800 focus:outline-none"
          >
            {steps[currentStep - 1].icon}
            <span className="ml-2 text-white">
              {steps[currentStep - 1].label}
            </span>
          </button>
          {isOpen && (
            <div
              className="lg:hidden origin-top-right mt-2 w-full max-w-100 absolute rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none mx-auto z-20"
              role="menu"
            >
              <div role="none" className="py-1 rounded-md bg-gray-800">
                {steps.map((step, index) => (
                  <li
                    key={index}
                    className={`block px-4 py-2 text-sm hover:bg-gray-600 flex items-center gap-4 ${
                      index === currentStep - 1
                        ? "text-blue-600"
                        : "text-white/60"
                    }`}
                    role="menuitem"
                    onClick={() => {
                      // setCurrentStep(index + 1);
                      toggleDropdown();
                    }}
                  >
                    {step.icon}
                    {step.label}
                  </li>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="max-w-7xl mx-auto px-4 pb-32 mt-8">
          <h2 className="text-2xl font-bold text-center mb-4">
            Choose Your Skip Size
          </h2>
          <p className="text-gray-400 text-center mb-8">
            Select the skip size that best suits your needs
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className={`group relative rounded-lg border-2 p-4 md:p-6 transition-all rounded-lg ${
                  selectedItem?.id === item.id
                    ? "border-blue-600"
                    : "border-zinc-800"
                } hover:border-blue-600 bg-zinc-900 text-white cursor-pointer`}
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1590496793929-36417d3117de?q=80&amp;w=800"
                    alt={`${item.size} Yard Skip`}
                    className="w-full h-36 md:h-48 object-cover rounded-md mb-4"
                  />
                  <div className="absolute top-3 left-2">
                    <input
                      className="w-6 h-6"
                      type="checkbox"
                      checked={selectedItem?.id === item.id}
                      onChange={() =>
                        setSelectedItem(
                          selectedItem && selectedItem?.id == item.id
                            ? null
                            : item
                        )
                      }
                    />
                  </div>
                  <div className="absolute top-3 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                    {item.size} Yards
                  </div>
                  <div className="absolute bottom-3 left-2 space-y-2">
                    {!item.allowed_on_road && (
                      <div className="bg-black/90 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-alert-triangle w-4 h-4 text-yellow-500 shrink-0"
                        >
                          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                          <path d="M12 9v4"></path>
                          <path d="M12 17h.01"></path>
                        </svg>
                        <span className="text-xs font-medium text-yellow-500">
                          Private Property Only
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2 text-white">
                  {item.size} Yard Skip
                </h3>
                <p className="text-sm text-gray-400 mb-4 md:mb-6">
                  {item.hire_period_days} day hire period
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xl md:text-2xl font-bold text-blue-600">
                      £{item.price_before_vat}
                    </span>
                    <span className="text-sm text-gray-400 ml-2">per week</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="text-center fixed bottom-0 w-full">
        {!!selectedItem && (
          <>
            <div className="lg:hidden grid gap-4 p-4 bg-zinc-900">
              <div className="flex justify-between items-center">
                <div></div>
                <div className="flex gap-2 items-center">
                  <p className="text-xl font-bold text-blue-600">£</p>
                  <p className="text-sm text-gray-400">7 day hire</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="w-full bg-zinc-800 text-white py-2 px-6 rounded-lg hover:bg-zinc-700">
                  Back
                </button>
                <button className="w-full bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-500">
                  Continue
                </button>
              </div>
            </div>
            <div className="hidden lg:flex justify-between p-4 bg-zinc-900">
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-sm text-gray-400">{selectedItem?.size}</p>
                </div>
                <div className="flex gap-2 items-end">
                  <p className="text-2xl font-bold text-blue-600">£</p>
                  <p className="text-sm text-gray-400">7 day hire</p>
                </div>
              </div>
              <div className="flex gap-4">
                <button className="bg-zinc-800 text-white py-2 px-6 rounded-lg hover:bg-zinc-700">
                  Back
                </button>
                <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-500">
                  Continue →
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
