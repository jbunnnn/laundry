import { useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

export default function DistanceChecker() {
  const [userLat, setUserLat] = useState(null);
  const [userLng, setUserLng] = useState(null);
  const [distance, setDistance] = useState(null);
  const [status, setStatus] = useState('');

  // 📍 Lokasi akurat Casey Laundry dari Google Maps
  const caseyLat = -6.4207689;
  const caseyLng = 106.7692517;

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius Bumi dalam kilometer
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  const handleCheckDistance = () => {
    if (!navigator.geolocation) {
      setStatus('❌ Browser kamu tidak mendukung fitur lokasi.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setUserLat(lat);
        setUserLng(lng);

        const dist = getDistanceFromLatLonInKm(lat, lng, caseyLat, caseyLng);
        setDistance(dist);

        if (dist <= 5) {
          setStatus(`✅ Kamu berada dalam jangkauan antar jemput GRATIS (±${dist.toFixed(2)} km)`);
        } else if (dist <= 10) {
          setStatus(`⚠️ Di luar jangkauan gratis, tapi masih bisa kami jangkau. Jarakmu: ±${dist.toFixed(2)} km`);
        } else {
          setStatus(`❌ Lokasi kamu terlalu jauh (±${dist.toFixed(2)} km). Hubungi kami untuk diskusi lebih lanjut 🙏`);
        }
      },
      () => {
        setStatus('❌ Gagal mengambil lokasi. Pastikan izin lokasi di browser kamu aktif.');
      }
    );
  };

  return (
    <section id="antar-jemput" className="bg-white dark:bg-slate-900 py-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-6 flex justify-center items-center gap-2">
          <FaMapMarkerAlt className="text-blue-500" />
          Cek Jangkauan Antar Jemput
        </h2>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Klik tombol di bawah untuk mengetahui apakah kamu masih dalam jangkauan layanan antar jemput dari <strong>Casey Laundry</strong> 🚚
        </p>

        <button
          onClick={handleCheckDistance}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition"
        >
          Cek Lokasi Saya
        </button>

        {status && (
          <div className="mt-6 text-lg font-medium text-gray-800 dark:text-gray-200">
            {status}
          </div>
        )}
      </div>
    </section>
  );
}
