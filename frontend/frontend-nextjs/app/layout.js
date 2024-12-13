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
      <body>
        <RecoilContextProvider>
          <SmoothScroll>
            <NavigationBar />
            {children}
            <Footer />
          </SmoothScroll>
        </RecoilContextProvider>
      </body>
    </html>
  );
}
