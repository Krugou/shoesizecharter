import { useState } from 'react'

function App() {
  const [euSize, setEuSize] = useState(50)

  // Conversion formulas based on standard shoe size charts
  // EU to other sizes (approximate conversions)
  const euToUS = (eu) => {
    // Men's conversion: US = EU - 33
    return Math.round((eu - 33) * 10) / 10
  }

  const euToUK = (eu) => {
    // UK = EU - 33.5
    return Math.round((eu - 33.5) * 10) / 10
  }

  const euToCM = (eu) => {
    // EU size formula: EU = (foot length in cm + 1.5) * 1.5
    // Solving for foot length: foot length = (EU / 1.5) - 1.5
    return Math.round(((eu / 1.5) - 1.5) * 10) / 10
  }

  const euToInches = (eu) => {
    const cm = euToCM(eu)
    // 1 inch = 2.54 cm
    return Math.round((cm / 2.54) * 100) / 100
  }

  // Reverse conversions to EU
  const usToEU = (us) => {
    return Math.round((parseFloat(us) + 33) * 10) / 10
  }

  const ukToEU = (uk) => {
    return Math.round((parseFloat(uk) + 33.5) * 10) / 10
  }

  const cmToEU = (cm) => {
    return Math.round(((parseFloat(cm) + 1.5) * 1.5) * 10) / 10
  }

  const inchesToEU = (inches) => {
    const cm = parseFloat(inches) * 2.54
    return cmToEU(cm)
  }

  const handleInputChange = (value, converter) => {
    const numValue = parseFloat(value)
    if (!isNaN(numValue) && numValue > 0) {
      setEuSize(converter(numValue))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-4">
            Shoe Size Converter
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Convert shoe sizes between different country standards
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* EU Size */}
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 text-white transform transition hover:scale-105">
              <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">
                EU Size
              </label>
              <input
                type="number"
                step="0.5"
                value={euSize}
                onChange={(e) => setEuSize(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 text-2xl font-bold text-gray-800 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
              />
            </div>

            {/* US Size */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 text-white transform transition hover:scale-105">
              <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">
                US Size
              </label>
              <input
                type="number"
                step="0.5"
                value={euToUS(euSize)}
                onChange={(e) => handleInputChange(e.target.value, usToEU)}
                className="w-full px-4 py-3 text-2xl font-bold text-gray-800 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-300"
              />
            </div>

            {/* UK Size */}
            <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-xl p-6 text-white transform transition hover:scale-105">
              <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">
                UK Size
              </label>
              <input
                type="number"
                step="0.5"
                value={euToUK(euSize)}
                onChange={(e) => handleInputChange(e.target.value, ukToEU)}
                className="w-full px-4 py-3 text-2xl font-bold text-gray-800 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-300"
              />
            </div>

            {/* CM */}
            <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl p-6 text-white transform transition hover:scale-105">
              <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">
                Centimeters (CM)
              </label>
              <input
                type="number"
                step="0.1"
                value={euToCM(euSize)}
                onChange={(e) => handleInputChange(e.target.value, cmToEU)}
                className="w-full px-4 py-3 text-2xl font-bold text-gray-800 rounded-lg focus:outline-none focus:ring-4 focus:ring-orange-300"
              />
            </div>

            {/* Inches */}
            <div className="bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl p-6 text-white transform transition hover:scale-105">
              <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">
                Inches
              </label>
              <input
                type="number"
                step="0.01"
                value={euToInches(euSize)}
                onChange={(e) => handleInputChange(e.target.value, inchesToEU)}
                className="w-full px-4 py-3 text-2xl font-bold text-gray-800 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-300"
              />
            </div>
          </div>

          <div className="mt-8 p-6 bg-gray-50 rounded-xl">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              📝 How to use:
            </h2>
            <ul className="text-gray-600 space-y-1">
              <li>• Enter a shoe size in any field to see conversions</li>
              <li>• Default EU size is set to 50</li>
              <li>• All conversions update automatically</li>
              <li>• Values are approximate and may vary by manufacturer</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
