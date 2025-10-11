import { useState } from "react";
import { motion } from "framer-motion";
import { Listbox, Transition } from "@headlessui/react";
import {
  FaSpinner,
  FaMoneyBillWave,
  FaArrowDown,
  FaCheck,
  FaFire,
  FaBorderStyle,
  FaTshirt,
  FaBed,
} from "react-icons/fa";

const serviceOptions = [
  {
    id: "cuci_setrika",
    name: "Cuci + Setrika",
    icon: <FaTshirt className="text-blue-600" />,
    price: 7500,
    unit: "kg",
  },
  {
    id: "setrika",
    name: "Setrika Aja",
    icon: <FaFire className="text-red-500" />,
    price: 5000,
    unit: "kg",
  },
  {
    id: "bed_cover",
    name: "Bed Cover / Sprei",
    icon: <FaBed className="text-green-600" />,
    price: 15000,
    unit: "pcs",
  },
  {
    id: "karpet",
    name: "Karpet Rumah",
    icon: <FaBorderStyle className="text-yellow-600" />,
    price: 25000,
    unit: "m²",
  },
];

export default function PriceCalculator() {
  const [weight, setWeight] = useState("");
  const [selectedService, setSelectedService] = useState(serviceOptions[0]);
  const [estimatedPrice, setEstimatedPrice] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculatePrice = () => {
    const parsedWeight = parseFloat(weight);
    if (isNaN(parsedWeight) || parsedWeight <= 0) {
      alert("Masukkan berat yang valid dulu ya 😅");
      setEstimatedPrice(null);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setEstimatedPrice(parsedWeight * selectedService.price);
      setLoading(false);
    }, 1000);
  };

  return (
    <section
      id="estimasi-harga"
      className="bg-white dark:bg-slate-900 py-16 px-6 transition-colors duration-300"
    >
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6 flex items-center justify-center gap-2">
          <FaMoneyBillWave className="text-indigo-500" />
          Estimasi Harga
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-blue-50 dark:bg-white/5 border dark:border-slate-700 p-6 rounded-xl shadow-md space-y-4"
        >
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder={`Berat (${selectedService.unit})`}
              className="w-full sm:w-1/2 px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-slate-800 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />

            <div className="w-full sm:w-1/2">
              <Listbox value={selectedService} onChange={setSelectedService}>
                {({ open }) => (
                  <div className="relative">
                    <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white dark:bg-slate-800 py-3 pl-4 pr-10 text-left border border-gray-300 dark:border-slate-600 text-gray-800 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200">
                      <span className="inline-flex items-center gap-2 truncate">
                        {selectedService.icon}
                        {selectedService.name}
                      </span>
                      <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                        <FaArrowDown
                          className={`text-gray-400 transition-transform ${
                            open ? "rotate-180" : ""
                          }`}
                        />
                      </span>
                    </Listbox.Button>

                    <Transition
                      as="div"
                      show={open}
                      enter="transition ease-out duration-150"
                      enterFrom="opacity-0 -translate-y-2"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 -translate-y-1"
                      className="absolute z-10 mt-2 w-full"
                    >
                      <Listbox.Options className="overflow-auto rounded-lg bg-white dark:bg-slate-800 border dark:border-slate-600 shadow-lg max-h-60 py-1 focus:outline-none ring-1 ring-black/10 dark:ring-white/10">
                        {serviceOptions.map((option) => (
                          <Listbox.Option
                            key={option.id}
                            value={option}
                            className={({ active }) =>
                              `cursor-pointer select-none px-4 py-2 flex items-center justify-between transition ${
                                active
                                  ? "bg-blue-100 dark:bg-slate-700 text-blue-600 dark:text-blue-300 scale-[1.02]"
                                  : "text-gray-800 dark:text-white"
                              }`
                            }
                          >
                            {({ selected }) => (
                              <>
                                <span className="flex items-center gap-2">
                                  {option.icon}
                                  {option.name}
                                  <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                                    (Rp {option.price.toLocaleString()}/
                                    {option.unit})
                                  </span>
                                </span>
                                {selected && (
                                  <FaCheck className="text-blue-500 text-sm" />
                                )}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                )}
              </Listbox>
            </div>
          </div>

          <motion.button
            onClick={calculatePrice}
            disabled={loading}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2 ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <FaSpinner className="animate-spin text-xl" />
            ) : (
              "Hitung Estimasi"
            )}
          </motion.button>

          {estimatedPrice !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-medium text-blue-700 dark:text-blue-400 mt-4"
            >
              Estimasi Biaya:{" "}
              <span className="font-bold">
                Rp {estimatedPrice.toLocaleString()}
              </span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
