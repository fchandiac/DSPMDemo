// app/layout.tsx
import MuiProvider from "../MUI/MuiProvider";
import AuthProvider from "@/components/auth/AuthProvider";
import { AlertProvider } from "@/context/AlertContext";
import { UserProvider } from "@/context/UserContext";
import RootWrapper from "./RootWrapper";
import '@/app/globals.css';
import '../public/hide-leaflet-attribution.css';

export const metadata = {
  title: "Aplicación Demo Dirección de Seguridad Pública Municipal",
  description: "Sistema para la Ilustre Municipalidad de Parral",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon_16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon_48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon_128.png", sizes: "128x128", type: "image/png" },
      { url: "/favicon_256.png", sizes: "256x256", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon_256.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          <MuiProvider>
            <AlertProvider>
              <UserProvider>
                <RootWrapper>
                  {children}
                </RootWrapper>
              </UserProvider>
            </AlertProvider>
          </MuiProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
