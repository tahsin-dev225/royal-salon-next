import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";


const Footer = () => {
    
    return (
        <div>
            <footer className="footer  bg-gradient-to-br from-cyan-950/30 to-[#040c314f] text-base-content p-10 py-16">
                <aside className="lg:mx-auto">
                    <Image className="h-auto" src={'/img/royal-selon.webp'} width={100} height={50} alt="logo" />
                    <p className="my-3">
                    Royal Style Salon
                    <br />
                    Providing salon service since 2018
                    </p>
                </aside>
                <nav className="lg:mx-auto">
                    <h1 className="text-lg font-bold text-slate-400">Navs</h1>
                    {
                        navItems.map((item, idx) =><Link className="hover:text-yellow-200" key={idx} href={item.path}>
                            {item.title}
                        </Link>)
                    }
                </nav>
                <nav className="lg:mx-auto">
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <div className=" flex gap-3 py-1 px-2 rounded ">
                        <a className="text-blue-900 bg-white rounded-full text-2xl" href=""><FaFacebook/></a>
                        <a className="text- text-2xl bg-orange-600 rounded-lg text-white" href=""><FaInstagram></FaInstagram></a>
                    </div>
                </nav>
                
            </footer>
        </div>
    );
};

const navItems = [
    {
        title : "Home",
        path : "/"
    },
    {
        title : "Services",
        path : "/services"
    },
    {
        title : "My Bookings",
        path : "/my-bookings"
    },
]

export default Footer;