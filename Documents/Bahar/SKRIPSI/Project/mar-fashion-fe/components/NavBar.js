import Image from "next/image";
import Link from "next/link";
import MarLogo from "../public/mar-fashion-logo.png";

const NavBar = () => {
  return (
    <header className="p-3 bg-danger text-white">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <Image className="d-flex align-items-center mb-2 mb-lg-0" src={MarLogo} alt="Baju" style={{ width: "5%", height:"5%"}} />
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <Link href="/" className="nav-link px-2 text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/daftarBarang" className="nav-link px-2 text-white">
                Daftar Barang
              </Link>
            </li>
            <li>
              <Link href="/notaPembelian" className="nav-link px-2 text-white">
                Nota Pembelian
              </Link>
            </li>
            <li>
              <Link href="/notaPenjualan" className="nav-link px-2 text-white">
                Nota Penjualan
              </Link>
            </li>
            <li>
              <Link href="/karyawan" className="nav-link px-2 text-white">
                Karyawan
              </Link>
            </li>
            <li>
              <Link href="/supplier" className="nav-link px-2 text-white">
                Supplier
              </Link>
            </li>
          </ul>

          <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
            <input
              type="search"
              className="form-control form-control-dark"
              placeholder="Search..."
              aria-label="Search"
            />
          </form>
        </div>
      </div>
    </header>
  );
};
export default NavBar;