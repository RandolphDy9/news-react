const Navbar = () => {
  return (
    <div className="flex md:flex-row flex-col justify-between items-center text-center">
      <div className="w-1/3">
        <input type="text" className="bg-gray-50 border-1 border-spacing-2 rounded-lg" />
        <button className="p-2">
          Go!
        </button>
      </div>
      <div className="w-1/3 text-3xl font-bold">Daily Marites</div>
      <div className="w-1/3">
        <ul className="flex flex-row justify-center gap-4 text-xs">
          <li>US Headlines</li>
          <li>TechCrunch</li>
          <li>Wall Street Journal</li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar;