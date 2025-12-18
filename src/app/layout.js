import Script from "next/script";
import { Toaster } from "react-hot-toast";

export default async function LocaleLayout({ children }) {
  return (
    <html lang={"en"}>
      <head>
        {/* Core Minible CSS */}
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/icons.min.css" />
        <link rel="stylesheet" href="/assets/css/app.min.css" />

        {/* Other CSS files you might still need */}
        <link
          href="/assets/libs/dropzone/min/dropzone.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="/assets/libs/datatables.net-bs4/css/dataTables.bootstrap4.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="/assets/libs/datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="/assets/libs/datatables.net-responsive-bs4/css/responsive.bootstrap4.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <link rel="shortcut icon" href="/assets/images/favicon.ico"></link>
      </head>

      <body>
        <Toaster />
        {children}
      </body>

      <Script src="/assets/libs/jquery/jquery.min.js"></Script>
      <Script src="/assets/libs/bootstrap/js/bootstrap.bundle.min.js"></Script>
      <Script src="/assets/libs/metismenu/metisMenu.min.js"></Script>
      <Script src="/assets/libs/simplebar/simplebar.min.js"></Script>
      <Script src="/assets/libs/node-waves/waves.min.js"></Script>
      <Script src="/assets/libs/jquery.counterup/jquery.counterup.min.js"></Script>
      <Script src="/assets/js/app.js"></Script>
      <Script src="/assets/libs/datatables.net/js/jquery.dataTables.min.js"></Script>
      <Script src="/assets/libs/datatables.net-bs4/js/dataTables.bootstrap4.min.js"></Script>
      <Script src="/assets/libs/datatables.net-buttons/js/dataTables.buttons.min.js"></Script>
      <Script src="/assets/libs/datatables.net-buttons-bs4/js/buttons.bootstrap4.min.js"></Script>
      <Script src="/assets/libs/jszip/jszip.min.js"></Script>
      <Script src="/assets/libs/pdfmake/build/pdfmake.min.js"></Script>
      <Script src="/assets/libs/pdfmake/build/vfs_fonts.js"></Script>
      <Script src="/assets/libs/datatables.net-buttons/js/buttons.html5.min.js"></Script>
      <Script src="/assets/libs/datatables.net-buttons/js/buttons.print.min.js"></Script>
      <Script src="/assets/libs/datatables.net-buttons/js/buttons.colVis.min.js"></Script>
      <Script src="/assets/libs/datatables.net-responsive/js/dataTables.responsive.min.js"></Script>
      <Script src="/assets/libs/datatables.net-responsive-bs4/js/responsive.bootstrap4.min.js"></Script>
      <Script src="/assets/js/pages/datatables.init.js"></Script>
      <Script src="/assets/libs/apexcharts/apexcharts.min.js"></Script>
      <Script src="/assets/js/pages/dashboard.init.js"></Script>
      <Script src="/assets/libs/parsleyjs/parsley.min.js"></Script>
      <Script src="/assets/js/pages/form-validation.init.js"></Script>
      <Script src="/assets/libs/dropzone/min/dropzone.min.js"></Script>
      <Script src="/assets/js/pages/modal.init.js"></Script>
      <Script src="/assets/libs/inputmask/min/jquery.inputmask.bundle.min.js"></Script>
      <Script src="/assets/js/pages/form-mask.init.js"></Script>
      <Script
        src="/assets/libs/jquery-steps/build/jquery.steps.min.js"
        strategy="afterInteractive"
      ></Script>
      <Script
        src="/assets/js/pages/form-wizard.init.js"
        strategy="afterInteractive"
      ></Script>
      <Script
        src="/assets/libs/waypoints/lib/jquery.waypoints.min.js"
        strategy="afterInteractive"
      ></Script>
    </html>
  );
}
