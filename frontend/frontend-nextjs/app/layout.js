import SmoothScroll from "./components/containers/SmootherCon";
import Footer from "./components/elements/Footer";
import NavigationBar from "./components/elements/NavigationBar";
import "./globals.css";
import RecoilContextProvider from "./utils/recoillib/RecoilContextProvider";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <RecoilContextProvider>
            <div className="hidden lg:block">
              <NavigationBar />
              <SmoothScroll>
              {children}
              <Footer />
              </SmoothScroll>
            </div>
            <div className="flex lg:hidden w-screen h-screen justify-center items-center px-4">
              <div className="font-ibm_mono_regular">This prototype is currently optimized for desktop viewing only. It does not support mobile and tablet devices. For a better experience, please view the prototype on a desktop. Mobile and tablet responsiveness will be implemented in future iterations.</div>
            </div>
        </RecoilContextProvider>
      </body>
    </html>
  );
}
