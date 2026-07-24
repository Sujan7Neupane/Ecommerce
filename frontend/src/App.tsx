import { Outlet } from "react-router";
import Container from "./components/Container";
import Footer from "./components/Footer";
import Header from "./components/Header";

const App = () => {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Header />

        <main className="flex-1 py-4">
          <Container>
            <Outlet />
          </Container>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default App;
