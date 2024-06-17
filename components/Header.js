import Link from "next/link";
import Nav from "./Nav";


export default function Header() {
  return (
    <header>
      <div className="bar">
        <Link href="/">Sab Fits</Link>
      </div>
      <div className="sub-bar"></div>
      <p>Search</p>
      <Nav />
    </header>
  )
}
