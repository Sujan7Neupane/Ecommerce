import { Outlet } from "react-router";
import Container from "./components/Container";
import Footer from "./components/Footer";
import Header from "./components/Header";

const App = () => {
  return (
    <>
      <Header />
      <Container>
        <main className="my-4">
          <Outlet />
        </main>
      </Container>
      <Footer />
    </>
  );
};

export default App;
