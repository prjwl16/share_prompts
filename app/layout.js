import "@styles/globals.css";

import Nav from "@components/Nav";
// import Provider from "@components/Provider";
import Test from "@components/Test";

export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts",
};

const RootLayout = ({ children }) => (
  <html lang="en">
    <body>
      <Test />
    </body>
  </html>
);

export default RootLayout;
